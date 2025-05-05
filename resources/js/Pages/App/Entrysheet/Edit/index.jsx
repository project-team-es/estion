import AppLayout from "@/Layouts/AppLayout";
import { useForm, Link } from "@inertiajs/react";

export default function Edit({ entrysheet, presetTitles, companies, errors }) {
    const { data, setData, put, processing } = useForm({
        title: entrysheet.title,
        status: entrysheet.status,
        deadline: entrysheet.deadline ? entrysheet.deadline.substring(0, 10) : "",
        company_id: entrysheet.company_id,
    });

    const handleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("entrysheet.update", entrysheet.id));
    };

    const handleDelete = () => {
        if (confirm("このエントリーシートの内容が全て削除されます！\n本当によろしいですか？")) {
            router.delete(route("entrysheet.destroy", entrysheet.id));
        }
    };

    return (
        <AppLayout title="エントリーシートを編集">
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden rounded-[12px] border">
                        <div className="px-8 py-6 text-gray-900">
                            <h2 className="text-2xl font-bold mb-6">エントリーシートを編集</h2>

                            {Object.keys(errors).length > 0 && (
                                <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-[12px]">
                                    <ul>
                                        {Object.values(errors).map((error, index) => (
                                            <li key={index}>{error}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* 更新フォーム */}
                            <form onSubmit={handleSubmit}>
                                {/* タイトル */}
                                <div className="mb-5">
                                    <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
                                        タイトル
                                    </label>
                                    <select
                                        name="title"
                                        id="title"
                                        value={data.title}
                                        onChange={handleChange}
                                        className="w-full border-gray-300 rounded-[12px] focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    >
                                        <option value="">タイトルを選択</option>
                                        {presetTitles.map((title) => (
                                            <option key={title} value={title}>
                                                {title}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* ステータス */}
                                <div className="mb-5">
                                    <label htmlFor="status" className="block text-gray-700 font-bold mb-2">
                                        ステータス
                                    </label>
                                    <select
                                        name="status"
                                        id="status"
                                        value={data.status}
                                        onChange={handleChange}
                                        className="w-full border-gray-300 rounded-[12px] focus:ring-blue-500 focus:border-blue-500 px-4 py-2"
                                    >
                                        <option value="下書き">下書き</option>
                                        <option value="提出済み">提出済み</option>
                                        <option value="書類通過">書類通過</option>
                                        <option value="書類落ち">書類落ち</option>
                                    </select>
                                </div>

                                {/* 締切日 */}
                                <div className="mb-4">
                                    <label htmlFor="deadline" className="block text-gray-700 font-bold mb-2">
                                        締切日
                                    </label>
                                    <div className="relative flex items-center border border-gray-300 rounded-[12px]">
                                        <input
                                            type="date"
                                            name="deadline"
                                            id="deadline"
                                            value={data.deadline}
                                            onChange={handleChange}
                                            className="pl-4 pr-4 py-2 w-full rounded-[12px] appearance-none"
                                        />
                                    </div>
                                </div>

                                {/* 企業 */}
                                <div className="mb-5">
                                    <label htmlFor="company_id" className="block text-gray-700 font-bold mb-2">
                                        企業
                                    </label>
                                    <select
                                        name="company_id"
                                        id="company_id"
                                        value={data.company_id}
                                        onChange={handleChange}
                                        className="w-full border-gray-300 rounded-[12px] focus:ring-blue-500 focus:border-blue-500 px-4 py-2"
                                    >
                                        {companies.map((company) => (
                                            <option key={company.id} value={company.id}>
                                                {company.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* 更新ボタン */}
                                <div className="flex justify-end space-x-3">
                                    <Link
                                        href={route("entrysheet.show", entrysheet.id)}
                                        className="bg-gray-500 text-white px-4 py-2 rounded-[12px] hover:bg-gray-400"
                                    >
                                        キャンセル
                                    </Link>
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-6 py-2 rounded-[12px] hover:bg-blue-500"
                                        disabled={processing}
                                    >
                                        更新
                                    </button>
                                </div>
                            </form>

                            {/* 削除ボタン */}
                            <div className="mt-6">
                                <button
                                    onClick={handleDelete}
                                    className="bg-red-600 text-white px-6 py-2 rounded-[12px] hover:bg-red-500"
                                >
                                    削除
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}