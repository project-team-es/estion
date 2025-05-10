export default function IndustryListItem({ industry, onMouseEnter, onMouseLeave }) {
    return (
        <div
            key={industry.id}
            className="bg-white p-2 rounded-[12px] border relative cursor-pointer transition-transform duration-200 hover:scale-105 group"
            style={{
                minHeight: "60px",
                width: "200px",
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