export function IndustryListItem({ industry, onMouseEnter, onMouseLeave }) {
  return (
    <div
      key={industry.id}
      className="group relative cursor-pointer rounded-[12px] border bg-white p-2 transition-transform duration-200 hover:scale-105"
      style={{
        minHeight: '60px',
        width: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <p className="truncate text-center text-sm font-semibold text-gray-500">{industry.name}</p>
    </div>
  );
}
