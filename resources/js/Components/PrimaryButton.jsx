export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={`bg-blue-600 text-white px-4 py-2 rounded-[12px] hover:bg-blue-500 focus:outline-none mt-4 focus:ring-2 focus:ring-blue-400 ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
}