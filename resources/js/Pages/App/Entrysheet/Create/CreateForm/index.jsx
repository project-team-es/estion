import React, { useState, useRef} from "react";
import { useForm } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import { icons } from "@/Utils/icons";
import { Head } from "@inertiajs/react";

export default function CreateForm({ industries, company: selectedCompany, presetTitles }) {
  const { data, setData, post, processing, errors } = useForm({
    company_id: selectedCompany?.id ?? "",
    title: "",
    deadline: "",
    questions: [""],
  });

  const dateInputRef = useRef(null);
  const handleDeadlineInputClick = () => {
  if (dateInputRef.current) {
    try {
      dateInputRef.current.showPicker();
    } catch (error) {
      console.error("カレンダーの表示に失敗しました:", error);
    }
  }
};

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
    
      <div className="max-w-4xl mx-auto py-12 px-6">
        <Head title="ES作成" />
        <h2 className="text-2xl font-bold text-gray-800 mb-6">エントリーシートを作成</h2>

        {Object.keys(errors).length > 0 && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-[12px]">
            <ul>
              {Object.values(errors).map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-[12px] p-6 border">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">企業</label>
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
                className="w-full border-gray-300 rounded-[12px] px-4 py-2"
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
            {errors.company_id && <div className="text-red-500 text-sm">{errors.company_id}</div>}
          </div>

          {/* タイトル選択 */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">タイトル</label>
            <select
              name="title"
              value={data.title}
              onChange={(e) => setData("title", e.target.value)}
              className="w-full border-gray-300 rounded-[12px] px-4 py-2"
              required
            >
              <option value="">タイトルを選択</option>
              {presetTitles.map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </select>
            {errors.title && <div className="text-red-500 text-sm">{errors.title}</div>}
          </div>

          {/* 締切日 */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">締切日</label>
            <input
              ref={dateInputRef}
              type="date"
              name="deadline"
              value={data.deadline}
              onChange={(e) => setData("deadline", e.target.value)}
              onClick={handleDeadlineInputClick}
              className="w-full border-gray-300 rounded-[12px] px-4 py-2 cursor-pointer"
            />
            {errors.deadline && <div className="text-red-500 text-sm">{errors.deadline}</div>}
          </div>

          {/* 質問エリア */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">質問</label>
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
                  className="w-full border-gray-300 rounded-[12px] px-4 py-2"
                  required
                />
                {i > 0 && (
                  <button
                    type="button"
                    onClick={() => removeQuestion(i)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <span
                      dangerouslySetInnerHTML={{ __html: icons.minus }} 
                      className="h-5 w-5"
                    />
                  </button>
                )}
              </div>
            ))}
            <div className="flex justify-center mt-4">
              <button
                type="button"
                onClick={addQuestion}
                className="text-blue-500 hover:underline mt-2"
              >
                <span
                  dangerouslySetInnerHTML={{ __html: icons.plus }} 
                  className="mr-1 h-5 w-5"
                />
              </button>
              {errors.questions && <div className="text-red-500 text-sm">{errors.questions}</div>}
            </div>
            
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-[12px] hover:bg-blue-500"
              disabled={processing}
            >
              {processing ? "登録中..." : "登録"}
            </button>
          </div>
        </form>
      </div>
  );
}