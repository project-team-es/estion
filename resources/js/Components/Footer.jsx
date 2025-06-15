import React from "react";

export default function Footer() {
    return (
        <footer className="text-xs text-black text-center py-4">
            <p>&copy; {new Date().getFullYear()} estion. All rights reserved.</p>
        </footer>
    );
}