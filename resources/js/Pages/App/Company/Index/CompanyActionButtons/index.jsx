import React from 'react';
import { Link } from '@inertiajs/react';
import AddCompanyicon from '@/Components/Icons/AddCompanyicon';
import { icons } from '@/Utils/icons';
export default function CompanyActionButtons() {
  return (
    <div className="mb-4 flex items-center justify-between">
      <Link
        href="/company/create"
        className="rounded-[12px] bg-blue-500 px-4 py-2 font-semibold text-white hover:scale-105"
      >
        <AddCompanyicon />
      </Link>
      <button
        className="rounded-full px-4 py-2 font-bold text-gray-500 transition hover:bg-gray-300 hover:text-white"
        disabled={true}
        dangerouslySetInnerHTML={{ __html: icons.search }}
      ></button>
    </div>
  );
}
