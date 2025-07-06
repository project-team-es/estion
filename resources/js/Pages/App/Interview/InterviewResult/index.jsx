import React, { useState, useEffect, useCallback } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';
import { icons } from '@/Utils/icons';

export default function InterviewResult({ entrysheet, content, results }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showEndMessage, setShowEndMessage] = useState(false);
  const [showAllQuestions, setShowAllQuestions] = useState(false);

  const questions = results || [];

  const goToNextQuestion = useCallback(() => {
    // 最後の質問にまだ到達していない場合
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      // 最後の質問に到達した場合のみ終了メッセージを表示
      setShowEndMessage(true);
      setShowAllQuestions(true);
    }
  }, [currentIndex, questions.length]); // currentIndexとquestions.lengthを依存配列に含める

  const handleRestart = () => {
    setCurrentIndex(0);
    setShowEndMessage(false);
    setShowAllQuestions(false);
  };


  // 質問がない場合の表示
  if (!questions || questions.length === 0) {
    return (
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-lg sm:rounded-[12px]">
            <div className="p-6 text-gray-900">
              <p className="text-center text-lg">表示する質問がありません。</p>
              {entrysheet && (
                <div className="mt-6 text-center">
                  <Link
                    href={route('entrysheet.show', entrysheet.id)}
                    className="inline-block rounded-[12px] bg-gray-500 px-6 py-3 font-semibold text-white transition duration-300 hover:bg-gray-600"
                  >
                    エントリーシートに戻る
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="overflow-hidden bg-white shadow-lg sm:rounded-[12px]">
          <div className="p-6 text-gray-900">
            {content && (
              <div className="mb-6 rounded-[12px] bg-gray-100 p-4">
                <h3 className="text-lg font-semibold text-gray-800">元の質問と回答</h3>
                <p className="mt-1">
                  <strong>質問:</strong> {content.question}
                </p>
                <p className="mt-1">
                  <strong>回答:</strong> {content.answer}
                </p>
              </div>
            )}

            <div className="mt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">生成された質問</h2>
              <div className="bg-gray-50 border border-gray-300 rounded-[12px] p-6 shadow-lg min-h-[250px] flex flex-col justify-center items-center text-center">
                {/* 質問または終了メッセージと質問一覧を表示 */}
                {!showEndMessage ? (
                  // 通常の質問表示
                  <div className="w-full">
                    <p className="text-lg text-gray-800 animate-fade-in">{currentQuestion}</p>
                    {/* 最後の質問の場合もボタンを表示 */}
                    {currentIndex < questions.length - 1 ? (
                      <button
                        onClick={goToNextQuestion}
                        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-[12px] hover:bg-blue-600 transition duration-300"
                      >
                        次の質問へ →
                      </button>
                    ) : (
                      // 最後の質問の場合のボタン
                      <button
                        onClick={goToNextQuestion} // showEndMessageをtrueにするために同じ関数を呼び出し
                        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-[12px] hover:bg-blue-600 transition duration-300"
                      >
                        質問一覧へ →
                      </button>
                    )}
                  </div>
                ) : (
                  // 終了メッセージと質問一覧表示（カード形式）
                  <div className="text-gray-700 text-center text-lg animate-fade-in w-full">
                    <p className="mb-4">質問は以上です</p>
                    <button
                      onClick={handleRestart}
                      className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-[12px] hover:bg-blue-600 transition duration-300"
                    >
                      はじめから
                    </button>

                    <hr className="my-6 border-gray-300" />

                    <h3 className="text-xl font-bold text-gray-900 mb-6">質問一覧</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto max-w-4xl">
                      {questions.map((question, index) => (
                        <div
                          key={index}
                          className="bg-white p-4 rounded-[12px] shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between items-start text-left"
                        >
                          <p className="text-sm font-semibold text-gray-600 mb-2">質問 {index + 1}</p>
                          <p className="text-base text-gray-800 flex-grow">{question}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {entrysheet && (
              <div className="mt-6 text-left">
                <Link
                  href={route('entrysheet.show', entrysheet.id)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition-colors duration-200 hover:bg-gray-200 focus:outline-none"
                  dangerouslySetInnerHTML={{ __html: icons.undo }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

InterviewResult.layout = (page) => <AppLayout title="面接練習結果">{page}</AppLayout>;
