import React, { useState } from "react";
import { usePage } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";


export default function CompanyIndex() {
  const { companies } = usePage().props;
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);

  const handleCompanyClick = (id) => {
    window.location.href = `/company/${id}`;
  };

  const handleCompanyRightClick = (e, id) => {
    e.preventDefault();
    setSelectedCompanyId(id);
  };

  const handleDelete = async (id) => {
    if (!confirm("この企業を削除しますか？")) return;

    try {
      const response = await fetch(`/company/${id}`, {
        method: "DELETE",
        headers: {
          "X-CSRF-TOKEN": document.head.querySelector('meta[name="csrf-token"]').content,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        location.reload();
      } else {
        alert("削除に失敗しました。");
      }
    } catch (err) {
      console.error("削除エラー:", err);
      alert("削除に失敗しました。");
    }
  };

  return (
    <AppLayout>
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden sm:rounded-[12px] p-6 text-gray-900">
            <div className="flex justify-between items-center mb-4">
              <a
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

            <h2 className="text-xl font-bold mt-6">登録した企業</h2>
            {companies.length === 0 ? (
              <p className="text-gray-600 mt-4">登録された企業がありません。</p>
            ) : (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {companies.map((company) => (
                  <div
                    key={company.id}
                    className="p-4 border rounded-[12px] cursor-pointer relative transition-all duration-300 hover:shadow-lg"
                    onClick={() => handleCompanyClick(company.id)}
                    onContextMenu={(e) => handleCompanyRightClick(e, company.id)}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">{company.name}</h3>
                      {selectedCompanyId === company.id && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(company.id);
                          }}
                          className="text-gray-500 w-7 h-7 p-0 rounded-full flex items-center justify-center hover:text-red-500"
                          dangerouslySetInnerHTML={{ __html: window.icons?.trash }}
                        />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{company.industry?.name ?? "業界なし"}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      </AppLayout>
  );
}