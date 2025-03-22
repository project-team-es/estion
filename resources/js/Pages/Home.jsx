import React from "react";
import FrontLayout from "@/Layouts/FrontLayout";

export default function Home() {
    return (
        <FrontLayout title="estion.">
            <div className="absolute bottom-1/3 sm:bottom-[38%] md:bottom-[40%] left-16 sm:left-32 md:left-48 lg:left-56">
                <p className="text-5xl sm:text-6xl md:text-7xl font-bold font-roboto text-black text-left leading-snug">
                    ES管理、<br />はじめよう。
                </p>
            </div>
        </FrontLayout>
    );
}