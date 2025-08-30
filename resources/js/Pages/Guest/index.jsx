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
    <>
      <Head>
        <title>新卒就活生向けES管理アプリ</title>
        <meta
          name="description"
          content="新卒就活生向けのエントリーシート（ES）管理アプリestion.(イーション)です。estion.を活用して多種多様な業界・企業のESを効率的に管理しましょう!"
        />
        <meta name="google-adsense-account" content="ca-pub-9604843985307640" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9604843985307640"
          crossorigin="anonymous"
        ></script>
      </Head>

      <div
        className={`flex min-h-screen flex-col bg-cover bg-center bg-no-repeat ${isMenuOpen ? 'overflow-hidden' : ''}`}
        style={{ backgroundImage: "url('/image/front/paper.png')" }}
      >
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
    </>
  );
}
