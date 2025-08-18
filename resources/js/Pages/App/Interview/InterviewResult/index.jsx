import React, { useState, useEffect, useCallback } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
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
    <>
      <Head>
        <title>面接結果の確認</title>
        <meta
          name="description"
          content="estion.の面接結果確認ページです。設問に対して生成された面接質問を確認することができます。"
        />
      </Head>
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
                <h2 className="mb-4 text-xl font-bold text-gray-900">生成された質問</h2>
                <div className="flex min-h-[250px] flex-col items-center justify-center rounded-[12px] border border-gray-300 bg-gray-50 p-6 text-center shadow-lg">
                  {/* 質問または終了メッセージと質問一覧を表示 */}
                  {!showEndMessage ? (
                    <div className="w-full">
                      <p className="animate-fade-in text-lg text-gray-800">{currentQuestion}</p>
                      {/* 最後の質問の場合もボタンを表示 */}
                      {currentIndex < questions.length - 1 ? (
                        <button
                          onClick={goToNextQuestion}
                          className="mt-6 rounded-[12px] bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
                        >
                          次の質問へ →
                        </button>
                      ) : (
                        // 最後の質問の場合のボタン
                        <button
                          onClick={goToNextQuestion} // showEndMessageをtrueにするために同じ関数を呼び出し
                          className="mt-6 rounded-[12px] bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
                        >
                          質問一覧へ →
                        </button>
                      )}
                    </div>
                  ) : (
                    // 終了メッセージと質問一覧表示（カード形式）
                    <div className="animate-fade-in w-full text-center text-lg text-gray-700">
                      <p className="mb-4">質問は以上です</p>
                      <button
                        onClick={handleRestart}
                        className="mb-6 rounded-[12px] bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
                      >
                        はじめから
                      </button>

                      <hr className="my-6 border-gray-300" />

                      <h3 className="mb-6 text-xl font-bold text-gray-900">質問一覧</h3>
                      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {questions.map((question, index) => (
                          <div
                            key={index}
                            className="flex flex-col items-start justify-between rounded-[12px] bg-white p-4 text-left shadow-md transition-shadow duration-300 hover:shadow-lg"
                          >
                            <p className="mb-2 text-sm font-semibold text-gray-600">
                              質問 {index + 1}
                            </p>
                            <p className="flex-grow text-base text-gray-800">{question}</p>
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
    </>
  );
}

InterviewResult.layout = (page) => <AppLayout title="面接練習結果">{page}</AppLayout>;
