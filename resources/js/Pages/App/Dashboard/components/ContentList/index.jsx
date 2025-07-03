import { router } from '@inertiajs/react';

export default function ContentList({ contents }) {
  return (
    <div className="mx-auto h-screen max-w-3xl bg-red-200">
      <p className="mb-4 text-center font-bold">最近の更新</p>
      {contents.length === 0 ? (
        <p className="text-center text-gray-600">まだコンテンツがありません。</p>
      ) : (
        <ul className>
          {contents.map((content) => (
            <li
              key={content.id}
              className="group relative cursor-pointer rounded-[12px] border bg-white p-4 transition-transform duration-200 hover:scale-105"
              onClick={() => router.visit(`/entrysheet/${content.entrysheet.id}`)}
              onContextMenu={(e) => {
                e.preventDefault();
              }}
            >
              <p className="mb-2 text-sm font-bold text-gray-500">
                {content.entrysheet.company?.name || '企業情報なし'}
              </p>
              <p className="truncate text-base font-semibold text-gray-800">{content.question}</p>
              <p className="text-sm text-gray-500">{content.answer}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
