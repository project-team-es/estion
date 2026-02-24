import { IndustryList } from '@/Pages/App/Dashboard/components/IndustryList';
import { ContentList } from '@/Pages/App/Dashboard/components/ContentList';
import { EntrySheetList } from '@/Pages/App/Dashboard/components/EntrySheetList';
import { AppLayout } from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ industries, contents, entrysheets, industriesWithCompanies }) {
  return (
    <AppLayout>
      <Head>
        <title>ダッシュボード｜estion.</title>
        <meta
          name="description"
          content="estion.のダッシュボードです。登録した企業やエントリーシートの進捗状況、就活に役立つ最新コンテンツをまとめて確認できます。"
        />
        <meta name="google-adsense-account" content="ca-pub-9604843985307640" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9604843985307640"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <div className="flex h-screen md:mt-10">
        <IndustryList
          className="z-10 flex h-screen w-1/5 flex-col justify-between"
          industries={industries}
          industriesWithCompanies={industriesWithCompanies}
        />
        <main className="ml-[1%] mr-[1%] h-full flex-grow overflow-y-auto px-4">
          <ContentList contents={contents} />
        </main>
        {entrysheets && (
          <EntrySheetList className="flex h-screen flex-col" entrysheets={entrysheets} />
        )}
      </div>
    </AppLayout>
  );
}
