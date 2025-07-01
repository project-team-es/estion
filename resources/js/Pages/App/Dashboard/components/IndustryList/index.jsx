import React, { useState, useRef } from 'react';
import IndustryListItem from './IndustryListItem';
import IndustryModal from './IndustryModal';
import { copyToClipboard } from '@/Utils/copyToClipboard';

export default function IndustryList({ industries, industriesWithCompanies }) {
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const leaveTimeout = useRef(null);
  const LEAVE_DELAY = 200;

  const handleIndustryMouseEnter = (industry) => {
    clearTimeout(leaveTimeout.current);
    setSelectedIndustry(industry);
  };

  const handleIndustryMouseLeave = () => {
    leaveTimeout.current = setTimeout(() => {
      setSelectedIndustry(null);
    }, LEAVE_DELAY);
  };

  const closeModal = () => {
    setSelectedIndustry(null);
  };

  const handleCopyToClipboard = (text) => {
    copyToClipboard(text);
  };

  const companiesInSelectedIndustry = selectedIndustry
    ? industriesWithCompanies[selectedIndustry.id] || []
    : [];

  return (
    <div className="fixed relative left-6 top-10 z-10 w-1/5 p-4 md:left-10 md:flex md:h-screen md:flex-col md:justify-between lg:left-16">
      <p className="mb-4 text-center font-semibold text-gray-900">業界</p>

      {industries.length === 0 ? (
        <p className="text-gray-600">登録された業界がありません。</p>
      ) : (
        <div className="flex flex-1 flex-col items-center space-y-2 overflow-y-auto pt-2">
          {industries.map((industry) => (
            <IndustryListItem
              key={industry.id}
              industry={industry}
              onMouseEnter={() => handleIndustryMouseEnter(industry)}
              onMouseLeave={handleIndustryMouseLeave}
            />
          ))}
        </div>
      )}

      {selectedIndustry && (
        <IndustryModal
          industry={selectedIndustry}
          companies={companiesInSelectedIndustry}
          onClose={closeModal}
          onCopyToClipboard={handleCopyToClipboard}
          onMouseEnter={() => clearTimeout(leaveTimeout.current)}
          onMouseLeave={() => {
            leaveTimeout.current = setTimeout(() => {
              setSelectedIndustry(null);
            }, LEAVE_DELAY);
          }}
        />
      )}
    </div>
  );
}
