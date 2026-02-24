export function FooterForGueset() {
  return (
    <footer className="flex flex-col items-center bg-gray-200 py-4 text-xs text-black md:flex md:flex-row md:justify-center md:space-x-8 md:py-8">
      <div className="flex flex-row items-center justify-end space-x-8 pt-3 md:space-x-8">
        <p className="mb-2 md:mb-0">
          <a href={route('policy')} className="hover:underline">
            プライバシーポリシー
          </a>
        </p>
        <p className="mb-2 md:mb-0">
          <a href={route('agreement')} className="hover:underline">
            利用規約
          </a>
        </p>
        {/* <p className="mb-2 md:mb-0">
          <a href={route('qa')} className="hover:underline">
            Q&A
          </a>
        </p> */}
      </div>
      <p className="md:mt-2">&copy; {new Date().getFullYear()} estion. All rights reserved.</p>
    </footer>
  );
}
