import React from "react";
import { Link, usePage } from "@inertiajs/react";

export default function NavBar() {
    const { auth } = usePage().props;

    return (
        <nav className="bg-white fixed top-4 left-1/2 transform -translate-x-1/2 w-full max-w-[95%] mx-auto z-50 rounded-[12px] px-6 py-3 shadow">
            <div className="flex justify-between items-center">
                <Link href="/dashboard" className="text-xl font-bold text-black">estion.</Link>

                <div className="flex space-x-6 text-sm font-medium text-gray-600">
                    <Link href="/dashboard" className="hover:text-gray-900">Dashboard</Link>
                    <Link href="/company" className="hover:text-gray-900">Company</Link>
                    <Link href="/entrysheet" className="hover:text-gray-900">EntrySheet</Link>
                </div>

                <div className="text-sm text-gray-700 font-semibold">
                    {auth?.user?.name}
                </div>
            </div>
        </nav>
    );
}