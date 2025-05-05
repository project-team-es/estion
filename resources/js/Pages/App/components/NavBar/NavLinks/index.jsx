import React from 'react';
import { Link } from '@inertiajs/react';

export default function NavLinks() {
    return (
        <div className="flex space-x-6 text-sm font-medium text-gray-600">
            <Link href="/dashboard" className="hover:text-gray-900">Dashboard</Link>
            <Link href="/company" className="hover:text-gray-900">Company</Link>
            <Link href="/entrysheet" className="hover:text-gray-900">EntrySheet</Link>
        </div>
    );
}