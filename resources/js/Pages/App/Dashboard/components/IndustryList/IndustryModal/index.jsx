import React, { useRef, useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import { copyToClipboard } from '@/Utils/copyToClipboard';

export function IndustryModal({
  industry,
  companies,
  onMouseEnter,
  onMouseLeave,
  setSelectedIndustry,
}) {
  const closeModal = () => {
    setSelectedIndustry(null);
  };
  const modalRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [copiedCompanyId, setCopiedCompanyId] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsVisible(false);
        setTimeout(() => {
          closeModal();
        }, 300);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeModal]);

  useEffect(() => {
    setIsVisible(!!industry && !!companies);
  }, [industry, companies]);

  const handleCopyToClipboard = (loginId, companyId) => {
    copyToClipboard(loginId);
    setCopiedCompanyId(companyId);
    setTimeout(() => {
      setCopiedCompanyId(null);
    }, 2000);
  };

  if (!industry || !companies) {
    return null;
  }

  return (
    <div
      id="industry-modal-container"
      className={`fixed left-[21%] top-[15%] z-50 flex cursor-default items-start p-2 transition-opacity duration-300 ease-in-out ${isVisible ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      ref={modalRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative w-[50vw] max-w-[90vw] rounded-[12px] border-gray-100 bg-white p-6">
        <p
          id="industry-modal-title"
          className="mb-4 text-center text-lg font-semibold text-gray-800"
        >
          {industry?.name || '企業一覧'}
        </p>

        <button
          className="absolute right-4 top-4 rounded-[12px] bg-gray-800 px-3 py-1 text-center text-sm text-white hover:bg-gray-600"
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => closeModal(), 300);
          }}
        >
          閉じる
        </button>

        <div>
          <ul className="mx-auto w-full space-y-2 text-sm">
            <li className="flex w-full items-center justify-between rounded-[12px] px-4 py-2">
              <div className="w-1/4 flex-shrink-0 flex-grow-0 text-center">
                <span className="text-gray-900">企業名</span>
              </div>
              <div className="w-1/4 flex-shrink-0 flex-grow-0 text-center">
                <span className="text-gray-900">採用HP</span>
              </div>
              <div className="w-1/4 flex-shrink-0 flex-grow-0 text-center">
                <span className="text-gray-900">MyPage</span>
              </div>
              <div className="w-1/4 flex-shrink-0 flex-grow-0 text-center text-gray-900">
                <span className="text-gray-900">ID</span>
              </div>
            </li>
          </ul>
        </div>

        <div id="industry-modal-content" className="max-h-[60vh] overflow-y-auto">
          {companies && companies.length > 0 ? (
            <ul className="mx-auto w-full space-y-1 text-sm">
              {companies.map((company) => (
                <li
                  key={company.id}
                  className="relative flex w-full items-center justify-between rounded-[12px] px-4 py-1"
                >
                  <div className="w-1/4 flex-shrink-0 flex-grow-0 text-center">
                    {company.show ? (
                      <Link href={company.show} className="text-blue-500 hover:text-blue-900">
                        {company.name}
                      </Link>
                    ) : (
                      <span className="text-gray-900">{company.name}</span>
                    )}
                  </div>

                  <div className="w-1/4 flex-shrink-0 flex-grow-0 text-center">
                    {company.homepage ? (
                      <a
                        href={company.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-900"
                      >
                        採用HP
                      </a>
                    ) : (
                      <span className="text-gray-900">------</span>
                    )}
                  </div>
                  <div className="w-1/4 flex-shrink-0 flex-grow-0 text-center">
                    {company.mypage ? (
                      <a
                        href={company.mypage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-900"
                      >
                        Mypage
                      </a>
                    ) : (
                      <span className="text-gray-900">------</span>
                    )}
                  </div>
                  <div
                    className="flex w-1/4 min-w-[80px] cursor-pointer items-center justify-center text-nowrap rounded-full border px-3 py-1 text-center text-sm text-gray-900 transition-transform duration-200 hover:scale-105"
                    onClick={() => handleCopyToClipboard(company.loginid || '', company.id)}
                  >
                    {copiedCompanyId === company.id ? (
                      <span className="font-semibold text-green-600 opacity-100 transition-opacity duration-300">
                        Copied!
                      </span>
                    ) : (
                      <span>{company.loginid || '------------'}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-600">この業界に登録されている企業はありません。</p>
          )}
        </div>
      </div>
    </div>
  );
}
