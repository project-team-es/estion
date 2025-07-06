export default function MenuToggle({ isMenuOpen, toggleMenu }) {
  return (
    <div className="flex items-center sm:hidden">
      <button
        onClick={toggleMenu}
        className="inline-flex items-center justify-center rounded-md p-2 text-black transition duration-150 ease-in-out hover:text-gray-500 focus:outline-none"
      >
        <svg className="h-8 w-8" stroke="currentColor" fill="none" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>
  );
}
