<nav x-data="{ open: false }" class="bg-white fixed top-4 left-1/2 transform -translate-x-1/2 w-full max-w-[95%] mx-auto z-50 rounded-[12px] px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
        <div class="flex justify-between items-center h-12">
            <!-- Left: Logo -->
            <div class="flex items-center">
                <a href="{{ route('dashboard') }}" class="text-xl font-bold mr-5">estion.</a>
            </div>

            @php
                $dashboardRoutes = ['dashboard'];
                $companyRoutes = ['company', 'company.create', 'company.show', 'company.edit'];
                $entrysheetRoutes = ['entrysheet', 'entrysheet.create', 'entrysheet.show', 'entrysheet.edit', 'content.edit'];
            @endphp

            <!-- Center: Navigation Links (Desktop) -->
            <div class="hidden md:flex items-center space-x-5 text-gray-500 text-sm font-medium">
                <x-nav-link :href="route('dashboard')" :active="request()->routeIs($dashboardRoutes)" class="hover:text-gray-900">
                    {{ __('Dashboard') }}
                </x-nav-link>
                <x-nav-link :href="route('company')" :active="request()->routeIs($companyRoutes)" class="hover:text-gray-900">
                    {{ __('Company') }}
                </x-nav-link>
                <x-nav-link :href="route('entrysheet')" :active="request()->routeIs($entrysheetRoutes)" class="hover:text-gray-900">
                    {{ __('Sheet') }}
                </x-nav-link>
                
                @if ($bookmarks->isNotEmpty())
                    <!-- Divider -->
                    <div class="hidden md:block h-6 w-px bg-gray-300"></div>
                    @foreach ($bookmarks->take(3) as $bookmark)
                        <x-nav-link :href="$bookmark->url" :external="true" class="block py-2">{{ $bookmark->name }}</x-nav-link>
                    @endforeach
                @endif
            </div>
            
            <!-- Right: User Name (Desktop) -->
            <div class="hidden md:flex items-center text-sm font-medium text-gray-700">
                <x-dropdown align="right" width="48">
                    <x-slot name="trigger">
                        <button class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 hover:text-gray-700 focus:outline-none transition ease-in-out duration-150">
                            <div>{{ Auth::user()->name }}</div>
                            <div class="ms-1">
                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                </svg>
                            </div>
                        </button>
                    </x-slot>
                    <x-slot name="content">
                        <x-dropdown-link :href="route('profile.edit')">
                            {{ __('プロフィール') }}
                        </x-dropdown-link>
                        <x-dropdown-link :href="route('analysis.index')">
                            {{ __('自己分析') }}
                        </x-dropdown-link>
                        <x-dropdown-link :href="route('bookmark.create')">
                            {{ __('ブックマーク') }}
                        </x-dropdown-link>
                        <form method="POST" action="{{ route('logout') }}">
                            @csrf
                            <x-dropdown-link :href="route('logout')"
                                    onclick="event.preventDefault(); this.closest('form').submit();">
                                {{ __('ログアウト') }}
                            </x-dropdown-link>
                        </form>
                    </x-slot>
                </x-dropdown>
            </div>

            <!-- Hamburger Button (Mobile) -->
            <div class="-me-2 flex items-center md:hidden">
                <button @click="open = !open" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
                    <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path :class="{'hidden': open, 'inline-flex': !open }" class="inline-flex" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        <path :class="{'hidden': !open, 'inline-flex': open }" class="hidden" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    </div>

    <!-- Mobile Menu -->
    <div :class="{'block': open, 'hidden': !open}" class="md:hidden absolute top-16 left-0 w-full bg-white shadow-md rounded-md p-4">
        <x-nav-link :href="route('dashboard')" :active="request()->routeIs('dashboard')" class="block py-2">{{ __('dashboard') }}</x-nav-link>
        <x-nav-link :href="route('company')" :active="request()->routeIs('company')" class="block py-2">{{ __('company') }}</x-nav-link>
        <x-nav-link :href="route('entrysheet')" :active="request()->routeIs('entrysheet')" class="block py-2">{{ __('sheet') }}</x-nav-link>
        <div class="border-t my-2"></div>

        @if ($bookmarks->isNotEmpty())
            @foreach ($bookmarks->take(3) as $bookmark)
            <x-nav-link :href="$bookmark->url" class="block py-2" target="_blank">{{ $bookmark->name }}</x-nav-link>
            @endforeach
        @endif

        <div class="border-t my-2"></div>
        <x-dropdown-link :href="route('profile.edit')" class="block py-2">{{ __('Profile') }}</x-dropdown-link>
        <form method="POST" action="{{ route('logout') }}">
            @csrf
            <x-dropdown-link :href="route('logout')" class="block py-2"
                    onclick="event.preventDefault(); this.closest('form').submit();">
                {{ __('Log Out') }}
            </x-dropdown-link>
        </form>
    </div>
</nav>

<!-- Content Padding to prevent overlap -->
<div class="h-16"></div>