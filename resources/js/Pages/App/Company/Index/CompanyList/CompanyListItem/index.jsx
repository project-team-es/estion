import React from 'react';
import { icons } from '@/Utils/icons';

export default function CompanyListItem({
  company,
  onCompanyClick,
  onCompanyRightClick,
  onDelete,
}) {
  return (
    <div
      key={company.id}
      className="group relative cursor-pointer rounded-[12px] border p-4 transition-transform duration-200 hover:scale-105"
      onClick={() => onCompanyClick(company.id)}
      onContextMenu={(e) => onCompanyRightClick(e, company.id)}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{company.name}</h3>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(company.id);
          }}
          className="flex h-7 w-7 items-center justify-center rounded-full p-0 text-gray-500 opacity-0 transition-opacity duration-300 hover:text-red-500 group-hover:opacity-100" // opacity 制御を追加
          dangerouslySetInnerHTML={{ __html: icons.trash_mini }}
        />
      </div>
      <p className="text-sm text-gray-600">{company.industry?.name ?? '業界なし'}</p>
    </div>
  );
}
