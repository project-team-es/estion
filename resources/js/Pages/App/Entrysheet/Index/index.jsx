import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { usePage } from '@inertiajs/react';
import EntrysheetList from './EntrysheetList';
import EntrysheetFilterModal from './EntryseetFilterModal';
import EntrysheetActionButtons from './EntrysheetActionbuttons';
import { Head, router } from '@inertiajs/react';

export default function Entrysheet() {
  const { entrysheets, filters } = usePage().props;
  const [showFilter, setShowFilter] = useState(false);

  const handleDelete = (id) => {
    if (!confirm('このエントリーシートを削除しますか？')) return;
    router.delete(route('entrysheet.destroy', id), {
      preserveScroll: true,
    });
  };

  return (
    <AppLayout>
      <Head>
        <title>ES一覧</title>
        <meta
          name="description"
          content="estion.のES一覧ページです。登録したエントリーシートの一覧を確認できます。"
        />
      </Head>
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[12px] bg-white shadow-md">
            <div className="p-6 text-gray-900">
              <EntrysheetActionButtons setShowFilter={setShowFilter} />
              {/* 
              <EntrysheetFilterModal
                showFilter={showFilter}
                setShowFilter={setShowFilter}
                filters={filters}
              /> */}

              <h2 className="mt-6 text-xl font-bold">登録したエントリーシート</h2>

              {entrysheets.length === 0 ? (
                <p className="mt-4 text-gray-600">登録されたエントリーシートがありません。</p>
              ) : (
                <EntrysheetList entrysheets={entrysheets} onDelete={handleDelete} />
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
