// resources/js/Pages/EntrySheet/Create.jsx
import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";

export default function Create({ industries, company: selectedCompany, presetTitles }) {
  const { data, setData, post, processing, errors } = useForm({
    company_id: selectedCompany?.id ?? "",
    title: "",
    deadline: "",
    questions: [""],
  });

  const addQuestion = () => {
    setData("questions", [...data.questions, ""]);
  };

  const removeQuestion = (index) => {
    const updated = data.questions.filter((_, i) => i !== index);
    setData("questions", updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("entrysheet.store"));
  };

  return (
    <AppLayout title="エントリーシート作成">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-2xl font-bold mb-6">エントリーシートを作成</h1>

        {Object.keys(errors).length > 0 && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-[12px]">
            <ul>
              {Object.values(errors).map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* 企業選択 */}
          <div className="mb-4">
            <label className="block font-bold mb-2">企業</label>
            {selectedCompany ? (
              <>
                <p className="p-2 bg-gray-100 border rounded-[12px]">{selectedCompany.name}</p>
                <input type="hidden" name="company_id" value={data.company_id} />
              </>
            ) : (
              <select
                name="company_id"
                value={data.company_id}
                onChange={(e) => setData("company_id", e.target.value)}
                className="border-gray-300 rounded-[12px]"
                required
              >
                <option value="">企業を選択してください</option>
                {industries.map((industry) => (
                  <optgroup label={industry.name} key={industry.id}>
                    {industry.companies.map((company) => (
                      <option key={company.id} value={company.id}>
                        {company.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            )}
          </div>

          {/* タイトル選択 */}
          <div className="mb-4">
            <label className="block font-bold mb-2">タイトル</label>
            <select
              name="title"
              value={data.title}
              onChange={(e) => setData("title", e.target.value)}
              className="border-gray-300 rounded-[12px]"
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

          {/* 締切日 */}
          <div className="mb-4">
            <label className="block font-bold mb-2">締切日</label>
            <input
              type="date"
              name="deadline"
              value={data.deadline}
              onChange={(e) => setData("deadline", e.target.value)}
              className="border-gray-300 rounded-[12px] w-full"
            />
          </div>

          {/* 質問エリア */}
          <div className="mb-4">
            <label className="block font-bold mb-2">質問</label>
            {data.questions.map((q, i) => (
              <div className="flex items-center mb-2" key={i}>
                <input
                  type="text"
                  value={q}
                  onChange={(e) => {
                    const updated = [...data.questions];
                    updated[i] = e.target.value;
                    setData("questions", updated);
                  }}
                  className="border-gray-300 rounded-[12px] w-full"
                  required
                />
                {i > 0 && (
                  <button
                    type="button"
                    onClick={() => removeQuestion(i)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    −
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addQuestion}
              className="text-blue-500 hover:underline mt-2"
            >
              + 質問を追加
            </button>
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-[12px]"
              disabled={processing}
            >
              {processing ? "登録中..." : "登録"}
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}