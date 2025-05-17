import React from "react";
import { router } from "@inertiajs/react";

export default function ContentList({ contents }) {
    if (contents.length === 0) {
        return <p className="text-gray-600 text-center">まだコンテンツがありません。</p>;
    }

    return (
        <div className="p-4 rounded-[12px] relative max-w-3xl mx-auto pt-4">
            <p className="text-center font-bold mb-4 pt-2">最近の更新</p>
            <ul className="space-y-3">
                {contents.map((content) => (
                    <li
                        key={content.id}
                        className="bg-white p-4 rounded-[12px] border relative cursor-pointer transition-transform duration-200 hover:scale-105 group"
                        onClick={() => router.visit(`/entrysheet/${content.entrysheet.id}`)}
                        onContextMenu={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <div className="flex items-baseline space-x-2 mb-2">
                            <p className="text-sm text-gray-500 font-bold">
                                {content.entrysheet.company?.name || "企業情報なし"}
                            </p>
                            <p className="text-xs text-gray-500 font-bold">{content.entrysheet.title}</p>
                        </div>

                        <p className="text-base font-semibold text-gray-800 truncate">{content.question}</p>
                        <p className="text-sm text-gray-500">{content.answer}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}