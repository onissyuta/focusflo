import { Auth0Client } from "@auth0/nextjs-auth0/server";

export const auth0 = new Auth0Client({
  authorizationParameters: {
    scope: "openid profile email offline_access",
    audience: "focusflo-api",
  },
  signInReturnToPath: "/app", // https://qiita.com/takanda/items/11f3981e01af49582a46
});
