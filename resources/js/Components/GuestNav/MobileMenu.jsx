import React from "react";
import { Link } from "@inertiajs/react";

export default function MobileMenu({ auth, isMenuOpen }) {
    if (!isMenuOpen) return null; // メニューが開いていないときは何も表示しない

    return (
        <div className="absolute top-20 left-0 w-full bg-black bg-opacity-80 text-white flex flex-col items-center space-y-4 py-6 transition-all duration-300">
            <Link href="/contact" className="hover:text-gray-300 transition px-6 py-3">
                お問い合わせ
            </Link>
            {auth.user ? (
                <Link href="/dashboard" className="hover:text-gray-300 transition px-6 py-3">
                    つづきから
                </Link>
            ) : (
                <Link href="/login" className="hover:text-gray-300 transition px-6 py-3">
                    はじめる
                </Link>
            )}
        </div>
    );
}