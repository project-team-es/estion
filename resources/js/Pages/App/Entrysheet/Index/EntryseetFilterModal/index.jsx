
export default function EntrysheetFilterModal({ showFilter, setShowFilter, filters }) {
  return (
    showFilter && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="w-96 rounded-[12px] bg-white p-8">
          <h3 className="mb-4 text-xl font-bold">フィルター</h3>

          <form method="GET" action={route('entrysheet.search')}>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                name="search"
                defaultValue={filters?.search || ''}
                placeholder="企業名で検索"
                className="rounded-[12px] border px-4 py-2"
              />

              <div>
                <label htmlFor="order_by" className="block text-sm">
                  並び替え
                </label>
                <select
                  name="order_by"
                  defaultValue={filters?.order_by || 'created_at_desc'}
                  id="order_by"
                  className="appearance-none rounded-[12px] border px-4 py-2 pr-10"
                >
                  <option value="created_at_desc">投稿順 (新しい順)</option>
                  <option value="created_at_asc">投稿順 (古い順)</option>
                  <option value="deadline_asc">締切順 (近い順)</option>
                  <option value="deadline_desc">締切順 (遠い順)</option>
                </select>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setShowFilter(false)}
                  className="rounded-[12px] bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-700"
                >
                  閉じる
                </button>
                <button
                  type="submit"
                  className="rounded-[12px] bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                >
                  検索
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  );
}
