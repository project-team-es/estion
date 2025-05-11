import React from 'react';

export default function Bookmark({ bookmarks }) {
    return (
        <div className="flex space-x-6 text-sm font-medium text-gray-600">
            {bookmarks && bookmarks.length > 0 && (
                <span className="text-gray-600 font-medium">|</span>
            )}
            {bookmarks && bookmarks.length > 0 && bookmarks.slice(0, 3).map(bookmark => (
                <React.Fragment key={bookmark.id}>
                    <a
                        href={bookmark.url}
                        className="hover:text-gray-900"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {bookmark.name}
                    </a>
                </React.Fragment>
            ))}
        </div>
    );
}