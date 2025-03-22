import React from "react";

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="absolute top-6 left-8 text-4xl font-bold text-black">
                estion.
            </div>

            {/* メインコンテンツ */}
            {children}
        </div>
    );
}