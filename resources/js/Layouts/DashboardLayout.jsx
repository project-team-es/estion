// resources/js/Layouts/DashboardLayout.jsx
import React from "react";
import NavBar from "@/Components/NavBar"; // 作成したナビゲーションをインポート

export default function DashboardLayout({ industries, contents, entrysheets, industriesWithCompanies }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <NavBar /> {/* ← ここで読み込む！ */}

            {/* 以下、業界一覧・モーダル・締切間近などのレイアウト */}
            {/* ここに各セクションを追加していく */}
        </div>
    );
}