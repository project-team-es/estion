// 1. 個々の業界リストアイテムを表示するコンポーネント
export default function IndustryListItem({ industry, onMouseEnter, onMouseLeave }) {
    return (
        <div
            key={industry.id}
            className="bg-white p-2 rounded-[12px] shadow-sm border relative cursor-pointer transition hover:shadow-md"
            style={{
                minHeight: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <p className="text-center text-sm text-gray-500 font-semibold truncate">{industry.name}</p>
        </div>
    );
}