import React from "react";
import AppLayout from "@/Layouts/AppLayout";
import CreateForm from "./CreateForm";
import { Head, Link } from "@inertiajs/react";

export default function Create({ industries, companies: selectedCompanies, presetTitles }) {
    const hasCompanies = industries.some(industry => industry.companies && industry.companies.length > 0);

    return (
        <AppLayout>
            {!hasCompanies ? (
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 bg-white border-b border-gray-200 text-center">
                                <p className="text-lg text-gray-600 mb-4">まずは企業を登録しましょう。</p>
                                <p>
                                    新しい企業を登録する場合は<Link href={route('company.create')} className="text-blue-500 hover:underline">こちら</Link>から行ってください。
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <CreateForm industries={industries} companies={selectedCompanies} presetTitles={presetTitles} />
            )}
        </AppLayout>
    );
}