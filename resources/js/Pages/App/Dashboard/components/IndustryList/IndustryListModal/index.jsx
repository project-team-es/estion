import React from "react";

export default function IndustryListModal({ isOpen, onClose }) {
    // モーダルが非表示の場合は何もレンダリングしない
    if (!isOpen) {
        return null;
    }

    return (
        <div
            id="industry-modal-container"
            className="fixed top-[15%] left-[25%] w-[50vw] max-w-[90vw] bg-white rounded-[12px] p-6 z-50 shadow-lg"
            onClick={onClose} // モーダルの外側をクリックで閉じる
        >
            <button
                className="text-center absolute top-2 right-2 bg-gray-300 text-gray-800 px-2 py-1 rounded-[12px] text-sm hover:bg-gray-400"
                onClick={onClose}
            >
                閉じる
            </button>
        </div>
    );
}