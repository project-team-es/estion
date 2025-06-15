import React from "react";

export default function AuthButton({ text, disabled}) {
    return (
        <button
            type="submit"
            className={`w-full py-3 rounded-md font-bold text-white transition ${
                disabled
                    ? 'bg-gray-200 cursor-not-allowed'
                    : 'bg-gray-400 hover:bg-blue-500'
            }`}
        >
            {text}
        </button>
    );
}