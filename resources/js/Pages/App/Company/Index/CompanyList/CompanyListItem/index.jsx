import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { icons } from "@/Utils/icons";

export default function CompanyListItem({ company, onCompanyClick, onCompanyRightClick, onDelete, selectedCompanyId }) {
    return (
        <div
            key={company.id}
            className="p-4 border rounded-[12px] cursor-pointer relative transition-all duration-300 hover:shadow-lg group" // group クラスを追加
            onClick={() => onCompanyClick(company.id)}
            onContextMenu={(e) => onCompanyRightClick(e, company.id)}
        >
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{company.name}</h3>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(company.id);
                    }}
                    className="text-gray-500 w-7 h-7 p-0 rounded-full flex items-center justify-center hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" // opacity 制御を追加
                    dangerouslySetInnerHTML={{ __html: icons.trash }}
                />
            </div>
            <p className="text-sm text-gray-600">{company.industry?.name ?? "業界なし"}</p>
        </div>
    );
}