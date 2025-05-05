import React, { useState } from "react";
import { usePage, router } from "@inertiajs/react"; 
import AppLayout from "@/Layouts/AppLayout";
import CompanyList from "./CompanyList";
import CompanyActionButtons from "./CompanyActionButtons";

export default function Company() {
    const { companies } = usePage().props;
    const [selectedCompanyId, setSelectedCompanyId] = useState(null);

    const handleCompanyClick = (id) => {
        window.location.href = `/company/${id}`;
    };

    const handleCompanyRightClick = (e, id) => {
        e.preventDefault();
        setSelectedCompanyId(id);
    };

    const handleDelete = (id) => {
            if (!confirm("この企業を削除しますか？")) return;
            router.delete(route("company.destroy", id), {
                preserveScroll: true,
            });
        };

    return (
        <AppLayout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden sm:rounded-[12px] p-6 text-gray-900">
                        <CompanyActionButtons />

                        <h2 className="text-xl font-bold mt-6">登録した企業</h2>
                        {companies.length === 0 ? (
                            <p className="text-gray-600 mt-4">登録された企業がありません。</p>
                        ) : (
                            <CompanyList
                                companies={companies}
                                onCompanyClick={handleCompanyClick}
                                onCompanyRightClick={handleCompanyRightClick}
                                onDelete={handleDelete}
                                selectedCompanyId={selectedCompanyId}
                            />
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}