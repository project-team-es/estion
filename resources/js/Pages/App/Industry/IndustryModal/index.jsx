import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import { copyToClipboard } from '@/Utils/copyToClipboard';

export default function IndustryModal({ industry, companies, closeModal }) {
  const [isVisible, setIsVisible] = useState(false);
  const [copiedCompanyId, setCopiedCompanyId] = useState(null);

  useEffect(() => {
    if (industry && companies) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [industry, companies]);

  const handleCopyToClipboard = (loginId, companyId) => {
    copyToClipboard(loginId);
    setCopiedCompanyId(companyId);
    setTimeout(() => {
      setCopiedCompanyId(null);
    }, 2000);
  };

  const handleBackdropClick = (event) => {
    if (event.target.id === 'industry-modal-backdrop') {
      setIsVisible(false);
      setTimeout(() => closeModal(), 300);
    }
  };

  const handleContentClick = (event) => {
    event.stopPropagation();
  };

  if (!industry || !companies) {
    return null;
  }

  return (
    <div
      id="industry-modal-backdrop"
      className={`fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-25 transition-opacity duration-300 ease-in-out ${isVisible ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      onClick={handleBackdropClick}
    >
      <div
        id="industry-modal-container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="industry-modal-title"
        className={`relative w-[90vw] max-w-2xl rounded-[12px] border bg-white p-6 shadow-lg transition-all duration-300 ease-in-out ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        onClick={handleContentClick}
      >
        <p
          id="industry-modal-title"
          className="mb-4 text-center text-lg font-semibold text-gray-800"
        >
          {industry?.name || '企業一覧'}
        </p>

        <button
          className="absolute right-4 top-4 rounded-[12px] bg-gray-800 px-3 py-1 text-center text-sm text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => closeModal(), 300);
          }}
        >
          閉じる
        </button>

        <div id="industry-modal-content" className="max-h-[60vh] overflow-y-auto">
          {companies && companies.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    企業名
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    採用HP
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    MyPage
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    ID
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {companies.map((company) => (
                  <tr key={company.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                      {company.show ? (
                        <Link
                          href={company.show}
                          className="text-blue-600 transition-colors hover:text-blue-800"
                        >
                          {company.name}
                        </Link>
                      ) : (
                        <span>{company.name}</span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {company.homepage ? (
                        <a
                          href={company.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 transition-colors hover:text-blue-800"
                        >
                          採用HP
                        </a>
                      ) : (
                        <span className="text-gray-600">------</span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {company.mypage ? (
                        <a
                          href={company.mypage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 transition-colors hover:text-blue-800"
                        >
                          Mypage
                        </a>
                      ) : (
                        <span className="text-gray-600">------</span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <div
                        className="inline-flex cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white px-3 py-1 text-center text-gray-900 transition-all duration-200 hover:scale-105 hover:bg-gray-100"
                        onClick={() => handleCopyToClipboard(company.loginid || '', company.id)}
                      >
                        {copiedCompanyId === company.id ? (
                          <span className="font-semibold text-green-600 opacity-100 transition-opacity duration-300">
                            Copied!
                          </span>
                        ) : (
                          <span className="text-gray-800">{company.loginid || '------------'}</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="mt-4 text-center text-gray-600">
              この業界に登録されている企業はありません。
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
