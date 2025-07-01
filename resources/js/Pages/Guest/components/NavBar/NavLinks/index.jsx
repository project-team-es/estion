import React from 'react';

export default function NavLinks({ auth }) {
  return (
    <div className="hidden space-x-10 font-bold md:flex">
      <a
        href="https://docs.google.com/forms/d/1sZsxsi5FqdiS35YW2CVzQ4CANyljnbjt2K9urmRomHE/edit?pli=1"
        className="text-black transition hover:text-gray-300"
        target="_blank"
      >
        お問い合わせ
      </a>
      {auth?.user ? (
        <a href="/dashboard" className="text-black transition hover:text-gray-300">
          つづきから
        </a>
      ) : (
        <a href="/login" className="text-black transition hover:text-gray-300">
          はじめる
        </a>
      )}
    </div>
  );
}
