// resources/js/Components/CompanyInfo.jsx
import React from "react";
import copyToClipboard from "@/Utils/copyToClipboard";

export default function CompanyInfo({ company }) {
  return (
    <div className="mb-8 flex flex-wrap items-center gap-4 text-sm">
        <a
          href={company.homepage}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1 text-blue-500 font-semibold rounded-full border hover:scale-105 transition-transform"
        >
          企業HP
        </a>
        <a
          href={company.mypage}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1 text-blue-500 font-semibold rounded-full border hover:scale-105 transition-transform"
        >
          MyPage
        </a>
      <div
        className="relative flex flex-col items-center cursor-pointer"
        onClick={() => copyToClipboard(company.loginid)}
      >
        <span className="px-3 py-1 text-gray-900 font-semibold rounded-full border hover:scale-105 transition-transform">
          ID: {company.loginid ?? "-----"}
        </span>
      </div>

      <span className="px-3 py-1 text-gray-900 font-semibold rounded-full border">
        {company.industry?.name ?? "-----"}
      </span>
    </div>
  );
}
