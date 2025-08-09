<?php
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PolicyController;
use App\Http\Controllers\AgreementController;
use App\Http\Controllers\QaController;

Route::get('/', function () {
    return Inertia::render('Guest/index', [
    ]);
});

// OAuth認証
Route::get('auth/google', [LoginController::class, 'redirectToGoogle'])->name('auth.google');
Route::get('auth/google/callback', [LoginController::class, 'handleGoogleCallback']);

// web.php
Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/policy', [PolicyController::class, 'index'])->name('policy');
Route::get('/agreement', [AgreementController::class, 'index'])->name('agreement');
Route::get('/qa', [QaController::class, 'index'])->name('qa');
require __DIR__.'/auth.php';
require __DIR__.'/dashboard.php';