import React from 'react';
import { Link } from '@inertiajs/react';

export default function MobileMenu({ auth, isMenuOpen }) {
  if (!isMenuOpen) return null; // メニューが開いていないときは何も表示しない

  return (
    <div className="absolute left-0 top-20 flex w-full flex-col items-center space-y-4 bg-black bg-opacity-80 py-6 text-white transition-all duration-300">
      <Link href="/contact" className="px-6 py-3 transition hover:text-gray-300">
        お問い合わせ
      </Link>
      {auth.user ? (
        <Link href="/dashboard" className="px-6 py-3 transition hover:text-gray-300">
          つづきから
        </Link>
      ) : (
        <Link href="/login" className="px-6 py-3 transition hover:text-gray-300">
          はじめる
        </Link>
      )}
    </div>
  );
}
