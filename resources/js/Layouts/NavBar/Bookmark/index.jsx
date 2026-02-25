import React from 'react';

export function Bookmark({ bookmarks }) {
  if (!bookmarks || bookmarks.length === 0) return null;

  return (
    <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
      <span>|</span>
      <div
        className="flex max-w-[250px] items-center gap-6 overflow-x-auto py-2 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: 'none' }}
      >
        {bookmarks.map((bookmark) => (
          <a
            key={bookmark.id}
            href={bookmark.url}
            className="shrink-0 hover:text-gray-900"
            target="_blank"
            rel="noopener noreferrer"
          >
            {bookmark.name}
          </a>
        ))}
      </div>
    </div>
  );
}
