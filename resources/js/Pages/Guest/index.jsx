import React from 'react';
import NavBar from '@/Pages/Guest/components/NavBar';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import FooterForGueset from '@/Components/FooterForGuset';

export default function Guest() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  return (
    <div
      className={`flex min-h-screen flex-col bg-cover bg-center bg-no-repeat ${isMenuOpen ? 'overflow-hidden' : ''}`}
      style={{ backgroundImage: "url('/image/front/paper.png')" }}
    >
      <Head title="ES管理" />
      <NavBar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <div
        className={`fixed inset-0 z-30 bg-black transition-opacity duration-300 ${isMenuOpen ? 'pointer-events-auto opacity-50' : 'pointer-events-none opacity-0'} `}
        onClick={toggleMenu}
      ></div>
      <div className="relative h-screen flex-grow">
        <div className="absolute bottom-[40%] left-[7%] sm:bottom-[20%] sm:left-[8%] md:bottom-[35%] md:left-[13%]">
          <p className="font-roboto text-left text-4xl font-bold leading-snug text-black md:text-7xl">
            ES管理、
            <br />
            はじめよう。
          </p>
        </div>
      </div>
      <FooterForGueset />
    </div>
  );
}
