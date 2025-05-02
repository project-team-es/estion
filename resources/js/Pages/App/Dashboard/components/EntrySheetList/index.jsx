import React from "react";
import { router } from "@inertiajs/react";

export default function EntrySheetList({ entrysheets }) {
    console.log(entrysheets); 
    return (
        <div className="w-1/6 p-4 fixed top-16 right-6 md:right-10 lg:right-16
                        md:h-screen md:flex md:flex-col md:justify-between">
            <p className="text-center font-bold mb-4">締切間近</p>

            {entrysheets.length === 0 ? (
                <p className="text-gray-600">登録されたエントリーシートがありません。</p>
            ) : (
                <div className="space-y-2 flex-1 overflow-y-auto">
                    {entrysheets.map((entrysheet) => (
                        <div
                            key={entrysheet.id}
                            className="bg-white p-2 border rounded-[12px] cursor-pointer hover:bg-gray-100 text-sm"
                            style={{
                                minHeight: "60px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            onClick={() => router.visit(`/entrysheet/${entrysheet.id}`)}
                        >
                            <p className="text-m text-gray-600">
                                {entrysheet.deadline
                                    ? new Date(entrysheet.deadline).toLocaleDateString("ja-JP", {
                                          month: "numeric",
                                          day: "numeric",
                                          weekday: "short",
                                      })
                                    : "未設定"}
                            </p>
                            <p className="text-m font-semibold truncate text-center">
                                {entrysheet.company?.name}：{entrysheet.title}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}