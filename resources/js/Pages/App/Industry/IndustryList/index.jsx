import { useState } from 'react';
import IndustryModal from '../IndustryModal';

export default function IndustryList({ industries, industriesWithCompanies }) {
  const [selectedIndustry, setSelectedIndustry] = useState(null);

  const companiesInSelectedIndustry = selectedIndustry
    ? industriesWithCompanies[selectedIndustry.id] || []
    : [];

  const handleCloseModal = () => {
    setSelectedIndustry(null);
  };
  return (
    <div className="">
      <p className="mb-4 text-center font-semibold text-gray-900">業界</p>

      {industries.length === 0 ? (
        <p className="text-center text-gray-600">登録された業界がありません。</p>
      ) : (
        <div className="flex flex-1 flex-col items-center space-y-2">
          {industries.map((industry) => (
            <div
              key={industry.id}
              className="group relative flex min-h-[60px] w-[200px] cursor-pointer items-center justify-center rounded-[12px] border bg-white p-2 transition-transform duration-200 hover:scale-105"
              onClick={() => setSelectedIndustry(industry)}
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
          closeModal={handleCloseModal}
        />
      )}
    </div>
  );
}
