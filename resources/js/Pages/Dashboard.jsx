import React from "react";
import NavBar from "@/Components/NavBar";
import IndustryList from "@/Components/Dashboard/IndustryList";
import ContentList from "@/Components/Dashboard/ContentList";
import EntrySheetList from "@/Components/Dashboard/EntrysheetList";
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
        </div>
    );
}