import React from "react";
import AuthInput from "@/Components/Auth/AuthInput";
import AuthButton from "@/Components/Auth/AuthButton";

export default function AuthForm({ title, formData, setData, onSubmit, buttonText, errors }) {
    return (
        <form onSubmit={onSubmit}>
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">{title}</h2>

                <AuthInput
                    id="email"
                    label="メールアドレス"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setData("email", e.target.value)}
                    error={errors.email}
                />

                <AuthInput
                    id="password"
                    label="パスワード"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setData("password", e.target.value)}
                    error={errors.password}
                />

                <div className="mt-6">
                    <AuthButton text={buttonText} />
                </div>
            </div>
        </form>
    );
}