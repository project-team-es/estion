import { Link } from '@inertiajs/react';
import { AddEsMiniIcon } from './Icons/AddEsMiniIcon';

export function AddEsMiniButton({ href }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-[12px] bg-blue-500 p-2 transition-transform duration-200 hover:bg-blue-600"
    >
      <AddEsMiniIcon />
    </Link>
  );
}
