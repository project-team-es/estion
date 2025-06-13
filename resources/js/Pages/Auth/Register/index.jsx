import React from "react";
import AuthInput from "@/Pages/Auth/components/AuthInput";
import AuthButton from "@/Pages/Auth/components/AuthButton";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("register"));
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="absolute top-6 left-8 text-4xl font-bold text-black">
                estion.
            </div>
            <Head title="新規登録" />

            <div className="w-full max-w-lg mt-6 px-8 py-8 bg-white border rounded-[12px]">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">新規登録</h2>

                {/* Google OAuth */}
                {/*
                <div className="flex justify-center mb-6">
                    <a href={route("auth.google")} className="hover:scale-110 transition">
                        <img src="/image/auth/google_sign_up.png" alt="Google ロゴ" width="150" height="50" />
                    </a>
                </div>
                */}

                <form onSubmit={handleSubmit}>
                    <AuthInput
                        id="name"
                        label="ユーザー名"
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        error={errors.name}
                    />

                    <AuthInput
                        id="email"
                        label="メールアドレス"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        error={errors.email}
                    />

                    <AuthInput
                        id="password"
                        label="パスワード"
                        type="password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        error={errors.password}
                    />

                    <AuthInput
                        id="password_confirmation"
                        label="パスワード確認"
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) => setData("password_confirmation", e.target.value)}
                        error={errors.password_confirmation}
                    />

                    <div className="mt-6 space-y-3">
                        <AuthButton text="登録" disabled={processing} />

                        <div className="border-t border-[#909090] opacity-50 my-3"></div>

                        <div className="pt-6 flex justify-center">
                            <Link
                                href={route("login")}
                                className="text-center text-sm text-[#252525] hover:text-gray-900 transition font-bold"
                            >
                                すでにアカウントをお持ちの方はこちら
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}