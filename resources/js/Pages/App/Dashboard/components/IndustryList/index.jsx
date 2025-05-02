import React, { useState } from "react";
import { Link } from "@inertiajs/react";

export default function IndustryList({ industries, industriesWithCompanies }) {
    console.log(industries);
    console.log(industriesWithCompanies);
    const [selectedIndustryId, setSelectedIndustryId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleIndustryMouseEnter = (industryId) => {
        setSelectedIndustryId(industryId);
        setIsModalOpen(true);
    };

    const handleIndustryMouseLeave = () => {
        setIsModalOpen(false);
        setSelectedIndustryId(null);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedIndustryId(null);
    };

    const handleCopyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                alert("コピーしました: " + text);
            })
            .catch((err) => {
                console.error("コピーに失敗しました:", err);
            });
    };

    return (
        <div className="w-1/6 p-4 fixed top-16 left-6 md:left-10 lg:left-16
                        md:h-screen md:flex md:flex-col md:justify-between z-10 relative">
            <p className="text-center font-semibold text-gray-900 mb-4">業界</p>

            {industries.length === 0 ? (
                <p className="text-gray-600">登録された業界がありません。</p>
            ) : (
                <div className="space-y-2 flex-1 overflow-y-auto">
                    {industries.map((industry) => (
                        <div
                            key={industry.id}
                            className="relative bg-white p-2 rounded-[12px] cursor-pointer hover:bg-gray-100 text-sm"
                            style={{
                                minHeight: "60px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                            onMouseEnter={() => handleIndustryMouseEnter(industry.id)}
                            onMouseLeave={handleIndustryMouseLeave}
                        >
                            <p className="text-center text-m font-semibold truncate">{industry.name}</p>
                        </div>
                    ))}
                </div>
            )}

            {isModalOpen && selectedIndustryId && industriesWithCompanies[selectedIndustryId] && (
                <div
                    id="industry-modal-container"
                    className="fixed top-[13%] left-[20%] p-2 flex items-start opacity-100 transition-opacity duration-300 ease-in-out z-50"
                    onClick={closeModal} // モーダルの外側をクリックで閉じる
                >
                    <div className="w-[50vw] max-w-[90vw] bg-white border-gray-100 rounded-[12px] p-6 relative">
                        <p id="industry-modal-title" className="text-center font-semibold text-gray-800 text-lg mb-4">
                            {industries.find(industry => industry.id === selectedIndustryId)?.name || '企業一覧'}
                        </p>

                        <button
                            className="text-center absolute top-4 right-4 bg-gray-800 text-white px-3 py-1 rounded-[12px] text-sm hover:bg-gray-600"
                            onClick={closeModal}
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
                            {industriesWithCompanies[selectedIndustryId] && industriesWithCompanies[selectedIndustryId].length > 0 ? (
                                <ul className="text-sm space-y-2 w-3/4 md:w-1/2 mx-auto ml-4">
                                    {industriesWithCompanies[selectedIndustryId].map((company) => (
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
                                                onClick={() => handleCopyToClipboard(company.loginid || '------------')}
                                            >
                                                {company.loginid || '------------'}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-600 text-center">この業界に登録された企業はありません。</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}