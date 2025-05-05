import React from "react";

export default function CompanyList({ companies }) {
    if (!companies || companies.length === 0) {
        return <p className="text-gray-600 mt-4">登録された企業がありません。</p>;
    }

    return (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {companies.map((company) => (
                <div
                    key={company.id}
                    className="p-4 border rounded-[12px] cursor-pointer relative transition-all duration-300 hover:shadow-lg"
                    onClick={() => window.location.href = `/company/${company.id}`}
                >
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">{company.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{company.industry?.name ?? "業界なし"}</p>
                </div>
            ))}
        </div>
    );
}