import React from 'react';
import { Link } from '@inertiajs/react';

export default function Bookmark({ bookmarks }) {
    return (
        <>
            {bookmarks && bookmarks.length > 0 && (
                <span className="text-gray-400 ml-3">|</span>
            )}
            {bookmarks && bookmarks.length > 0 && bookmarks.slice(0, 3).map(bookmark => (
                <React.Fragment key={bookmark.id}>
                    <a href={bookmark.url} className="block py-1 hover:text-gray-900 text-sm" target="_blank">{bookmark.name}</a>
                </React.Fragment>
            ))}
        </>
    );
}