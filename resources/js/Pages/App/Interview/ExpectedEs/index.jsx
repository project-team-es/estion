import React, { useEffect, useState } from "react";
import AppLayout from "@/Layouts/AppLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function ExpectedEs({ entrysheet, content }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    entrysheet_id: entrysheet?.id ?? "",
    content_id: content?.id ?? "",
    interview_request: "",
  });

  const submit = (e) => {
    e.preventDefault();
    post(route("interview.start"), data); 
  };

  return (
    <AppLayout title={entrysheet?.company?.name || "想定ES"}>
      <Head>
        <title>{entrysheet?.company?.name || "想定ES"}</title>
      </Head>
      <div className="py-12">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center">{entrysheet?.company?.name}</h2>
          <div className="mt-6 p-4 border rounded-lg bg-gray-100">
            <h3 className="text-xl font-semibold">想定ES</h3>
            <p className="mt-2">
              <strong>質問:</strong> {content?.question}
            </p>
            <p className="mt-2">
              <strong>回答:</strong> {content?.answer}
            </p>
          </div>

          <form method="POST" onSubmit={submit}>
            <input type="hidden" name="entrysheet_id" value={data.entrysheet_id} />
            <input type="hidden" name="content_id" value={data.content_id} />

            <div className="mt-6">
              <label htmlFor="interview_request" className="block text-lg font-semibold">
                面接リクエスト
              </label>
              <textarea
                id="interview_request"
                name="interview_request"
                rows="1"
                className="w-full border-gray-300 rounded-lg mt-2 p-2"
                placeholder="例: キャリアプランと絡めて質問してほしい"
                value={data.interview_request}
                onChange={(e) => setData("interview_request", e.target.value)}
              ></textarea>
            </div>

            <div className="mt-6 text-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
                disabled={processing}
              >
                {processing ? "面接開始中..." : "面接開始"}
              </button>
              {errors.interview_request && (
                <div className="text-red-500 mt-2">{errors.interview_request}</div>
              )}
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}