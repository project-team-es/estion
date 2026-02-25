import { router, useForm } from '@inertiajs/react';
import { icons } from '@/Utils/icons';

export function BookmarkIndex({ bookmarks }) {
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
                  rel="noreferrer"
                >
                  {bookmark.name}
                </a>
              </div>
              <div className="flex shrink-0 items-center gap-3 ml-4">
                <button
                  type="button"
                  onClick={() => router.visit(route('bookmark.edit', bookmark.id))}
                  className="text-blue-600 hover:text-blue-800 focus:outline-none"
                  dangerouslySetInnerHTML={{ __html: icons.edit_mini }}
                />
                <button
                  type="button"
                  onClick={() => handleDelete(bookmark.id)}
                  className="text-red-600 hover:text-red-800 focus:outline-none"
                  dangerouslySetInnerHTML={{ __html: icons.trash_mini }}
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">登録されたURLはありません。</p>
      )}
    </div>
  );
}
