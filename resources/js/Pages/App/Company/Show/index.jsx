import React from "react";
import AppLayout from "@/Layouts/AppLayout";
import AddEsMiniButton from "@/Components/AddEsMiniButton";
import { router } from "@inertiajs/react";
import CompanyInfo from "./CompanyInfo";
import CompanyActions from "./CompanyActions";
import formatDate from "@/Utils/formatDate";

export default function Show({ company }) {
  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <div className="bg-white rounded-[12px] p-6 border">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center space-x-4">
              {/* 企業名 */}
              <h2 className="text-2xl font-bold whitespace-nowrap">{company.name}</h2>

              {/* 業界名 */}
              <span className="px-3 py-1 text-gray-900 font-semibold rounded-full border whitespace-nowrap">
                  {company.industry?.name || "-----"}
              </span>
          </div>
      
          <div className="flex flex-wrap items-start gap-4">
            <CompanyInfo company={company} />
            <CompanyActions companyId={company.id} />
          </div>
        </div>
        <div className="mt-6">
          <h3 className="flex items-center text-xl font-bold space-x-2">
            <span>エントリーシート一覧</span>
            <AddEsMiniButton
              href={route("entrysheet.create.with.company", {
                company_id: company.id,
              })}
            />
          </h3>

          {company.entrysheets.length === 0 ? (
            <p className="text-gray-600 mt-4">
              この企業のエントリーシートは登録されていません。
            </p>
          ) : (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {company.entrysheets.map((entrysheet) => (
                <div
                  key={entrysheet.id}
                  className="p-4 bg-white border rounded-[12px] hover:bg-gray-100 cursor-pointer"
                  onClick={() =>
                    router.visit(route("entrysheet.show", entrysheet.id))
                  }
                >
                  <h3 className="text-lg font-semibold">{entrysheet.title}</h3>
                  <p className="text-sm text-gray-600">
                  締切: {entrysheet.deadline ? formatDate(entrysheet.deadline) : "未設定"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Show.layout = (page) => <AppLayout title="企業詳細">{page}</AppLayout>;


        {/* <div className="mt-12">
          <h3 className="flex items-center text-xl font-bold">
            <span>その他のファイル</span>
          </h3>

          {company.files.filter(f => !f.filename.match(/\.(jpe?g|png|gif)$/i)).length === 0 ? (
            <p className="text-gray-600 mt-4">
              この企業に関連するその他のファイルは登録されていません。
            </p>
          ) : (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {company.files
                .filter(f => !f.filename.match(/\.(jpe?g|png|gif)$/i))
                .map((file) => (
                  <div
                    key={file.id}
                    className="p-4 bg-white border rounded-[12px] hover:bg-gray-100 shadow-sm"
                  >
                    <h4 className="text-lg font-semibold truncate">{file.filename}</h4>
                    <a
                      href={route("company.files.download", file.id)}
                      className="block text-blue-500 hover:underline text-sm mt-2"
                    >
                      ダウンロード
                    </a>
                  </div>
                ))}
            </div> */}
          
{/* 
          {company.files.some(f => f.filename.match(/\.(jpe?g|png|gif)$/i)) && (
            <>
              <h3 className="text-xl font-bold mt-8">画像ファイル</h3>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {company.files
                  .filter(f => f.filename.match(/\.(jpe?g|png|gif)$/i))
                  .map((file) => (
                    <div
                      key={file.id}
                      className="p-4 bg-white border rounded-[12px] hover:bg-gray-100 shadow-sm"
                    >
                      <a href={`/storage/${file.path}`} target="_blank" rel="noopener noreferrer">
                        <img
                          src={`/storage/${file.path}`}
                          alt={file.filename}
                          className="w-full h-48 object-cover rounded-lg mb-2"
                        />
                      </a>
                      <a
                        href={route("company.files.download", file.id)}
                        className="block text-blue-500 hover:underline text-sm mt-2"
                      >
                        ダウンロード
                      </a>
                    </div>
                  ))}
              </div>
            </> */}
