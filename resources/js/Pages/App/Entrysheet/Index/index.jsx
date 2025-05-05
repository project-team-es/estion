import React, { useState } from "react";
import AppLayout from "@/Layouts/AppLayout";
import { usePage } from "@inertiajs/react";
import EntrysheetList from "./EntrysheetList";
import EntrysheetFilterModal from "./EntryseetFilterModal";
import EntrysheetActionButtons from "./EntrysheetActionbuttons";
import { router } from "@inertiajs/react";

export default function Entrysheet() {
    const { entrysheets, filters } = usePage().props;
    const [showFilter, setShowFilter] = useState(false);

    const handleDelete = (id) => {
        if (!confirm("このエントリーシートを削除しますか？")) return;
        router.delete(route("entrysheet.destroy", id), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden sm:rounded-[12px] relative">
                        <div className="p-6 text-gray-900">
                            <EntrysheetActionButtons setShowFilter={setShowFilter} />

                            <EntrysheetFilterModal
                                showFilter={showFilter}
                                setShowFilter={setShowFilter}
                                filters={filters}
                            />

                            <h2 className="text-xl font-bold mt-6">登録したエントリーシート</h2>

                            {entrysheets.length === 0 ? (
                                <p className="text-gray-600 mt-4">登録されたエントリーシートがありません。</p>
                            ) : (
                                <EntrysheetList entrysheets={entrysheets} onDelete={handleDelete} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}