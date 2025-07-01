import React from 'react';
import Logo from '@/Pages/Guest/components/NavBar/Logo';
import NavLinks from '@/Pages/Guest/components/NavBar/NavLinks';
import MobileMenu from '@/Pages/Guest/components/NavBar/MobileMenu';
import MenuToggle from '@/Pages/Guest/components/NavBar/MenuToggle';

export default function NavBar() {
  return (
    <nav className="fixed left-0 top-0 z-50 w-full bg-opacity-90 py-4">
      <div className="flex w-full items-center justify-between px-2 py-3 sm:px-12">
        <Logo />

        <div className="hidden md:flex">
          <NavLinks />
        </div>

        <div className="md:hidden">
          <MenuToggle />
        </div>
      </div>

      <MobileMenu />
    </nav>
  );
}
