import React from "react";
import { router } from "@inertiajs/react";
import { icons } from "@/Utils/icons";

export default function EntrysheetListItem({ entrysheet, onDelete }) {
    return (
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
                        onDelete(entrysheet.id);
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
    );
}