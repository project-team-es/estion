import React from "react";

export default function AuthButton({ text }) {
    return (
        <button
            type="submit"
            className="w-full bg-gray-300 text-black py-3 rounded-md hover:bg-gray-400 transition"
        >
            {text}
        </button>
    );
}