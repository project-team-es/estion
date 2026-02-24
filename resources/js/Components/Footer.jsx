export function Footer() {
  return (
    <footer className="flex flex-col items-center bg-gray-200 px-4 py-8 pb-20 text-xs text-black md:flex md:flex-row md:justify-center md:space-x-8 md:pb-8">
      <div className="flex flex-col items-center md:flex-row md:space-x-8">
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
      <p className="mt-2 md:mt-0">&copy; {new Date().getFullYear()} estion. All rights reserved.</p>
    </footer>
  );
}
