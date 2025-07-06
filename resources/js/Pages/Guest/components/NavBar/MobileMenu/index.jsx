import React from 'react';
import { Link } from '@inertiajs/react';

export default function MobileMenu({ isMenuOpen, toggleMenu }) {
  return (
    <div
      className={`fixed inset-y-0 right-0 z-40 w-3/5 max-w-sm transform bg-white shadow-lg transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col md:hidden`}
    >
      <button
        onClick={toggleMenu}
        className="absolute right-4 top-7 text-gray-600 hover:text-gray-900 focus:outline-none"
      >
        <svg className="h-8 w-8" stroke="currentColor" fill="none" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className="mt-14 flex flex-col items-start px-5 text-left text-[20px] font-semibold">
        <a
          href="https://docs.google.com/forms/d/1sZsxsi5FqdiS35YW2CVzQ4CANyljnbjt2K9urmRomHE/edit?pli=1"
          onClick={toggleMenu}
          className="w-full py-5 text-black transition hover:text-gray-600"
        >
          お問い合わせ
        </a>
        <Link
          href="/login"
          onClick={toggleMenu}
          className="t w-full py-5 text-black transition hover:text-gray-600"
        >
          ログイン
        </Link>
        <Link
          href="/register"
          onClick={toggleMenu}
          className="w-full py-5 text-black transition hover:text-gray-600"
        >
          新規登録
        </Link>
      </div>
    </div>
  );
}
