import { useState, useRef } from 'react';
import IndustryListItem from './IndustryListItem';
import IndustryModal from './IndustryModal';
import { copyToClipboard } from '@/Utils/copyToClipboard';

export default function IndustryList({ industries, industriesWithCompanies }) {
  console.log(industriesWithCompanies);
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const leaveTimeout = useRef(null);

  const handleIndustryMouseEnter = (industry) => {
    clearTimeout(leaveTimeout.current);
    setSelectedIndustry(industry);
  };

  const handleIndustryMouseLeave = () => {
    leaveTimeout.current = setTimeout(() => {
      setSelectedIndustry(null);
    }, 200);
  };

  const companiesInSelectedIndustry = selectedIndustry
    ? industriesWithCompanies[selectedIndustry.id] || []
    : [];

  return (
    <div className="z-10 ml-[4%] hidden w-1/5 flex-col justify-between md:flex">
      <p className="mb-4 text-center font-semibold text-gray-900">業界</p>

      {industries.length === 0 ? (
        <p className="text-gray-600">登録された業界がありません。</p>
      ) : (
        <div className="flex flex-1 flex-col items-center space-y-2">
          {industries.map((industry) => (
            <div
              key={industry.id}
              className="group relative flex min-h-[60px] w-[200px] cursor-pointer items-center justify-center rounded-[12px] border bg-white p-2 transition-transform duration-200 hover:scale-105"
              onMouseEnter={() => handleIndustryMouseEnter(industry)}
              onMouseLeave={handleIndustryMouseLeave}
            >
              <p className="truncate text-center text-sm font-semibold text-gray-500">
                {industry.name}
              </p>
            </div>
          ))}
        </div>
      )}

      {selectedIndustry && (
        <IndustryModal
          industry={selectedIndustry}
          companies={companiesInSelectedIndustry}
          onMouseEnter={() => clearTimeout(leaveTimeout.current)}
          onMouseLeave={() => {
            leaveTimeout.current = setTimeout(() => {
              setSelectedIndustry(null);
            }, 200);
          }}
        />
      )}
    </div>
  );
}
