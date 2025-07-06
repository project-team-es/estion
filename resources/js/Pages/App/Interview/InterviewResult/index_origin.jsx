import React, { useState, useEffect, useCallback } from "react";
import AppLayout from "@/Layouts/AppLayout";
import { Link } from '@inertiajs/react';
import { icons } from "@/Utils/icons";

export default function InterviewResult({ entrysheet, content, results }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showEndMessage, setShowEndMessage] = useState(false);
  const [showAllQuestions, setShowAllQuestions] = useState(false);

  const questions = results || [];

  const goToNextQuestion = useCallback(() => {
    if (showAllQuestions) return;

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    } else {
      setShowAllQuestions(true);
    }
  }, [currentIndex, questions.length, showAllQuestions]);

  const handleRestart = () => {
    setCurrentIndex(0);
    setShowEndMessage(false);
    setShowAllQuestions(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        goToNextQuestion();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [goToNextQuestion]);

  useEffect(() => {
    if (showAllQuestions && questions.length > 0) {
        const timer = setTimeout(() => {
            setShowEndMessage(true);
        }, 500);
        return () => clearTimeout(timer);
    }
  }, [showAllQuestions, questions.length]);


  if (!questions || questions.length === 0) {
    return (
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden sm:rounded-[12px] shadow-lg">
            <div className="p-6 text-gray-900">
              <p className="text-lg text-center">表示する質問がありません。</p>
              {entrysheet && (
                <div className="mt-6 text-center">
                  <Link
                    href={route('entrysheet.show', entrysheet.id)}
                    className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-[12px] hover:bg-gray-600 transition duration-300 inline-block"
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

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden sm:rounded-[12px] shadow-lg">
          <div className="p-6 text-gray-900">
            {content && (
              <div className="mb-6 p-4 bg-gray-100 rounded-[12px]">
                <h3 className="text-lg font-semibold text-gray-800">元の質問と回答</h3>
                <p className="mt-1"><strong>質問:</strong> {content.question}</p>
                <p className="mt-1"><strong>回答:</strong> {content.answer}</p>
              </div>
            )}

            <div className="mt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">生成された質問</h2>
              <div className="bg-gray-50 border border-gray-300 rounded-[12px] p-6 shadow-lg">
                <ul className="list-none text-gray-800 space-y-4">
                  {questions.map((question, index) => (
                    <li
                      key={index}
                      className={`question-item p-4 bg-white rounded-[12px] shadow transition-all duration-500 ease-in-out
                        ${showAllQuestions || currentIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 h-0 p-0 m-0 overflow-hidden'}
                        ${(!showAllQuestions && currentIndex === index) ? 'cursor-pointer hover:bg-blue-50' : ''}
                      `}
                      onClick={() => {if (!showAllQuestions && currentIndex === index) goToNextQuestion();}}
                      style={{
                        height: (showAllQuestions || currentIndex === index) ? 'auto' : '0',
                        padding: (showAllQuestions || currentIndex === index) ? '1rem' : '0',
                        marginBottom: (showAllQuestions || currentIndex === index) ? '1rem' : '0',
                        visibility: (showAllQuestions || currentIndex === index) ? 'visible' : 'hidden',
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <p className="text-lg">{question}</p>
                        {(!showAllQuestions && currentIndex === index && currentIndex < questions.length -1) && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              goToNextQuestion();
                            }}
                            className="next-question px-4 py-2 bg-blue-500 text-white rounded-[12px] hover:bg-blue-600 transition duration-300"
                          >
                            次の質問へ →
                          </button>
                        )}
                      </div>
                    </li>
                  ))}
                  {showEndMessage && (
                    <li
                      className={`p-4 bg-white rounded-[12px] shadow text-gray-700 text-center text-lg transition-opacity duration-500 ease-in-out ${showEndMessage ? 'opacity-100' : 'opacity-0'}`}
                    >
                      質問は以上です
                      <br />
                      <button
                        onClick={handleRestart}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-[12px] hover:bg-blue-600 transition duration-300"
                      >
                        はじめから
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {entrysheet && (
                <div className="mt-6 text-left">
                    <Link
                        href={route('entrysheet.show', entrysheet.id)}
                        className="inline-flex items-center justify-center w-10 h-10 text-gray-500 rounded-full hover:bg-gray-200 focus:outline-none transition-colors duration-200"
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