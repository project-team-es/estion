import React from "react";
import IndustryList from "@/Pages/App/Dashboard/components/IndustryList";
import ContentList from "@/Pages/App/Dashboard/components/ContentList";
import EntrySheetList from "@/Pages/App/Dashboard/components/EntrySheetList";
import { Link } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";

export default function Dashboard({ industries, contents, entrysheets, industriesWithCompanies }) {
    return (
        <AppLayout title="Home">
            <div className="min-h-screen">
                <div className="flex">
                    <IndustryList
                        className="w-1/5 p-4 fixed top-10 left-6 md:left-10 lg:left-16 md:h-screen md:flex md:flex-col md:justify-between z-10 relative"
                        industries={industries}
                        industriesWithCompanies={industriesWithCompanies}
                    />
                    <main className="flex-grow ml-[1%] mr-[1%] px-4 mt-10">
                        <ContentList contents={contents} />
                    </main>
                    {entrysheets && (
                        <EntrySheetList
                            className="w-1/5 p-4 fixed right-10 md:right-10 lg:right-16 md:h-screen md:flex md:flex-col md:justify-between z-10 relative"
                            entrysheets={entrysheets}
                        />
                    )}
                </div>
            </div>
        </AppLayout>
    );
}