import React from "react";

export default function OAuthLogin() {
    console.log("✅ OAuthLogin is rendering"); // デバッグ用ログ
    return (
        <div className="flex justify-center">
            <a href={route("auth.google")} className="hover:scale-110 transition">
                <img src="/image/auth/google_icon.png" alt="Google ログイン" width="40" height="40" />
            </a>
        </div>
    );
}