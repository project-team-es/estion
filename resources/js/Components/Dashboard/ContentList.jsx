import React from "react";
import { router } from "@inertiajs/react";

export default function ContentList({ contents }) {
    if (contents.length === 0) {
        return <p className="text-gray-600 text-center">まだコンテンツがありません。</p>;
    }

    return (
        <div className="bg-gray-100 p-4 rounded-[12px] relative max-w-3xl mx-auto">
            <ul className="space-y-3">
                {contents.map((content) => (
                    <li
                        key={content.id}
                        className="bg-white p-4 rounded-[12px] shadow-sm border relative cursor-pointer transition hover:shadow-md"
                        onClick={() => router.visit(`/entrysheet/${content.entrysheet.id}`)}
                        onContextMenu={(e) => {
                            e.preventDefault();
                            // カスタム右クリックメニューなどもここで
                        }}
                    >
                        <p className="text-sm text-gray-500 font-bold mb-2">
                            {content.entrysheet.company?.name || "企業情報なし"}
                        </p>
                        <p className="text-base font-semibold text-gray-800 truncate">{content.question}</p>
                        <p className="text-sm text-gray-500">{content.answer}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}