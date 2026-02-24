
export default function CompanyList({ companies }) {
  if (!companies || companies.length === 0) {
    return <p className="mt-4 text-gray-600">登録された企業がありません。</p>;
  }

  return (
    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {companies.map((company) => (
        <div
          key={company.id}
          className="relative cursor-pointer rounded-[12px] border p-4 transition-all duration-300 hover:shadow-lg"
          onClick={() => (window.location.href = `/company/${company.id}`)}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{company.name}</h3>
          </div>
          <p className="text-sm text-gray-600">{company.industry?.name ?? '業界なし'}</p>
        </div>
      ))}
    </div>
  );
}
