import AppLayout from '@/Layouts/AppLayout';
import { useForm, Head } from '@inertiajs/react';

const CreateCompany = ({ industries }) => {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    industry_id: '',
    homepage: '',
    mypage: '',
    loginid: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('company.store'));
  };

  return (
    <AppLayout title="企業登録">
      <Head title="企業登録" />
      <div className="mx-auto max-w-4xl px-6 py-12">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">企業登録</h2>

        <form onSubmit={handleSubmit} className="rounded-[12px] border bg-white p-6">
          <div className="mb-4">
            <label className="mb-2 block font-bold text-gray-700">企業名</label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              className="w-full rounded-[12px] border-gray-300 px-4 py-2"
              required
            />
            {errors.name && <div className="text-sm text-red-500">{errors.name}</div>}
          </div>

          <div className="mb-4">
            <label className="mb-2 block font-bold text-gray-700">業界</label>
            <select
              value={data.industry_id}
              onChange={(e) => setData('industry_id', e.target.value)}
              className="w-full rounded-[12px] border-gray-300 px-4 py-2"
              required
            >
              <option value="">業界を選択してください</option>
              {industries.map((industry) => (
                <option key={industry.id} value={industry.id}>
                  {industry.name}
                </option>
              ))}
            </select>
            {errors.industry_id && <div className="text-sm text-red-500">{errors.industry_id}</div>}
          </div>
          <div className="mb-4">
            <label className="mb-2 block font-bold text-gray-700">ホームページURL（任意）</label>
            <input
              type="text"
              value={data.homepage}
              onChange={(e) => setData('homepage', e.target.value)}
              className="w-full rounded-[12px] border-gray-300 px-4 py-2"
            />
            {errors.homepage && <div className="text-sm text-red-500">{errors.homepage}</div>}
          </div>

          <div className="mb-4">
            <label className="mb-2 block font-bold text-gray-700">マイページURL（任意）</label>
            <input
              type="text"
              value={data.mypage}
              onChange={(e) => setData('mypage', e.target.value)}
              className="w-full rounded-[12px] border-gray-300 px-4 py-2"
            />
            {errors.mypage && <div className="text-sm text-red-500">{errors.mypage}</div>}
          </div>

          <div className="mb-4">
            <label className="mb-2 block font-bold text-gray-700">ログインID（任意）</label>
            <input
              type="text"
              value={data.loginid}
              onChange={(e) => setData('loginid', e.target.value)}
              className="w-full rounded-[12px] border-gray-300 px-4 py-2"
            />
            {errors.loginid && <div className="text-sm text-red-500">{errors.loginid}</div>}
          </div>

          <div className="text-right">
            <button
              type="submit"
              disabled={processing}
              className="rounded-[12px] bg-blue-600 px-6 py-3 text-white hover:bg-blue-500"
            >
              登録
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
};

export default CreateCompany;
