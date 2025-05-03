import React, { useState } from "react";
import IndustryListItem from "./IndustryListItem";
import IndustryModal from "./IndustryModal";

export default function IndustryList({ industries, industriesWithCompanies }) {
    const [selectedIndustryId, setSelectedIndustryId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleIndustryMouseEnter = (industryId) => {
        setSelectedIndustryId(industryId);
        setIsModalOpen(true);
    };

    const handleIndustryMouseLeave = () => {
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

    const selectedIndustry = industries.find(industry => industry.id === selectedIndustryId);
    const companiesInSelectedIndustry = industriesWithCompanies[selectedIndustryId] || [];

    return (
        <div className="w-1/6 p-4 fixed top-10 left-6 md:left-10 lg:left-16
                        md:h-screen md:flex md:flex-col md:justify-between z-10 relative">
            <p className="text-center font-semibold text-gray-900 mb-4">業界</p>

            {industries.length === 0 ? (
                <p className="text-gray-600">登録された業界がありません。</p>
            ) : (
                <div className="space-y-2 flex-1 overflow-y-auto">
                    {industries.map((industry) => (
                        <IndustryListItem
                            key={industry.id}
                            industry={industry}
                            onMouseEnter={() => handleIndustryMouseEnter(industry.id)}
                            onMouseLeave={handleIndustryMouseLeave}
                        />
                    ))}
                </div>
            )}

            {isModalOpen && selectedIndustryId && (
                <IndustryModal
                    industry={selectedIndustry}
                    companies={companiesInSelectedIndustry}
                    onClose={closeModal}
                    onCopyToClipboard={handleCopyToClipboard}
                />
            )}
        </div>
    );
}