import { router } from '@inertiajs/react';

export default function EntrySheetList({ entrysheets }) {
  return (
    <div className="z-10 mr-[4%] flex h-screen w-1/5 flex-col">
      <p className="mb-4 text-center font-bold">締切間近</p>

      {entrysheets.length === 0 ? (
        <p className="text-center text-gray-600">登録されたエントリーシート がありません。</p>
      ) : (
        <div className="flex flex-col items-center">
          {entrysheets.map((entrysheet) => (
            <div
              key={entrysheet.id}
              className="group cursor-pointer rounded-[12px] border bg-white p-2 transition-transform duration-200 hover:scale-105"
              style={{
                minHeight: '60px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '200px',
              }}
              onClick={() => router.visit(`/entrysheet/${entrysheet.id}`)}
            >
              <p className="text-m text-gray-600">
                {entrysheet.deadline
                  ? new Date(entrysheet.deadline).toLocaleDateString('ja-JP', {
                      month: 'numeric',
                      day: 'numeric',
                      weekday: 'short',
                    })
                  : '未設定'}
              </p>

              {/* 会社名の表示 */}
              <p className="truncate text-center text-sm font-semibold text-gray-500"></p>

              <p className="truncate text-center text-sm font-semibold text-gray-500">
                {entrysheet.company?.name || 'No Company'}: {entrysheet.title}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
