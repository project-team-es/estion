import React from 'react';
import { Link } from '@inertiajs/react';
import { icons } from '@/Utils/icons';

export default function EntrysheetActionButtons({ setShowFilter }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <Link
        href={route('entrysheet.create')}
        className="rounded-[12px] bg-blue-500 px-4 py-2 font-bold text-white hover:scale-105"
        dangerouslySetInnerHTML={{ __html: icons.add_es }}
      />

      <button
        onClick={() => setShowFilter(true)}
        className="rounded-full px-4 py-2 font-bold text-gray-500 transition hover:bg-gray-300 hover:text-white"
        dangerouslySetInnerHTML={{ __html: icons.search }}
      />
    </div>
  );
}
