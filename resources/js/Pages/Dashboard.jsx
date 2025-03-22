import React from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";

export default function Dashboard({ industries, contents, entrysheets, industriesWithCompanies }) {
    return (
        <DashboardLayout
            industries={industries}
            contents={contents}
            entrysheets={entrysheets}
            industriesWithCompanies={industriesWithCompanies}
        />
    );
}