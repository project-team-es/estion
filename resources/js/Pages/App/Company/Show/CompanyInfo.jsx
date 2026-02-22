// resources/js/Components/CompanyInfo.jsx
import React from 'react';
import { copyToClipboard } from '@/Utils/copyToClipboard';

export default function CompanyInfo({ company }) {
  return (
    <div className="mb-8 flex flex-wrap items-center gap-2 text-xs md:text-sm">
      <a
        href={company.homepage}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border px-3 py-1 font-semibold text-blue-500 transition-transform hover:scale-105"
      >
        企業HP
      </a>

      <a
        href={company.mypage}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border px-3 py-1 font-semibold text-blue-500 transition-transform hover:scale-105"
      >
        MyPage
      </a>

      <div
        className="relative flex cursor-pointer flex-col items-center"
        onClick={() => copyToClipboard(company.loginid)}
      >
        <span className="rounded-full border px-3 py-1 font-semibold text-gray-900 transition-transform hover:scale-105 sm:hidden">
          ID
        </span>

        <span className="hidden rounded-full border px-3 py-1 font-semibold text-gray-900 transition-transform hover:scale-105 sm:inline-block">
          ID: {company.loginid ?? '----'}
        </span>
      </div>
    </div>
  );
}
