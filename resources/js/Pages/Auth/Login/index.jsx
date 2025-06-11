import React from "react";
import AuthInput from "@/Pages/Auth/components/AuthInput";
import AuthButton from "@/Pages/Auth/components/AuthButton";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="absolute top-6 left-8 text-4xl font-bold text-black">             
                estion.
            </div>
            <Head title="ログイン" />

            <div className="w-full max-w-lg mt-6 px-8 py-8 bg-white border rounded-[12px]">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">ログイン</h2>
                {/*
                <div className="flex justify-center mb-6">
                    <a href={route("auth.google")} className="hover:scale-110 transition">
                        <img src="/image/auth/google_icon.png" alt="Google ログイン" width="40" height="40" />
                    </a>
                </div>
                */}

                <form onSubmit={handleSubmit}>
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

                    <div className="mt-6 space-y-3">
                        <AuthButton text="ログイン" disabled={processing} />

                        <div className="border-t border-[#909090] opacity-50 my-3"></div>

                        <div className="pt-6 flex justify-center">
                            <Link
                                href={route("register")}
                                className="text-center text-sm text-[#252525] hover:text-gray-900 transition font-bold"
                            >
                                アカウントをお持ちでない方はこちら
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}