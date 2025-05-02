import React, { useState } from "react";
import AppLayout from "@/Layouts/AppLayout";
import { Link, usePage, router } from "@inertiajs/react";
import { icons } from "@/Utils/icons";

export default function EntrysheetIndex() {
  const { entrysheets, filters } = usePage().props;
  const [showFilter, setShowFilter] = useState(false);

  const handleDelete = (id) => {
    if (!confirm("このエントリーシートを削除しますか？")) return;

    router.delete(route("entrysheet.destroy", id), {
      preserveScroll: true,
    });
  };

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden sm:rounded-[12px] relative">
          <div className="p-6 text-gray-900">
            <div className="flex justify-between items-center mb-4">
              <Link
                href={route("entrysheet.create")}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-[12px]"
                dangerouslySetInnerHTML={{ __html: icons.add_es }}
              />

              <button
                onClick={() => setShowFilter(true)}
                className="text-gray-500 font-bold py-2 px-4 rounded-full transition hover:bg-gray-300 hover:text-white"
                dangerouslySetInnerHTML={{ __html: icons.search }}
              />
            </div>

            {showFilter && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-8 rounded-[12px] w-96">
                  <h3 className="text-xl font-bold mb-4">フィルター</h3>

                  <form method="GET" action={route("entrysheet.search")}> 
                    <div className="flex flex-col gap-4">
                      <input
                        type="text"
                        name="search"
                        defaultValue={filters?.search || ""}
                        placeholder="企業名で検索"
                        className="px-4 py-2 border rounded-[12px]"
                      />

                      <div>
                        <label htmlFor="order_by" className="block text-sm">
                          並び替え
                        </label>
                        <select
                          name="order_by"
                          defaultValue={filters?.order_by || "created_at_desc"}
                          id="order_by"
                          className="px-4 py-2 border rounded-[12px] appearance-none pr-10"
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
                          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-[12px]"
                        >
                          閉じる
                        </button>
                        <button
                          type="submit"
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-[12px]"
                        >
                          検索
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <h2 className="text-xl font-bold mt-6">登録したエントリーシート</h2>

            {entrysheets.length === 0 ? (
              <p className="text-gray-600 mt-4">登録されたエントリーシートがありません。</p>
            ) : (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {entrysheets.map((entrysheet) => (
                  <div
                    key={entrysheet.id}
                    className="p-4 border rounded-[12px] cursor-pointer relative transition-transform duration-200 hover:scale-105 group"
                    onClick={() => router.visit(route("entrysheet.show", entrysheet.id))}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">{entrysheet.title}</h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(entrysheet.id);
                        }}
                        className="hidden group-hover:flex text-gray-500 w-7 h-7 p-0 rounded-full transition-all duration-300 items-center justify-center hover:text-red-500"
                        dangerouslySetInnerHTML={{ __html: icons.trash }}
                      />
                    </div>

                    <p className="text-sm text-gray-600 mt-1">
                      企業: {entrysheet.company?.name || ""}
                    </p>
                    {entrysheet.deadline && (
                      <p className="text-sm text-gray-600">
                        締切: {entrysheet.deadline}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

EntrysheetIndex.layout = (page) => <AppLayout title="エントリーシート一覧">{page}</AppLayout>;
