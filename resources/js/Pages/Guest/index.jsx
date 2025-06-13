import React from "react";
import NavBar from "@/Pages/Guest/components/NavBar";
import Footer from "@/Components/Footer";
import { Head } from "@inertiajs/react";

export default function Guest() {
    return (
        <div
            className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/image/front/paper.png')" }}
        >
            <Head title="ES管理" />
            <NavBar />
            <div className="flex-grow">
                <div className="absolute bottom-1/3 sm:bottom-[38%] md:bottom-[40%] left-16 sm:left-32 md:left-48 lg:left-56">
                    <p className="text-5xl sm:text-6xl md:text-7xl font-bold font-roboto text-black text-left leading-snug">
                        ES管理、<br />はじめよう。
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
}