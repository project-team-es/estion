import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import CompanyList from './CompanyList';
import CompanyActionButtons from './CompanyActionButtons';

export default function Company() {
  const { companies } = usePage().props;
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);

  const handleCompanyClick = (id) => {
    window.location.href = `/company/${id}`;
  };

  const handleCompanyRightClick = (e, id) => {
    e.preventDefault();
    setSelectedCompanyId(id);
  };

  const handleDelete = (id) => {
    if (!confirm('この企業を削除しますか？')) return;
    router.delete(route('company.destroy', id), {
      preserveScroll: true,
    });
  };

  return (
    <AppLayout title="企業一覧">
      <div className="mx-auto py-12 max-w-7xl sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[12px] bg-white p-6 text-gray-900 shadow-md">
          <CompanyActionButtons />

          <h2 className="mt-6 text-xl font-bold">登録した企業</h2>
          {companies.length === 0 ? (
            <p className="mt-4 text-gray-600">登録された企業がありません。</p>
          ) : (
            <CompanyList
              companies={companies}
              onCompanyClick={handleCompanyClick}
              onCompanyRightClick={handleCompanyRightClick}
              onDelete={handleDelete}
              selectedCompanyId={selectedCompanyId}
            />
          )}
        </div>
      </div>
    </AppLayout>
  );
}
