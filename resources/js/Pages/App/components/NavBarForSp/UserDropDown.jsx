import { useState, useRef, useEffect } from 'react';

export default function UserDropDown({ bookmarks }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="mt-1" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center text-sm font-semibold text-gray-700 focus:outline-none"
      >
        <svg
          className={`ml-1 h-6 w-6 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute left-2 z-20 mt-5 w-[50vw] overflow-hidden rounded-[5px] bg-white py-2 shadow-lg">
          {bookmarks && bookmarks.length > 0 ? (
            bookmarks.map((bookmark) => (
              <a
                key={bookmark.id}
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
              >
                {bookmark.name}
              </a>
            ))
          ) : (
            <p className="px-4 py-2 text-gray-500">登録されているブックマークはありません</p>
          )}
        </div>
      )}
    </div>
  );
}
