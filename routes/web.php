<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\IndustryController;
use App\Http\Controllers\Auth\LoginController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;

use App\Http\Controllers\GeminiController;

Route::get('/', function () {
    return view('front.home');
})->name('front.home');

// OAuth認証
Route::get('auth/google', [LoginController::class, 'redirectToGoogle'])->name('auth.google'); // 任意のURL
Route::get('auth/google/callback', [LoginController::class, 'handleGoogleCallback']);

//問い合わせ関係
Route::get('/contact', [ContactController::class, 'create'])->name('contact.create');
Route::post('/contact', [ContactController::class, 'send'])->name('contact.send');

// プロフィール関係
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
require __DIR__.'/dashboard.php';

