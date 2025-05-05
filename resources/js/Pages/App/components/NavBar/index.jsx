import React from "react";
import { Link, usePage } from "@inertiajs/react";
import NavLinks from "./NavLinks";
import UserDropdown from "./UserDropdown";
import Bookmark from "./Bookmark";

export default function NavBar() {
    const { bookmarks } = usePage().props;

    return (
        <nav className="bg-white fixed top-4 left-1/2 transform -translate-x-1/2 w-full max-w-[95%] mx-auto z-50 rounded-[12px] px-6 py-3 shadow">
            <div className="flex justify-between items-center">
                <Link href="/dashboard" className="text-xl font-bold text-black">estion.</Link>

                <div className="flex items-center space-x-6">
                    <NavLinks />
                    <Bookmark bookmarks={bookmarks} />        
                </div>

                <UserDropdown />
            </div>
        </nav>
    );
}