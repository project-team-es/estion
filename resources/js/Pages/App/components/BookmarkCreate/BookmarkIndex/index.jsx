import React from 'react';
import { Link, useForm } from '@inertiajs/react';

export default function BookmarkIndex({ bookmarks }) {
  const { delete: destroy } = useForm({});

  const handleDelete = (id) => {
    if (confirm('本当にこのURLを削除しますか？')) {
      destroy(route('bookmark.destroy', { bookmark: id }), {
        preserveScroll: true,
        onSuccess: () => {},
        onError: (errors) => {
          console.error('URLの削除に失敗しました:', errors);
        },
      });
    }
  };

  return (
    <div className="mt-8 overflow-hidden rounded-[12px] border bg-white p-8">
      <h2 className="mb-6 text-2xl font-bold">登録されたURL一覧</h2>
      {bookmarks && bookmarks.length > 0 ? (
        <ul>
          {bookmarks.map((bookmark) => (
            <li key={bookmark.id} className="flex items-center justify-between py-3">
              <div className="truncate">
                <a
                  href={bookmark.url}
                  className="block py-1 font-bold text-blue-500 hover:text-blue-800"
                  target="_blank"
                >
                  {bookmark.name}
                </a>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(bookmark.id)}
                className="ml-4 rounded-md text-red-600 hover:text-red-800 focus:outline-none"
              >
                削除
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">登録されたURLはありません。</p>
      )}
    </div>
  );
}
