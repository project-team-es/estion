import React, { useState, useEffect } from "react";
import AppLayout from "@/Layouts/AppLayout";
import { useForm, Link, router, usePage } from "@inertiajs/react";
import { icons } from "@/Utils/icons";
export default function Edit({ content }) {
    const { errors } = usePage().props;
    const { data, setData, put, processing } = useForm({
        question: content.question,
        character_limit: content.character_limit || "",
    });

    const [charCount, setCharCount] = useState(content.answer ? content.answer.length : 0);

    const handleChange = (event) => {
        setData(event.target.name, event.target.value);
        if (event.target.name === 'answer') {
            setCharCount(event.target.value.length);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("content.update", { entrysheet: content.entrysheet_id, content: content.id }));
    };

    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <AppLayout title="質問と回答の編集">
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden rounded-[12px] border">
                        <div className="p-8 text-gray-900 relative"> 
                            <h1 className="text-2xl font-bold mb-6">質問内容と文字数を編集</h1>

                            {/* 全体のエラーリスト表示を削除 */}

                            {/* 編集フォーム */}
                            <form onSubmit={handleSubmit}>
                                {/* 質問 */}
                                <div className="mb-4">
                                    <label htmlFor="question" className="block text-gray-700 font-bold mb-2">
                                        質問
                                    </label>
                                    <input
                                        type="text"
                                        name="question"
                                        id="question"
                                        value={data.question}
                                        onChange={handleChange}
                                        className={`w-full border-gray-300 rounded-[12px] focus:ring-blue-500 focus:border-blue-500 px-6 py-3 ${errors.question ? 'border-red-500' : ''}`}
                                        required
                                    />
                                    {errors.question && <p className="mt-2 text-sm text-red-600">{errors.question}</p>}
                                </div>

                                {/* 文字数制限 */}
                                <div className="mb-4">
                                    <label htmlFor="character_limit" className="block text-gray-700 font-bold mb-2">
                                        文字数制限 (任意)
                                    </label>
                                    <input
                                        type="number"
                                        name="character_limit"
                                        id="character_limit"
                                        value={data.character_limit}
                                        onChange={handleChange}
                                        className={`w-full border-gray-300 rounded-[12px] focus:ring-blue-500 focus:border-blue-500 px-6 py-3 ${errors.character_limit ? 'border-red-500' : ''}`}
                                    />
                                    {errors.character_limit && <p className="mt-2 text-sm text-red-600">{errors.character_limit}</p>}
                                </div>

                                <div className="text-right">
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-4 py-2 rounded-[12px] hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        disabled={processing}
                                    >
                                        更新
                                    </button>
                                </div>
                            </form>


                            <button
                                onClick={handleGoBack}
                                className="fixed bottom-4 left-4 flex items-center justify-center w-10 h-10 text-gray-500 rounded-full hover:bg-gray-200"
                            >
                                <span dangerouslySetInnerHTML={{ __html: icons.undo }} className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}