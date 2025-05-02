import React from "react";

export default function MenuToggle({ isMenuOpen, toggleMenu }) {
    return (
        <div className="-me-2 flex items-center md:hidden">
            <button onClick={toggleMenu} className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-gray-500 focus:outline-none transition duration-150 ease-in-out">
                {isMenuOpen ? (
                    // 閉じるアイコン
                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    // 開くアイコン
                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                )}
            </button>
        </div>
    );
}