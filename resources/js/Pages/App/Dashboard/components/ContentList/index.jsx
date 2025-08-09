import { router } from '@inertiajs/react';

export default function ContentList({ contents }) {
  return (
    <div className="flex flex-col items-center">
      <p className="mb-4 mt-10 text-center font-bold md:mt-0">最近の更新</p>
      {contents.length === 0 ? (
        <p className="text-center text-gray-600">まだコンテンツがありません。</p>
      ) : (
        <div className="w-[90%]">
          {contents.map((content) => (
            <div
              key={content.id}
              className="group relative mb-2 cursor-pointer rounded-[12px] border bg-white p-4 transition-transform duration-200 hover:scale-105"
              onClick={() => router.visit(`/entrysheet/${content.entrysheet.id}`)}
              onContextMenu={(e) => {
                e.preventDefault();
              }}
            >
              <p className="mb-2 text-sm font-bold text-gray-500">
                {content.entrysheet.company?.name || '企業情報なし'}
              </p>
              <p className="text-base font-semibold text-gray-800">{content.question}</p>
              <p className="text-sm text-gray-500">{content.answer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
