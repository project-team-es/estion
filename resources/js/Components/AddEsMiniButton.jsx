import React from 'react';
import { Link } from '@inertiajs/react';
import AddEsMiniIcon from './Icons/AddEsMiniIcon';

export default function AddEsMiniButton({ href }) {
  return (
    <Link
      href={href}
      className="bg-blue-500 inline-flex items-center justify-center p-2 rounded-[12px] hover:bg-blue-600 transition-transform duration-200"
    >
      <AddEsMiniIcon />
    </Link>
  );
}