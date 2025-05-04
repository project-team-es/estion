import React from "react";
import IndustryList from "@/Pages/App/Dashboard/components/IndustryList";
import ContentList from "@/Pages/App/Dashboard/components/ContentList";
import EntrySheetList from "@/Pages/App/Dashboard/components/EntrySheetList";
import { Link } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";

export default function Dashboard({ industries, contents, entrysheets, industriesWithCompanies }) {
    return (
        <AppLayout>
            <div className="min-h-screen bg-gray-100">
                <div className="flex">
                    <IndustryList
                        className="w-1/6 p-4 fixed top-10 left-6 md:left-10 lg:left-16 md:h-screen md:flex md:flex-col md:justify-between z-10 relative"
                        industries={industries}
                        industriesWithCompanies={industriesWithCompanies}
                    />
                    <main className="flex-grow ml-[1%] mr-[1%] px-4 mt-10">
                        <ContentList contents={contents} />
                    </main>
                    {entrysheets && (
                        <EntrySheetList
                            className="w-1/6 p-4 fixed top-10 right-6 md:right-10 lg:right-16 md:h-screen md:flex md:flex-col md:justify-between z-10 relative"
                            entrysheets={entrysheets}
                        />
                    )}
                </div>
                <div className="mt-4">
                    <Link href={route('logout')} method="post" as="button" type="button">
                        ログアウト
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}