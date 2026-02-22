import React, { useRef } from 'react';
import { useForm } from '@inertiajs/react';
import { icons } from '@/Utils/icons';
import { Head } from '@inertiajs/react';

export default function CreateForm({ industries, company: selectedCompany, presetTitles }) {
  const { data, setData, post, processing, errors } = useForm({
    company_id: selectedCompany?.id ?? '',
    title: '',
    deadline: '',
    questions: [''],
  });

  const dateInputRef = useRef(null);
  const handleDeadlineInputClick = () => {
    if (dateInputRef.current) {
      try {
        dateInputRef.current.showPicker();
      } catch (error) {
        console.error('カレンダーの表示に失敗しました:', error);
      }
    }
  };

  const addQuestion = () => {
    setData('questions', [...data.questions, '']);
  };

  const removeQuestion = (index) => {
    const updated = data.questions.filter((_, i) => i !== index);
    setData('questions', updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('entrysheet.store'));
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <Head title="ES作成">
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9604843985307640"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <h2 className="mb-6 text-2xl font-bold text-gray-800">エントリーシートを作成</h2>

      {Object.keys(errors).length > 0 && (
        <div className="mb-4 rounded-[12px] bg-red-100 p-4 text-red-700">
          <ul>
            {Object.values(errors).map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} className="rounded-[12px] border bg-white p-6">
        <div className="mb-4">
          <label className="mb-2 block font-bold text-gray-700">企業</label>
          {selectedCompany ? (
            <>
              <p className="rounded-[12px] border bg-gray-100 p-2">{selectedCompany.name}</p>
              <input type="hidden" name="company_id" value={data.company_id} />
            </>
          ) : (
            <select
              name="company_id"
              value={data.company_id}
              onChange={(e) => setData('company_id', e.target.value)}
              className="w-full rounded-[12px] border-gray-300 px-4 py-2"
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
          {errors.company_id && <div className="text-sm text-red-500">{errors.company_id}</div>}
        </div>

        {/* タイトル選択 */}
        <div className="mb-4">
          <label className="mb-2 block font-bold text-gray-700">タイトル</label>
          <select
            name="title"
            value={data.title}
            onChange={(e) => setData('title', e.target.value)}
            className="w-full rounded-[12px] border-gray-300 px-4 py-2"
            required
          >
            <option value="">タイトルを選択</option>
            {presetTitles.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
          {errors.title && <div className="text-sm text-red-500">{errors.title}</div>}
        </div>

        {/* 締切日 */}
        <div className="mb-4">
          <label className="mb-2 block font-bold text-gray-700">締切日</label>
          <input
            ref={dateInputRef}
            type="date"
            name="deadline"
            value={data.deadline}
            onChange={(e) => setData('deadline', e.target.value)}
            onClick={handleDeadlineInputClick}
            className="w-full cursor-pointer rounded-[12px] border-gray-300 px-4 py-2"
          />
          {errors.deadline && <div className="text-sm text-red-500">{errors.deadline}</div>}
        </div>

        {/* 質問エリア */}
        <div className="mb-4">
          <label className="mb-2 block font-bold text-gray-700">質問</label>
          {data.questions.map((q, i) => (
            <div className="mb-2 flex items-center" key={i}>
              <input
                type="text"
                value={q}
                onChange={(e) => {
                  const updated = [...data.questions];
                  updated[i] = e.target.value;
                  setData('questions', updated);
                }}
                className="w-full rounded-[12px] border-gray-300 px-4 py-2"
                required
              />
              {i > 0 && (
                <button
                  type="button"
                  onClick={() => removeQuestion(i)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  <span dangerouslySetInnerHTML={{ __html: icons.minus }} className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={addQuestion}
              className="mt-2 text-blue-500 hover:underline"
            >
              <span dangerouslySetInnerHTML={{ __html: icons.plus }} className="mr-1 h-5 w-5" />
            </button>
            {errors.questions && <div className="text-sm text-red-500">{errors.questions}</div>}
          </div>
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="rounded-[12px] bg-blue-600 px-6 py-3 text-white hover:bg-blue-500"
            disabled={processing}
          >
            {processing ? '登録中...' : '登録'}
          </button>
        </div>
      </form>
    </div>
  );
}
