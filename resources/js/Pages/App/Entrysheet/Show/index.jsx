import React, { useState, useEffect, useRef } from "react";
import AppLayout from "@/Layouts/AppLayout";
import { Link, useForm, usePage } from "@inertiajs/react";
import TextareaAutosize from 'react-textarea-autosize';
import { icons } from "@/Utils/icons";
import formatDate from "@/Utils/formatDate";

export default function Show() {
  const { entrysheet, errors: pageGlobalErrors } = usePage().props;

  const [newContents, setNewContents] = useState([]);
  
  const [copiedContentId, setCopiedContentId] = useState(null);
  const [copiedNewItemId, setCopiedNewItemId] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const contextMenuRef = useRef(null);

  const { data, setData, patch, processing, errors: formErrors, reset } = useForm({
    answers: {},
    new_questions: [],
    new_answers: [],
  });
  
  const { delete: inertiaDelete, processing: deletingContent } = useForm();

  useEffect(() => {
    const initialAnswers = {};
    entrysheet.contents.forEach((content) => {
      initialAnswers[content.id] = content.answer || "";
    });
    setData(prevData => ({
      ...prevData,
      answers: initialAnswers,
    }));
    setNewContents([]);
    if (formErrors && (data.new_questions?.length > 0 || data.new_answers?.length > 0)) {
        const restoredNewContents = data.new_questions.map((q, index) => ({
            id: `new-restored-${index}-${crypto.randomUUID()}`,
            question: q,
            answer: data.new_answers[index] || ''
        }));
        setNewContents(restoredNewContents);
    }

  }, [entrysheet.id, entrysheet.contents]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
        setContextMenu(null);
      }
    };
    if (contextMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("contextmenu", handleClickOutside, true);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("contextmenu", handleClickOutside, true);
    };
  }, [contextMenu]);

  const handleAnswerChange = (id, value) => {
    setData("answers", { ...data.answers, [id]: value });
  };

  const handleAddNewContent = () => {
    const newTempId = `new-${crypto.randomUUID()}`; 
    setNewContents(prev => [...prev, { id: newTempId, question: '', answer: '' }]);
    
    setData(prevData => ({
      ...prevData,
      new_questions: [...prevData.new_questions, ''],
      new_answers: [...prevData.new_answers, '']
    }));
  };

  const handleRemoveNewContent = (tempIdToRemove) => {
    const itemIndexToRemove = newContents.findIndex(item => item.id === tempIdToRemove);
    if (itemIndexToRemove === -1) return;

    setNewContents(prev => prev.filter(item => item.id !== tempIdToRemove));
    
    setData(prevData => ({
      ...prevData,
      new_questions: prevData.new_questions.filter((_, index) => index !== itemIndexToRemove),
      new_answers: prevData.new_answers.filter((_, index) => index !== itemIndexToRemove),
    }));
  };

  const handleNewItemChange = (tempId, field, value) => {
    const itemIndexToUpdate = newContents.findIndex(item => item.id === tempId);
    if (itemIndexToUpdate === -1) return;

    setNewContents(prev =>
      prev.map(item => (item.id === tempId ? { ...item, [field]: value } : item))
    );

    if (field === 'question') {
      setData(prevData => {
        const updatedQuestions = [...prevData.new_questions];
        updatedQuestions[itemIndexToUpdate] = value;
        return { ...prevData, new_questions: updatedQuestions };
      });
    } else if (field === 'answer') {
      setData(prevData => {
        const updatedAnswers = [...prevData.new_answers];
        updatedAnswers[itemIndexToUpdate] = value;
        return { ...prevData, new_answers: updatedAnswers };
      });
    }
  };
  
  const handleCopyToClipboard = (textToCopy, id, isNewItem = false) => {
    if (textToCopy === null || typeof textToCopy === 'undefined') textToCopy = '';
    navigator.clipboard.writeText(textToCopy).then(() => {
      if (isNewItem) {
        setCopiedNewItemId(id);
        setTimeout(() => setCopiedNewItemId(null), 1500);
      } else {
        setCopiedContentId(id);
        setTimeout(() => setCopiedContentId(null), 1500);
      }
    }).catch(err => {
      console.error("クリップボードへのコピーに失敗しました: ", err);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    patch(route("content.bulkUpdate", entrysheet.id), {
      preserveScroll: true,
      onSuccess: () => {
        setNewContents([]);
        setData(prev => ({...prev, new_questions: [], new_answers: []}));
      },
      onError: (errorsSrv) => {
        console.error("保存に失敗しました:", errorsSrv);
      },
    });
  };

  const handleContextMenu = (event, contentId) => {
    event.preventDefault();
    setContextMenu({ x: event.clientX, y: event.clientY, contentId: contentId });
  };

  const handleDeleteContent = (contentId) => {
    if (window.confirm("この質問を削除してもよろしいですか？")) {
      inertiaDelete(route("content.destroy", { entrysheet: entrysheet.id, content: contentId }), {
        preserveScroll: true,
        onSuccess: () => setContextMenu(null),
        onError: (errorsSrv) => {
          console.error("削除に失敗しました:", errorsSrv);
          alert("削除に失敗しました。");
          setContextMenu(null);
        },
      });
    } else {
      setContextMenu(null);
    }
  };

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden rounded-[12px] border">
          <div className="p-8 text-gray-900">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-3">
                <h2 className="text-2xl font-bold">{entrysheet.company.name}</h2>
                <p className="text-lg font-semibold">
                  <strong>{entrysheet.title}</strong>
                </p>
                <a
                  href={route("entrysheet.pdf", entrysheet.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#001eff] py-1 rounded-full text-sm"
                  dangerouslySetInnerHTML={{ __html: icons.pdf }}
                />
              </div>
              <Link
                href={route("entrysheet.edit", entrysheet.id)}
                className="inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
                dangerouslySetInnerHTML={{ __html: icons.edit }}
              />
            </div>

            <p className="mt-2">
              <strong>締切日:</strong> {entrysheet.deadline ? formatDate(entrysheet.deadline) : "未設定"}
            </p>

            <form onSubmit={handleSubmit}>
              <ul className="mt-4 space-y-4" id="contents-list">
                {entrysheet.contents.length === 0 && newContents.length === 0 && (
                  <p className="text-gray-600 mt-4">まだ登録された質問がありません。</p>
                )}
                {entrysheet.contents.map((content) => (
                  <li
                    key={content.id}
                    className="p-4 border rounded-[12px]"
                    onContextMenu={(e) => handleContextMenu(e, content.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <p className="font-bold mr-3">{content.question}</p>
                        {content.character_limit !== null && (
                          <p className="text-xs text-gray-600 mr-1 pt-1">
                            {content.character_limit}文字以内
                          </p>
                        )}
                        <Link
                          href={route("content.edit", { entrysheet: entrysheet.id, content: content.id })}
                          className="inline-flex items-center justify-center p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
                          dangerouslySetInnerHTML={{ __html: icons.edit_mini }}
                        />
                      </div>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => handleCopyToClipboard(data.answers[content.id], content.id, false)}
                          className={`p-1 rounded-full focus:outline-none text-xs ${
                            copiedContentId === content.id ? "text-green-600 font-semibold" : "text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {copiedContentId === content.id ? (
                            "Copied!"
                          ) : (
                            <span dangerouslySetInnerHTML={{ __html: icons.copy }} />
                          )}
                        </button>
                      </div>
                    </div>
                    <TextareaAutosize
                      value={data.answers[content.id] || ""}
                      onChange={(e) => handleAnswerChange(content.id, e.target.value)}
                      className={`w-full border-gray-300 rounded-[12px] mt-2 p-2 ${
                        formErrors[`answers.${content.id}`] ? 'border-red-500' : ''
                      }`}
                      minRows={1}
                    />
                    {formErrors[`answers.${content.id}`] && (
                      <p className="text-red-500 text-xs mt-1">{formErrors[`answers.${content.id}`]}</p>
                    )}
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-gray-600">
                        現在の文字数: {(data.answers[content.id] || "").length}
                      </p>
                      {data.answers[content.id] && data.answers[content.id].trim() !== '' ? (
                        <Link
                          href={route("interview.expected", { entrysheet: entrysheet.id, content: content.id })}
                          className="bg-green-300 hover:bg-green-400 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          面接
                        </Link>
                      ) : (
                        <span className="bg-gray-300 text-gray-500 px-3 py-1 rounded-full text-sm cursor-not-allowed">
                          面接
                        </span>
                      )}
                    </div>
                  </li>
                ))}

                {newContents.map((item, index) => (
                  <li key={item.id} className="p-4 border border-blue-300 rounded-[12px] bg-blue-50">
                    <div className="flex justify-between items-center mb-2">
                      <label className="font-bold text-blue-700">新しい質問:</label>
                      <button
                        type="button"
                        onClick={() => handleRemoveNewContent(item.id)}
                        className="p-1 text-gray-500 hover:text-red-500 rounded-full hover:bg-gray-100 transition-colors duration-200"
                        dangerouslySetInnerHTML={{ __html: icons.trash }}
                      />
                    </div>
                    <input
                      type="text"
                      value={item.question}
                      onChange={(e) => handleNewItemChange(item.id, 'question', e.target.value)}
                      className={`w-full border-gray-300 rounded-[12px] p-2 ${
                        formErrors[`new_questions.${index}`] ? 'border-red-500' : '' 
                      }`}
                      placeholder="質問を入力"
                    />
                    {formErrors[`new_questions.${index}`] && ( 
                      <p className="text-red-500 text-xs mt-1">{formErrors[`new_questions.${index}`]}</p>
                    )}
                    <div className="mt-2">
                      <div className="flex justify-between items-center mb-1">
                        <label className="font-bold text-blue-700">新しい回答:</label>
                        <button
                          type="button"
                          onClick={() => handleCopyToClipboard(item.answer, item.id, true)}
                          className={`p-1 rounded-full focus:outline-none text-xs ${
                            copiedNewItemId === item.id ? "text-green-600 font-semibold" : "text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {copiedNewItemId === item.id ? (
                            "Copied!"
                          ) : (
                            <span dangerouslySetInnerHTML={{ __html: icons.copy }} />
                          )}
                        </button>
                      </div>
                      <TextareaAutosize
                        value={item.answer}
                        onChange={(e) => handleNewItemChange(item.id, 'answer', e.target.value)}
                        className={`w-full border-gray-300 rounded-[12px] p-2 ${
                            formErrors[`new_answers.${index}`] ? 'border-red-500' : '' 
                        }`}
                        minRows={1}
                        placeholder="回答を入力"
                      />
                      {formErrors[`new_answers.${index}`] && ( 
                        <p className="text-red-500 text-xs mt-1">{formErrors[`new_answers.${index}`]}</p>
                      )}
                      <p className="text-xs text-gray-600 mt-1">
                        現在の文字数: {(item.answer || "").length}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={handleAddNewContent}
                  className="bg-transparent p-0 text-blue-500 hover:text-blue-700 transition-colors duration-200"
                  dangerouslySetInnerHTML={{ __html: icons.plus }}
                />
              </div>

              <div className="mt-8 flex items-center justify-between">
                <Link
                  href={route("entrysheet")}
                  className="inline-flex items-center justify-center w-10 h-10 text-gray-500 rounded-full hover:bg-gray-200 focus:outline-none transition-colors duration-200"
                  dangerouslySetInnerHTML={{ __html: icons.undo }}
                />
                <button
                  type="submit"
                  disabled={processing}
                  className="bg-blue-600 text-white px-6 py-3 rounded-[12px] hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-75"
                >
                  {processing ? '保存中...' : '保存'}
                </button>
              </div>
            </form>

            {contextMenu && (
              <div
                ref={contextMenuRef}
                style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px`, position: 'fixed', zIndex: 1050 }}
                className="bg-white border border-gray-300 rounded-[12px] shadow-lg py-1"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => handleDeleteContent(contextMenu.contentId)}
                  disabled={deletingContent}
                  className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-500 hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <span className="mr-2" dangerouslySetInnerHTML={{ __html: icons.trash_mini }} />
                  削除
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

Show.layout = (page) => <AppLayout title="エントリーシート詳細">{page}</AppLayout>;