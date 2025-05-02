import React from "react";
import NavBar from "@/Pages/App/components/NavBar"; 
export default function AppLayout({ children, title }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pt-20">
      <head>
        <title>{title ?? "estion"}</title>
      </head>

      <NavBar />

      <main className="mx-auto px-6">
        {children}
      </main>
    </div>
  );
}