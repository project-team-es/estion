import React, { useState, useEffect } from "react";
import AppLayout from "@/Layouts/AppLayout";
import { Link, useForm, usePage } from "@inertiajs/react";
import { icons } from "@/Utils/icons";
import formatDate from "@/Utils/formatDate";

export default function Show() {
  const { entrysheet } = usePage().props;
  const { data, setData, patch, processing } = useForm({ answers: {} });
  const [copiedContentId, setCopiedContentId] = useState(null);

  useEffect(() => {
    const initialAnswers = {};
    entrysheet.contents.forEach((content) => {
      initialAnswers[content.id] = content.answer || "";
    });
    setData("answers", initialAnswers);
  }, [entrysheet.contents]);

  const handleAnswerChange = (id, value) => {
    setData("answers", { ...data.answers, [id]: value });
  };

  const handleCopyToClipboard = (text, contentId) => {
    navigator.clipboard.writeText(text);
    setCopiedContentId(contentId);
    setTimeout(() => {
      setCopiedContentId(null);
    }, 1500); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    patch(route("content.bulkUpdate", entrysheet.id));
  };

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden rounded-[12px] border">
          <div className="p-8 text-gray-900">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-3">
                <h2 className="text-2xl font-bold">{entrysheet.company.name}</h2>
                <p className="text-lg font-semibold">
                  <strong>{entrysheet.title}</strong>
                </p>
                <a
                  href={route("entrysheet.pdf", entrysheet.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#001eff] py-1 rounded-full text-sm"
                  dangerouslySetInnerHTML={{ __html: icons.pdf }}
                />
              </div>
              <Link
                href={route("entrysheet.edit", entrysheet.id)}
                className="inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-200"
                dangerouslySetInnerHTML={{ __html: icons.edit }}
              />
            </div>

            <p className="mt-2">
              <strong>締切日:</strong> {entrysheet.deadline ? formatDate(entrysheet.deadline) : "未設定"}
            </p>

            <form onSubmit={handleSubmit}>
              <ul className="mt-4 space-y-4" id="contents-list">
                {entrysheet.contents.length === 0 ? (
                  <p className="text-gray-600 mt-4">まだ登録された質問がありません。</p>
                ) : (
                  entrysheet.contents.map((content) => (
                    <li
                      key={content.id}
                      className="p-4 border rounded-[12px]"
                      data-content-id={content.id}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <p className="font-bold">{content.question}</p>
                          <Link
                            href={route("content.edit", {
                              entrysheet: entrysheet.id,
                              content: content.id,
                            })}
                            className="inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-200"
                            dangerouslySetInnerHTML={{ __html: icons.edit_mini }}
                          />
                        </div>
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() =>
                              handleCopyToClipboard(data.answers[content.id], content.id)
                            }
                            className={`p-1 rounded-full focus:outline-none ${
                              copiedContentId === content.id
                                ? 'text-gray-500'
                                : 'text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {copiedContentId === content.id ? (
                              <span>copied!</span>
                            ) : (
                              <span dangerouslySetInnerHTML={{ __html: icons.copy }} />
                            )}
                          </button>
                        </div>
                      </div>

                      <textarea
                        value={data.answers[content.id] || ""}
                        onChange={(e) => handleAnswerChange(content.id, e.target.value)}
                        className="w-full border-gray-300 rounded-[12px] mt-2 p-2"
                        rows={1}
                      />

                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-gray-600">
                          現在の文字数: {data.answers[content.id]?.length ?? 0}
                        </p>
                        {data.answers[content.id] ? (
                          <Link
                            href={route("interview.expected", {
                              entrysheet: entrysheet.id,
                              content: content.id,
                            })}
                            className="bg-green-300 hover:bg-green-400 text-gray-700 px-3 py-1 rounded-full text-sm"
                          >
                            面接
                          </Link>
                        ) : (
                          <span className="bg-gray-300 text-gray-500 px-3 py-1 rounded-full text-sm cursor-pointer">
                            面接
                          </span>
                        )}
                      </div>
                    </li>
                  ))
                )}
              </ul>

              <div className="mt-6 text-right">
                <button
                  type="submit"
                  disabled={processing}
                  className="inline-flex items-center justify-center w-10 h-10 text-gray-500 rounded-full hover:bg-green-200 mt-6 focus:outline-none"
                >
                  <span dangerouslySetInnerHTML={{ __html: icons.save }} />
                </button>
              </div>
            </form>

            <div className="mt-6">
              <Link
                href={route("entrysheet")}
                className="inline-flex items-center justify-center w-10 h-10 text-gray-500 rounded-full hover:bg-gray-200 focus:outline-none"
                dangerouslySetInnerHTML={{ __html: icons.undo }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Show.layout = (page) => <AppLayout title="エントリーシート詳細">{page}</AppLayout>;