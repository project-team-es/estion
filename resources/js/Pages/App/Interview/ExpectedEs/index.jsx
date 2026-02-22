import TextareaAutosize from 'react-textarea-autosize';
import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ExpectedEs({ entrysheet, content }) {
  const { data, setData, post, processing, errors } = useForm({
    entry_sheet_id: entrysheet?.id ?? '',
    content_id: content?.id ?? '',
    interview_request: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('interview.start'), data);
  };

  return (
    <AppLayout>
      <Head>
        <title>面接内容の確認｜estion.</title>
        <meta
          name="description"
          content="estion.の面接内容確認ページです。設問に対してリクエストを追加し、面接に進むことができます。"
        />
        <meta name="google-adsense-account" content="ca-pub-9604843985307640" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9604843985307640"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <div className="py-12">
        <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-md">
          <h2 className="text-center text-2xl font-bold">{entrysheet?.company?.name}</h2>
          <div className="mt-6 rounded-lg border bg-gray-100 p-4">
            <h3 className="text-xl font-semibold">面接内容の確認</h3>
            <p className="mt-2">
              <strong>質問:</strong> {content?.question}
            </p>
            <p className="mt-2">
              <strong>回答:</strong> {content?.answer}
            </p>
          </div>

          <form method="POST" onSubmit={submit}>
            <input type="hidden" name="entry_sheet_id" value={data.entry_sheet_id} />
            <input type="hidden" name="content_id" value={data.content_id} />

            <div className="mt-6">
              <label htmlFor="interview_request" className="block text-lg font-semibold">
                面接リクエスト
              </label>
              <TextareaAutosize
                id="interview_request"
                name="interview_request"
                minRows={1}
                className="mt-2 w-full rounded-lg border-gray-300 p-2"
                placeholder="例: キャリアプランと絡めて質問してほしい"
                value={data.interview_request}
                onChange={(e) => setData('interview_request', e.target.value)}
              />
            </div>

            <div className="mt-6 text-center">
              <button
                type="submit"
                className="rounded-lg bg-blue-500 px-6 py-2 text-white transition hover:bg-blue-600"
                disabled={processing}
              >
                {processing ? '面接開始中...' : '面接開始'}
              </button>
              {errors.interview_request && (
                <div className="mt-2 text-red-500">{errors.interview_request}</div>
              )}
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
