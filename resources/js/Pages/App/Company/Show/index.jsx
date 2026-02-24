import React from 'react';
import { AppLayout } from '@/Layouts/AppLayout';
import { AddEsMiniButton } from '@/Components/AddEsMiniButton';
import { Head, router } from '@inertiajs/react';
import CompanyInfo from './CompanyInfo';
import CompanyActions from './CompanyActions';
import { formatDate } from '@/Utils/formatDate';

export default function Show({ company }) {
  return (
    <>
      <Head>
        <title>企業詳細｜estion.</title>
        <meta
          name="description"
          content="estion.の企業詳細ページです。企業の詳細を確認できます。"
        />
        <meta name="google-adsense-account" content="ca-pub-9604843985307640" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9604843985307640"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <div className="mx-auto max-w-7xl py-12">
        <div className="rounded-[12px] border bg-white p-6 shadow-md">
          {/* ここからコンテンツ */}
          <div className="mb-6 flex flex-wrap items-start justify-between">
            <div className="mb-3 flex items-center space-x-4">
              {/* 企業名 */}
              <h2 className="whitespace-nowrap text-xl font-bold md:text-2xl">{company.name}</h2>

              {/* 業界名 */}
              <span className="whitespace-nowrap rounded-full border px-3 py-1 text-xs font-semibold text-gray-900 md:text-sm">
                {company.industry?.name || '-----'}
              </span>
            </div>

            <div className="flex items-start gap-2">
              <CompanyInfo company={company} />
              <CompanyActions companyId={company.id} />
            </div>
          </div>

          <div className="mt-6">
            <h3 className="flex items-center space-x-2 text-xl font-bold md:text-2xl">
              <span>エントリーシート一覧</span>
              <AddEsMiniButton
                href={route('entrysheet.create.with.company', {
                  company_id: company.id,
                })}
              />
            </h3>

            {company.entrysheets.length === 0 ? (
              <p className="mt-4 text-gray-600">この企業のエントリーシートは登録されていません。</p>
            ) : (
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {company.entrysheets.map((entrysheet) => (
                  <div
                    key={entrysheet.id}
                    className="cursor-pointer rounded-[12px] border bg-white p-4 hover:bg-gray-100"
                    onClick={() => router.visit(route('entrysheet.show', entrysheet.id))}
                  >
                    <h3 className="text-lg font-semibold">{entrysheet.title}</h3>
                    <p className="text-sm text-gray-600">
                      締切: {entrysheet.deadline ? formatDate(entrysheet.deadline) : '未設定'}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

Show.layout = (page) => <AppLayout title="企業詳細">{page}</AppLayout>;
