<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\View;
use App\Models\Bookmark;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        View::composer(['layouts.navigation', 'bookmark.create'], function ($view) {
            $bookmarks = auth()->check() ? Bookmark::where('user_id', auth()->id())->get() : collect();
            $view->with('bookmarks', $bookmarks);
        });
    }
}
