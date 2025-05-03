import React, { useRef, useEffect } from 'react'; // useRef と useEffect は 'react' から
import { Link } from "@inertiajs/react"; // Link は '@inertiajs/react' から

export default function IndustryModal({ industry, companies, onClose, onCopyToClipboard }) {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    if (!industry || !companies) {
        return null;
    }

    return (
        <div
            id="industry-modal-container"
            className="fixed top-[13%] left-[20%] p-2 flex items-start opacity-100 transition-opacity duration-300 ease-in-out z-50 cursor-default"
            ref={modalRef}
        >
            <div className="w-[50vw] max-w-[90vw] bg-white border-gray-100 rounded-[12px] p-6 relative">
                <p id="industry-modal-title" className="text-center font-semibold text-gray-800 text-lg mb-4">
                    {industry.name || '企業一覧'}
                </p>

                <button
                    className="text-center absolute top-4 right-4 bg-gray-800 text-white px-3 py-1 rounded-[12px] text-sm hover:bg-gray-600"
                    onClick={onClose}
                >
                    閉じる
                </button>

                {/* ... (モーダルのコンテンツは変更なし) ... */}
            </div>
        </div>
    );
}