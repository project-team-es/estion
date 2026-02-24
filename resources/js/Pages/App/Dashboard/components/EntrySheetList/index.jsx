import { router } from '@inertiajs/react';
export function EntrySheetList({ entrysheets }) {
  return (
    <div className="z-10 mr-[4%] hidden h-screen w-1/5 flex-col md:flex">
      <p className="mb-4 text-center font-bold">締切間近</p>

      {entrysheets.length === 0 ? (
        <p className="text-center text-gray-600">登録されたエントリーシート がありません。</p>
      ) : (
        <div className="flex flex-col items-center">
          {entrysheets.map((entrysheet) => (
            <div
              key={entrysheet.id}
              className="m-1 flex min-h-[60px] w-[200px] cursor-pointer flex-col items-center justify-center rounded-[12px] border bg-white transition-transform duration-200 hover:scale-105"
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
              <p className="text-center text-sm font-semibold text-gray-500">
                {entrysheet.company.name}: {entrysheet.title}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
