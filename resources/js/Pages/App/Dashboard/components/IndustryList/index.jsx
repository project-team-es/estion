import React from "react";

export default function IndustryList({ industries }) {
    console.log("industries全体の中身:", industries);

    return (
        <div className="w-1/6 p-4 fixed top-16 left-6 md:left-10 lg:left-16
                        md:h-screen md:flex md:flex-col md:justify-between z-10">
            <p className="text-center font-semibold text-gray-900 mb-4">業界</p>

            {industries.length === 0 ? (
                <p className="text-gray-600">登録された業界がありません。</p>
            ) : (
                <div className="space-y-2 flex-1 overflow-y-auto">
                    {industries.map((industry) => {
                        return (
                            <div
                                key={industry.id}
                                className="relative bg-white p-2 rounded-[12px] cursor-pointer hover:bg-gray-100 text-sm"
                                style={{
                                    minHeight: "60px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                                onClick={() => console.log(`Toggle modal for industry ${industry.id}`)}
                                onMouseOver={() => console.log(`Switch modal to industry ${industry.id}`)}
                            >
                                <p className="text-center text-m font-semibold truncate">{industry.name}</p>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}