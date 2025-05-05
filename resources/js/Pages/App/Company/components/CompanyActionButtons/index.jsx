import React from "react";
import { Link } from "@inertiajs/react";

export default function CompanyActionButtons() {
    return (
        <div className="flex justify-between items-center mb-4">
            <Link
                href="/company/create"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-[12px]"
                dangerouslySetInnerHTML={{ __html: window.icons?.add_company }}
            />
            <button
                className="text-gray-500 font-bold py-2 px-4 rounded-full transition hover:bg-gray-300 hover:text-white"
                disabled
            >
                {/* 検索はあとで */}
                検索
            </button>
        </div>
    );
}