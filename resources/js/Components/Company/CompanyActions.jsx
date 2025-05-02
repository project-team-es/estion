import React from "react";
import { router } from "@inertiajs/react";
import TrashIcon from "@/Components/Icons/TrashIcon";
import EditMiniIcon from "@/Components/Icons/EditMiniIcon";

export default function CompanyActions({ companyId }) {
  return (
    <div className="flex items-center space-x-2">
      <a
        href={route("company.edit", companyId)}
        className="p-2 rounded-full hover:bg-gray-200 transition"
        title="編集"
      >
        <EditMiniIcon />
      </a>
      <button
        onClick={() => {
          if (confirm("本当に削除しますか？")) {
            router.delete(route("company.destroy", companyId));
          }
        }}
        className="p-2 rounded-full text-gray-500 hover:text-red-500 transition"
        title="削除"
      >
        <TrashIcon />
      </button>
    </div>
  );
}