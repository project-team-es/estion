import React from "react";
import NavBar from "@/Components/GuestNav/NavBar";
import Footer from "@/Components/Footer";

export default function FrontLayout({ children, title }) {
    return (
        <div
            className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/image/front/paper.png')" }}
        >
            <NavBar />
            <div className="flex-grow">{children}</div>
            <Footer />
        </div>
    );
}