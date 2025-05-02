import React from "react";
import NavBar from "@/Pages/App/components/NavBar";
import IndustryList from "@/Pages/App/Dashboard/components/IndustryList";
import ContentList from "@/Pages/App/Dashboard/components/ContentList";
import EntrySheetList from "@/Pages/App/Dashboard/components/EntrySheetList";
import { Link } from "@inertiajs/react";

export default function DashboardLayout({ industries, contents, entrysheets, industriesWithCompanies }) {
    console.log("industries:", industries);
    return (
        <div className="min-h-screen bg-gray-100">
            <NavBar />

            <div className="flex">
                <IndustryList industries={industries} />
                <main className="flex-grow ml-[18%] mr-[18%] px-4 pt-24">
                    <ContentList contents={contents} />
                </main>
                <EntrySheetList entrysheets={entrysheets} />
            </div>
            <Link href={route('logout')} method="post" as="button" type="button">
                ログアウト
            </Link>
        </div>
    );
}