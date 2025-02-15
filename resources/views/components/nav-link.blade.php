@props(['href', 'active' => false, 'external' => false])

@php
    // `external` を明示的に boolean に変換
    $isExternal = filter_var($external, FILTER_VALIDATE_BOOLEAN);

    $classes = ($active ?? false)
        ? 'inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 text-gray-900 focus:outline-none transition duration-150 ease-in-out'
        : 'inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 transition duration-150 ease-in-out';
@endphp

<a href="{{ $href }}" 
    @if ($isExternal) target="_blank" rel="noopener noreferrer" @endif
    class="{{ $classes }}">
    {{ $slot }}
</a>