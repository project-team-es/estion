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
    if (showAllQuestions) return;

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
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
      if (event.key === 'Enter') {
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
              <h2 className="mb-4 text-xl font-bold text-gray-900">生成された質問</h2>
              <div className="rounded-[12px] border border-gray-300 bg-gray-50 p-6 shadow-lg">
                <ul className="list-none space-y-4 text-gray-800">
                  {questions.map((question, index) => (
                    <li
                      key={index}
                      className={`question-item rounded-[12px] bg-white p-4 shadow transition-all duration-500 ease-in-out ${showAllQuestions || currentIndex === index ? 'translate-y-0 opacity-100' : 'm-0 h-0 -translate-y-5 overflow-hidden p-0 opacity-0'} ${!showAllQuestions && currentIndex === index ? 'cursor-pointer hover:bg-blue-50' : ''} `}
                      onClick={() => {
                        if (!showAllQuestions && currentIndex === index) goToNextQuestion();
                      }}
                      style={{
                        height: showAllQuestions || currentIndex === index ? 'auto' : '0',
                        padding: showAllQuestions || currentIndex === index ? '1rem' : '0',
                        marginBottom: showAllQuestions || currentIndex === index ? '1rem' : '0',
                        visibility:
                          showAllQuestions || currentIndex === index ? 'visible' : 'hidden',
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-lg">{question}</p>
                        {!showAllQuestions &&
                          currentIndex === index &&
                          currentIndex < questions.length - 1 && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                goToNextQuestion();
                              }}
                              className="next-question rounded-[12px] bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
                            >
                              次の質問へ →
                            </button>
                          )}
                      </div>
                    </li>
                  ))}
                  {showEndMessage && (
                    <li
                      className={`rounded-[12px] bg-white p-4 text-center text-lg text-gray-700 shadow transition-opacity duration-500 ease-in-out ${showEndMessage ? 'opacity-100' : 'opacity-0'}`}
                    >
                      質問は以上です
                      <br />
                      <button
                        onClick={handleRestart}
                        className="mt-4 rounded-[12px] bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
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
