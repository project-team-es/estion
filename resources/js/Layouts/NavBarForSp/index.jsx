import { Link, usePage } from '@inertiajs/react';
import { MenuToggle } from '@/Pages/Guest/components/NavBar/MenuToggle';
import { UserDropDown } from './UserDropDown';

export function NavbarForSp({ isMenuOpen, toggleMenu }) {
  const { bookmarks } = usePage().props;
  return (
    <nav className="fixed left-0 top-0 z-40 flex h-12 w-full items-center justify-between bg-white shadow-md">
      <div className="flex items-center">
        <Link href="/dashboard" className="ml-6 text-[22px] font-bold text-black">
          estion.
        </Link>
        <UserDropDown bookmarks={bookmarks} />
      </div>

      <MenuToggle isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </nav>
  );
}
