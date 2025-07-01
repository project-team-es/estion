import React from 'react';
import IndustryList from '@/Pages/App/Dashboard/components/IndustryList';
import ContentList from '@/Pages/App/Dashboard/components/ContentList';
import EntrySheetList from '@/Pages/App/Dashboard/components/EntrySheetList';
import AppLayout from '@/Layouts/AppLayout';

export default function Dashboard({ industries, contents, entrysheets, industriesWithCompanies }) {
  return (
    <AppLayout title="ホーム">
      <div className="min-h-screen">
        <div className="flex">
          <IndustryList
            className="fixed relative left-6 top-10 z-10 w-1/5 p-4 md:left-10 md:flex md:h-screen md:flex-col md:justify-between lg:left-16"
            industries={industries}
            industriesWithCompanies={industriesWithCompanies}
          />
          <main className="ml-[1%] mr-[1%] mt-10 flex-grow px-4">
            <ContentList contents={contents} />
          </main>
          {entrysheets && (
            <EntrySheetList
              className="fixed relative right-10 z-10 w-1/5 p-4 md:right-10 md:flex md:h-screen md:flex-col md:justify-between lg:right-16"
              entrysheets={entrysheets}
            />
          )}
        </div>
      </div>
    </AppLayout>
  );
}
