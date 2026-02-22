export default function MenuToggle({ toggleMenu }) {
  return (
    <div className="mr-3 flex items-center sm:hidden">
      <button
        onClick={toggleMenu}
        className="inline-flex items-center justify-center rounded-md text-black transition duration-150 ease-in-out hover:text-gray-500 focus:outline-none"
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
