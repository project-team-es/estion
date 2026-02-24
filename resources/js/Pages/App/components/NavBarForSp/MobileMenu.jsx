import { Link } from '@inertiajs/react';

export function MobileMenu({ isMenuOpen, toggleMenu }) {
  return (
    <div
      className={`fixed inset-y-0 right-0 z-50 w-3/5 max-w-sm transform bg-white shadow-lg transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col md:hidden`}
    >
      <button
        onClick={toggleMenu}
        className="absolute right-4 top-3 text-gray-600 hover:text-gray-900 focus:outline-none"
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
        <Link
          href="/profile"
          onClick={toggleMenu}
          className="t w-full py-5 text-black transition hover:text-gray-600"
        >
          プロフィール
        </Link>
        <a
          href="https://docs.google.com/forms/d/1sZsxsi5FqdiS35YW2CVzQ4CANyljnbjt2K9urmRomHE/edit?pli=1"
          onClick={toggleMenu}
          className="w-full py-5 text-black transition hover:text-gray-600"
        >
          問い合わせ
        </a>
        <Link
          href="/bookmark/create"
          onClick={toggleMenu}
          className="w-full py-5 text-black transition hover:text-gray-600"
        >
          ブックマーク
        </Link>

        <Link
          href={route('logout')}
          onClick={toggleMenu}
          method="post"
          className="w-full py-5 text-start text-black transition hover:text-gray-600"
        >
          ログアウト
        </Link>
      </div>
    </div>
  );
}
