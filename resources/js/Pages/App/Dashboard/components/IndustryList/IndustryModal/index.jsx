import React, { useRef, useEffect, useState } from 'react';
import { Link } from "@inertiajs/react";

export default function IndustryModal({ industry, companies, onClose, onCopyToClipboard, onMouseEnter, onMouseLeave }) {
    const modalRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false); // 表示状態を管理する state

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsVisible(false); // 外側クリックで非表示に
                setTimeout(() => {
                    onClose();
                }, 300); // トランジションが終わるのを待って onClose を実行
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    useEffect(() => {
        // 親コンポーネントの isModalOpen と selectedIndustryId に基づいて isVisible を更新
        setIsVisible(!!industry && !!companies);
    }, [industry, companies]);

    if (!industry || !companies) {
        return null;
    }

    return (
        <div
            id="industry-modal-container"
            className={`fixed top-[15%] left-[21%] p-2 flex items-start z-50 cursor-default
                        transition-opacity duration-300 ease-in-out
                        ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} // Tailwind のトランジションクラスと opacity を制御
            ref={modalRef}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className="w-[50vw] max-w-[90vw] bg-white border-gray-100 rounded-[12px] p-6 relative">
                <p id="industry-modal-title" className="text-center font-semibold text-gray-800 text-lg mb-4">
                    {industry?.name || '企業一覧'}
                </p>

                <button
                    className="text-center absolute top-4 right-4 bg-gray-800 text-white px-3 py-1 rounded-[12px] text-sm hover:bg-gray-600"
                    onClick={() => setIsVisible(false)} // 閉じるボタンで非表示状態に変更
                >
                    閉じる
                </button>

                <div>
                    <ul className="text-sm space-y-2 w-3/4 md:w-1/2 mx-auto ml-4">
                        <li className="px-4 py-2 rounded-[12px] flex items-center justify-start w-full">
                            <div className="w-1/3 text-center flex-grow-0 flex-shrink-0">
                                <span className="text-gray-900">企業名</span>
                            </div>
                            <div className="w-1/3 text-center flex-grow-0 flex-shrink-0">
                                <span className="text-gray-900">採用HP</span>
                            </div>
                            <div className="w-1/3 text-center flex-grow-0 flex-shrink-0">
                                <span className="text-gray-900">MyPage</span>
                            </div>
                            <div className="w-1/3 text-center flex-grow-0 flex-shrink-0 text-gray-900">
                                <span className="text-gray-900">ID</span>
                            </div>
                        </li>
                    </ul>
                </div>

                <div id="industry-modal-content" className="overflow-y-auto max-h-[60vh]">
                    {companies && companies.length > 0 ? (
                        <ul className="text-sm space-y-2 w-3/4 md:w-1/2 mx-auto ml-4">
                            {companies.map(company => (
                                <li key={company.id} className="px-4 py-2 rounded-[12px] flex items-center justify-start w-full">
                                    <div className="w-1/3 text-center flex-grow-0 flex-shrink-0">
                                        {company.show ? (
                                            <Link href={company.show} className="text-blue-500 hover:text-blue-900">{company.name}</Link>
                                        ) : (
                                            <span className="text-gray-900">{company.name}</span>
                                        )}
                                    </div>

                                    <div className="w-1/3 text-center flex-grow-0 flex-shrink-0">
                                        {company.homepage ? (
                                            <a href={company.homepage} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-900">採用HP</a>
                                        ) : (
                                            <span className="text-gray-900">------</span>
                                        )}
                                    </div>
                                    <div className="w-1/3 text-center flex-grow-0 flex-shrink-0">
                                        {company.mypage ? (
                                            <a href={company.mypage} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-900">Mypage</a>
                                        ) : (
                                            <span className="text-gray-900">------</span>
                                        )}
                                    </div>
                                    <div
                                        className="px-3 py-1 text-sm text-center text-gray-900 rounded-full border transition-transform duration-200 hover:scale-105 text-nowrap cursor-pointer"
                                        onClick={() => onCopyToClipboard(company.loginid || '')}
                                    >
                                        {company.loginid || '------------'}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600 text-center">この業界に登録されている企業はありません。</p>
                    )}
                </div>
            </div>
        </div>
    );
}