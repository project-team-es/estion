import IndustryList from '@/Pages/App/Dashboard/components/IndustryList';
import ContentList from '@/Pages/App/Dashboard/components/ContentList';
import EntrySheetList from '@/Pages/App/Dashboard/components/EntrySheetList';
import AppLayout from '@/Layouts/AppLayout';

export default function Dashboard({ industries, contents, entrysheets, industriesWithCompanies }) {
  return (
    <AppLayout title="ホーム">
      <div className="flex min-h-screen justify-center md:mt-10">
        <IndustryList
          className="z-10 flex h-screen w-1/5 flex-col justify-between"
          industries={industries}
          industriesWithCompanies={industriesWithCompanies}
        />
        <main className="flex-grow px-4 pb-20">
          <ContentList contents={contents} />
        </main>
        {entrysheets && (
          <EntrySheetList className="flex h-screen flex-col" entrysheets={entrysheets} />
        )}
      </div>
    </AppLayout>
  );
}
