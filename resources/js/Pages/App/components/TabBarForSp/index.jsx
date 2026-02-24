import { icons } from '@/Utils/icons';
import { Link, usePage } from '@inertiajs/react';
export function TabBarForSp() {
  const { url } = usePage();
  const isActive = (path) => url.startsWith(path);

  return (
    <div className="fixed bottom-0 left-0 flex h-[6%] w-full items-center justify-around border-t border-gray-300 bg-white shadow-lg">
      <Link
        href={route('dashboard')}
        className={`${isActive('/dashboard') ? 'text-blue-600' : 'text-black'}`}
        dangerouslySetInnerHTML={{ __html: icons.home }}
      />
      <Link
        href={route('industry')}
        className={`${isActive('/industry') ? 'text-blue-600' : 'text-black'}`}
        dangerouslySetInnerHTML={{ __html: icons.list }}
      />
      <Link
        href={route('company')}
        className={`${isActive('/company') ? 'text-blue-600' : 'text-black'}`}
        dangerouslySetInnerHTML={{ __html: icons.company }}
      />
      <Link
        href={route('entrysheet')}
        className={`${isActive('/entrysheet') ? 'text-blue-600' : 'text-black'}`}
        dangerouslySetInnerHTML={{ __html: icons.es }}
      />
      <Link
        href={route('profile.edit')}
        className={`${isActive('/profile') ? 'text-blue-600' : 'text-black'}`}
        dangerouslySetInnerHTML={{ __html: icons.setting }}
      />
    </div>
  );
}
