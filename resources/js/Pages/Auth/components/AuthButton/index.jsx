
export default function AuthButton({ text, disabled }) {
  return (
    <button
      type="submit"
      className={`w-full rounded-md py-2 font-bold text-white transition md:py-3 ${
        disabled ? 'cursor-not-allowed bg-gray-200' : 'bg-gray-400 hover:bg-blue-500'
      }`}
    >
      {text}
    </button>
  );
}
