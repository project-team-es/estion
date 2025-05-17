import React, { useEffect } from "react";
import AppLayout from "@/Layouts/AppLayout";

export default function InterviewResult({ entrysheet, content, result }) {
  return (
    <>
      <div>ここは面接結果ページです</div>
      <div>エントリーシートID: {entrysheet?.id}</div> {/* 例として ID を表示 */}
      <div>質問: {content?.question}</div> {/* 例として question を表示 */}
      <div> {result}</div> 
    </>
  );
}

InterviewResult.layout = (page) => <AppLayout title="エントリーシート詳細">{page}</AppLayout>;