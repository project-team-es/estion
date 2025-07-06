import React from 'react';
import { router } from '@inertiajs/react';
import { icons } from '@/Utils/icons';
import formatDate from '@/Utils/formatDate';

export default function EntrysheetListItem({ entrysheet, onDelete }) {
  return (
    <div
      key={entrysheet.id}
      className="group relative cursor-pointer rounded-[12px] border p-4 transition-transform duration-200 hover:scale-105"
      onClick={() => router.visit(route('entrysheet.show', entrysheet.id))}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{entrysheet.title}</h3>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(entrysheet.id);
          }}
          className="hidden h-7 w-7 items-center justify-center rounded-full p-0 text-gray-500 transition-all duration-300 hover:text-red-500 group-hover:flex"
          dangerouslySetInnerHTML={{ __html: icons.trash_mini }}
        />
      </div>
      <p className="mt-1 text-sm text-gray-600">企業: {entrysheet.company?.name || ''}</p>
      {entrysheet.deadline && (
        <p className="text-sm text-gray-600">
          締切: {entrysheet.deadline ? formatDate(entrysheet.deadline) : '未設定'}
        </p>
      )}
    </div>
  );
}
