import React from "react";
import { icons } from "@/Utils/icons";

export default function EntrysheetFilterModal({ showFilter, setShowFilter, filters }) {
    return (
        showFilter && (
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
        )
    );
}