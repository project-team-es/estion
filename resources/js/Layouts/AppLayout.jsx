import React from "react";
// import NavBar from "@/Components/NavBar"; // ← すでにあるナビバーを読み込む

export default function AppLayout({ children, title }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pt-20">
      {/* タイトル設定（ブラウザのタブ名） */}
      <head>
        <title>{title ?? "estion"}</title>
      </head>

      {/* 上部にナビゲーションバー */}
      <NavBar />

      {/* 各ページごとの中身 */}
      <main className="max-w-7xl mx-auto px-6">
        {children}
      </main>
    </div>
  );
}