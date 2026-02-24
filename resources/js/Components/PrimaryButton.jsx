export function PrimaryButton({ className = '', disabled, children, ...props }) {
  return (
    <button
      {...props}
      className={`mt-4 rounded-[12px] bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
