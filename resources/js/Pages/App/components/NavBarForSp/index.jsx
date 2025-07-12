import { Link } from '@inertiajs/react';
import MenuToggle from '@/Pages/Guest/components/NavBar/MenuToggle';

export default function NavbarForSp({ isMenuOpen, toggleMenu }) {
  return (
    <nav className="fixed left-0 top-0 z-40 flex h-[6%] w-full items-center justify-between bg-white shadow-md">
      <Link href="/dashboard" className="ml-6 text-[22px] font-bold text-black">
        estion.
      </Link>
      <MenuToggle isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </nav>
  );
}
