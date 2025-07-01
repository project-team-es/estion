import React from 'react';

export default function NavLinks() {
  return (
    <div className="hidden font-bold sm:flex sm:space-x-7 sm:pr-5 sm:text-[16px] md:space-x-12 md:text-[20px]">
      <a
        href="https://docs.google.com/forms/d/1sZsxsi5FqdiS35YW2CVzQ4CANyljnbjt2K9urmRomHE/edit?pli=1"
        className="text-black transition hover:text-gray-300"
        target="_blank"
      >
        お問い合わせ
      </a>
      <a href="/login" className="text-black transition hover:text-gray-300">
        ログイン
      </a>
      <a href="/register" className="text-black transition hover:text-gray-300">
        新規登録
      </a>
    </div>
  );
}
