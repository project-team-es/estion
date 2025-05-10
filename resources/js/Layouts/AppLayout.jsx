import React from "react";
import NavBar from "@/Pages/App/components/NavBar";
import { Head } from '@inertiajs/react';

export default function AppLayout({ children, title }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pt-20">
      <Head title={title ?? "estion"} /> 

      <NavBar />

      <main className="mx-auto px-6">
        {children}
      </main>
    </div>
  );
}