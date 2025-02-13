import Link from "next/link";

export default async function LoginPage() {

  return (
    <main>
      <div className="login-container">
          <a href="/auth/login?screen_hint=signup" className="auth-button">
            ユーザ登録
          </a>
          <a href="/auth/login" className="auth-button">
            ログイン
          </a>
        </div>
    </main>
  );
}
