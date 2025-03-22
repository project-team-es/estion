import React from "react";
import Logo from "@/Components/GuestNav/Logo";
import NavLinks from "@/Components/GuestNav/NavLinks";
import MobileMenu from "./MobileMenu";
import MenuToggle from "./MenuToggle";

export default function NavBar() {
    console.log("NavBar rendered");

    return (
        <nav className="fixed top-0 left-0 w-full bg-opacity-90 py-4 z-50">
            <div className="w-full px-2 sm:px-12 py-3 flex justify-between items-center">
                {/* ロゴ */}
                <Logo />

                {/* PC用メニュー */}
                <div className="hidden md:flex">
                    <NavLinks />
                </div>

                {/* モバイル用ハンバーガーメニュー */}
                <div className="md:hidden">
                    <MenuToggle />
                </div>
            </div>

            {/* モバイルメニュー（開閉アニメーション付き） */}
            <MobileMenu />
        </nav>
    );
}