// 1. 個々の業界リストアイテムを表示するコンポーネント
export default function IndustryListItem({ industry, onMouseEnter, onMouseLeave }) {
    return (
        <div
            key={industry.id}
            className="relative bg-white p-2 rounded-[12px] cursor-pointer hover:bg-gray-100 text-sm"
            style={{
                minHeight: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <p className="text-center text-m font-semibold truncate">{industry.name}</p>
        </div>
    );
}