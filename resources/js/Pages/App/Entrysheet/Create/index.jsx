import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import CreateForm from './CreateForm';
import { Head, Link } from '@inertiajs/react';

export default function Create({ industries, companies: selectedCompanies, presetTitles }) {
  const hasCompanies = industries.some(
    (industry) => industry.companies && industry.companies.length > 0
  );

  return (
    <AppLayout>
      <Head>
        <title>ES作成</title>
        <meta
          name="description"
          content="estion.のES作成ページです。応募企業のESを登録することができます。"
        />
        <meta name="google-adsense-account" content="ca-pub-9604843985307640"/>
      </Head>
      {!hasCompanies ? (
        <div className="py-12">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
              <div className="border-b border-gray-200 bg-white p-6 text-center">
                <p className="mb-4 text-lg text-gray-600">まずは企業を登録しましょう。</p>
                <p>
                  新しい企業を登録する場合は
                  <Link href={route('company.create')} className="text-blue-500 hover:underline">
                    こちら
                  </Link>
                  から行ってください。
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <CreateForm
          industries={industries}
          companies={selectedCompanies}
          presetTitles={presetTitles}
        />
      )}
    </AppLayout>
  );
}
