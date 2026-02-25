import { Link } from '@inertiajs/react';
import { AddCompanyIcon } from '@/Components/Icons/AddCompanyIcon';

export function CompanyActionButtons() {
  return (
    <div className="mb-4 flex items-center justify-between">
      <Link
        href="/company/create"
        className="rounded-[12px] bg-blue-500 px-4 py-2 font-semibold text-white hover:scale-105"
      >
        <AddCompanyIcon />
      </Link>
    </div>
  );
}
