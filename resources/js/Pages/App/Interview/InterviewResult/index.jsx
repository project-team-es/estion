import React, { useEffect } from "react";
import AppLayout from "@/Layouts/AppLayout";


export default function InterviewResult() {
  return (
    <div>ここは面接想定ページです</div>
  );
}

InterviewResult.layout = (page) => <AppLayout title="エントリーシート詳細">{page}</AppLayout>;