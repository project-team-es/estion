import React from 'react';
import NavBar from '@/Pages/Guest/components/NavBar';
import Footer from '@/Components/Footer';
import { Head } from '@inertiajs/react';

export default function Guest() {
  return (
    <div
      className="flex min-h-screen flex-col bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/image/front/paper.png')" }}
    >
      <Head title="ES管理" />
      <NavBar />
      <div className="flex-grow">
        <div className="lg:left-56left-16 absolute bottom-1/3 sm:bottom-[59%] sm:left-32 md:bottom-[40%] md:left-48">
          <p className="font-roboto text-left text-4xl font-bold leading-snug text-black sm:text-3xl md:text-7xl">
            ES管理、
            <br />
            はじめよう。
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
