import { NavBar } from './NavBar';
import { Head } from '@inertiajs/react';
import { NavbarForSp } from './NavBarForSp';
import { TabBarForSp } from './TabBarForSp';
import { useState } from 'react';
import { MobileMenu } from './NavBarForSp/MobileMenu';
import { Footer } from '@/Components/Footer';

export function AppLayout({ children, title }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  return (
    <>
      <div className="md:hidden">
        <NavbarForSp isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        <MobileMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </div>

      <div className="min-h-screen bg-gray-50 pb-10 text-gray-900 md:pt-20">
        <Head>
          <title>{title ? `${title}｜estion.` : 'estion.'}</title>
          <meta name="google-adsense-account" content="ca-pub-9604843985307640" />
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9604843985307640"
            crossOrigin="anonymous"
          ></script>
        </Head>

        <div className="hidden md:block">
          <NavBar />
        </div>
        {isMenuOpen && (
          <div
            className="fixed inset-0 z-[45] bg-black bg-opacity-50 md:hidden"
            onClick={toggleMenu}
          ></div>
        )}

        <main className="mx-auto mt-10 px-6 md:mt-0">{children}</main>
      </div>
      <div className="z-[45] w-full">
        <Footer />
      </div>
      <div className="md:hidden">
        <TabBarForSp />
      </div>
    </>
  );
}
