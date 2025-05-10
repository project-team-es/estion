import React from "react";

export default function NavLinks({ auth }) {
    return (
        <div className="hidden md:flex space-x-10 font-bold">
            <a href="https://docs.google.com/forms/d/1TIZ2sr5REvMeDEHOZPBY9imnWFb21UEDT2sUpRVtZAo/edit#settings" className="text-black hover:text-gray-300 transition">
                お問い合わせ
            </a>
            {auth?.user ? (
                <a href="/dashboard" className="text-black hover:text-gray-300 transition">
                    つづきから
                </a>
            ) : (
                <a href="/login" className="text-black hover:text-gray-300 transition">
                    はじめる
                </a>
            )}
        </div>
    );
}