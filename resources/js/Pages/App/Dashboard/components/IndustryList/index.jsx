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
    <div className="z-10 ml-[4%] flex w-1/5 flex-col justify-between">
      <p className="mb-4 text-center font-semibold text-gray-900">業界</p>

      {industries.length === 0 ? (
        <p className="text-gray-600">登録された業界がありません。</p>
      ) : (
        <div className="flex flex-1 flex-col items-center space-y-2">
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
