import { Link, usePage } from '@inertiajs/react';
import { NavLinks } from './NavLinks';
import { UserDropDown } from './UserDropDown';
import { Bookmark } from './Bookmark';

export function NavBar() {
  const { bookmarks } = usePage().props;
  return (
    <nav className="fixed left-1/2 top-4 z-50 mx-auto w-full max-w-[95%] -translate-x-1/2 transform rounded-[12px] bg-white px-6 py-3 shadow">
      <div className="flex items-center justify-between">
        <Link href="/dashboard" className="text-xl font-bold text-black">
          estion.
        </Link>

        <div className="flex items-center space-x-6">
          <NavLinks />
          <Bookmark bookmarks={bookmarks} />
        </div>

        <UserDropDown />
      </div>
    </nav>
  );
}
