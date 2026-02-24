export default function AuthInput({ id, label, type, value, onChange, error }) {
  return (
    <div className="mt-4">
      <label htmlFor={id} className="block text-sm font-bold text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={id}
        value={value}
        onChange={onChange}
        className={`mt-2 block w-full rounded-md border-gray-300 px-4 py-1 focus:border-blue-500 focus:ring-blue-500 md:py-2 ${error ? 'border-red-500' : ''}`}
      />
      {error && <p className="mt-2 text-xs italic text-red-500">{error}</p>}
    </div>
  );
}
