import React from 'react';
import Logo from '@/Pages/Guest/components/NavBar/Logo';
import NavLinks from '@/Pages/Guest/components/NavBar/NavLinks';
import MobileMenu from '@/Pages/Guest/components/NavBar/MobileMenu';
import MenuToggle from '@/Pages/Guest/components/NavBar/MenuToggle';
import { useState } from 'react';

export default function NavBar({ isMenuOpen, toggleMenu }) {
  return (
    <nav className="fixed z-50 w-full py-2 md:py-4">
      <div className="flex w-full items-center justify-between px-2 py-3 md:px-12">
        <Logo />

        <div className="hidden sm:flex">
          <NavLinks isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </div>

        <div className="sm:hidden">
          <MenuToggle isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </div>
      </div>

      <MobileMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </nav>
  );
}
