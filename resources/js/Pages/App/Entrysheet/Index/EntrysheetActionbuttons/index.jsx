import React from "react";
import { Link } from "@inertiajs/react";
import { icons } from "@/Utils/icons";

export default function EntrysheetActionButtons({ setShowFilter }) {
    return (
        <div className="flex justify-between items-center mb-4">
            <Link
                href={route("entrysheet.create")}
                className="bg-blue-500 hover:scale-105 text-white font-bold py-2 px-4 rounded-[12px]"
                dangerouslySetInnerHTML={{ __html: icons.add_es }}
            />

            <button
                onClick={() => setShowFilter(true)}
                className="text-gray-500 font-bold py-2 px-4 rounded-full transition hover:bg-gray-300 hover:text-white"
                dangerouslySetInnerHTML={{ __html: icons.search }}
            />
        </div>
    );
}