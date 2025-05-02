import React from "react";
import NavBar from "@/Pages/App/components/NavBar";
import IndustryList from "@/Pages/App/Dashboard/components/IndustryList";
import ContentList from "@/Pages/App/Dashboard/components/ContentList";
import EntrySheetList from "@/Pages/App/Dashboard/components/EntrySheetList";
import { Link } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";

export default function Dashboard({ industries, contents, entrysheets, industriesWithCompanies }) {

    return (
        <AppLayout title="Dashboard">
        <div className="min-h-screen bg-gray-100">

            <div className="flex">
                <IndustryList industries={industries} industriesWithCompanies={industriesWithCompanies} />
                <main className="flex-grow ml-[18%] mr-[18%] px-4 pt-24">
                    <ContentList contents={contents} />
                </main>
                <EntrySheetList entrysheets={entrysheets} />
            </div>
            <Link href={route('logout')} method="post" as="button" type="button">
                ログアウト
            </Link>
        </div>
        </AppLayout>
    );
}