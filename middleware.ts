import { NextResponse, NextRequest } from "next/server";
import { auth0 } from "./lib/auth0";
import { jwtVerify, createRemoteJWKSet } from "jose";

const getJWKS = createRemoteJWKSet(
    new URL(`${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`),
);

export async function middleware(request: NextRequest) {
    const authRes = await auth0.middleware(request);

    if (request.nextUrl.pathname.startsWith("/auth")) {
        return authRes;
    }

    const session = await auth0.getSession(request);

    if (session?.tokenSet) {
        console.log('Access Token expires at:', new Date(session.tokenSet.expiresAt * 1000).toISOString());
        // リフレッシュトークンの値はログに出すべきでないが、参考のため。
        console.log('Refresh Token:', session.tokenSet.refreshToken);
    }

    let accessToken;
    const authHeader = request.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];

    if (!session) {
        if (!token) {
            console.error("session is null and no Bearer token");
            return NextResponse.redirect(new URL("/", request.nextUrl.origin));
        } else {
            // app/page.tsxでfetchを使う場合は、Bearerトークンを使用
            accessToken = { token }; // Bearerトークンを使用
        }
    } else {
        accessToken = await auth0.getAccessToken(request, authRes);
        if (!accessToken) {
            console.error("accessToken is null");
            return NextResponse.redirect(new URL("/", request.nextUrl.origin));
        }
    }

    try {
        const { payload } = await jwtVerify(accessToken.token, getJWKS, {
            issuer: `${process.env.AUTH0_DOMAIN}/`,
            audience: "focusflo-api",
        });

        // クライアントIDの確認
        if (payload.azp !== process.env.AUTH0_CLIENT_ID) {
            throw new Error("Invalid client");
        }

        if (payload.email) {
            // APIルートにおいて必要なヘッダを設定
            // ヘッダは直接修正できないため、next()を用いてヘッダを作り直して処理を続ける
            // https://nextjs.org/docs/app/api-reference/functions/next-response#next
            const newHeaders = new Headers(request.headers);
            newHeaders.set("x-user-email", payload.email as string);
            return NextResponse.next({
                request: {
                    headers: newHeaders,
                },
            });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.redirect(new URL("/", request.nextUrl.origin));
    }

    return authRes;
}

export const config = {
    matcher: [
        /*
         * 下記の文字列から始まるパスを除いた全てのパスにマッチするように指定
         * - login (認証処理用)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        "/app/:path*",
        "/auth/:path*",
    ],
};
