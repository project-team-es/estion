import React from "react";
import CompanyListItem from "./CompanyListItem";

export default function CompanyList({ companies, onCompanyClick, onCompanyRightClick, onDelete, selectedCompanyId }) {
    return (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {companies.map((company) => (
                <CompanyListItem
                    key={company.id}
                    company={company}
                    onCompanyClick={onCompanyClick}
                    onCompanyRightClick={onCompanyRightClick}
                    onDelete={onDelete}
                    selectedCompanyId={selectedCompanyId}
                />
            ))}
        </div>
    );
}