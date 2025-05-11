import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import { icons } from '@/Utils/icons';
import AppLayout from '@/Layouts/AppLayout';
import BookmarkIndex from './BookmarkIndex';

export default function BookmarkCreate({ bookmarks }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        url: '',
    });

    const handleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('bookmark.store'), {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <AppLayout>
            {/* 追加フォームを囲む div で幅を調整 */}
            <div className="mx-auto max-w-3xl mb-8 bg-white overflow-hidden rounded-[12px] border p-8 mt-10">
                <h2 className="text-2xl font-bold mb-6">お気に入りURLを追加</h2>
                {Object.keys(errors).length > 0 && (
                    <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-[12px]">
                        <ul className="list-disc pl-5">
                            {Object.values(errors).map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-gray-700 font-bold">サイト名</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-[12px] p-3 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="url" className="block text-gray-700 font-bold">URL</label>
                        <input
                            type="url"
                            id="url"
                            name="url"
                            value={data.url}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-[12px] p-3 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div className="flex justify-end space-x-4">
                        {/* 戻るボタンが必要な場合はコメントアウトを解除 */}
                        {/* <Link
                            href={route(window.history.length > 1 ? window.history.back() : 'bookmark.index')}
                            className="flex items-center justify-center w-10 h-10 text-gray-500 rounded-full transition-colors duration-200 hover:bg-gray-200 hover:cursor-pointer"
                            dangerouslySetInnerHTML={{ __html: icons.undo }}
                        /> */}
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-3 rounded-[12px] hover:bg-blue-500"
                            disabled={processing}
                        >
                            追加
                        </button>
                    </div>
                </form>
            </div>

            {/* BookmarkIndex を囲む div で幅を調整 */}
            <div className="mx-auto max-w-3xl">
                <BookmarkIndex bookmarks={bookmarks}/>
            </div>
        </AppLayout>
    );
}