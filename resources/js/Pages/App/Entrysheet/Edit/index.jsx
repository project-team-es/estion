import React from "react";
import AppLayout from "@/Layouts/AppLayout";
export default function Create() {
    return (
        <div>
            ここはES編集ページです
        </div>
    );
}
Create.layout = (page) => <AppLayout title="企業登録">{page}</AppLayout>;