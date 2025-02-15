<?php
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\BookmarkController;
use App\Http\Controllers\IndustryController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\EntrysheetController;
use App\Http\Controllers\ContentController;
use Illuminate\Support\Facades\Route;

// ログイン必須のルートをグループ化
Route::middleware(['auth', 'verified'])->group(function () {
    
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'home'])->name('dashboard');

    // Bookmark
    Route::get('/bookmark/create', [BookmarkController::class, 'create'])->name('bookmark.create');
    Route::post('/bookmark', [BookmarkController::class, 'store'])->name('bookmark.store');
    Route::delete('/bookmark/{bookmark}', [BookmarkController::class, 'destroy'])->name('bookmark.destroy');

    // Industry
    Route::get('/industry', [IndustryController::class, 'home'])->name('industry');
    Route::get('/industry/create', [IndustryController::class, 'create'])->name('industry.create');
    Route::post('/industry', [IndustryController::class, 'store'])->name('industry.store');
    Route::get('/industry/{industry}', [IndustryController::class, 'show'])->name('industry.show');

    // Company
    Route::get('/company', [CompanyController::class, 'home'])->name('company');
    Route::get('/company/create', [CompanyController::class, 'create'])->name('company.create');
    Route::post('/company', [CompanyController::class, 'store'])->name('company.store');
    Route::get('/company/{company}', [CompanyController::class, 'show'])->name('company.show');
    Route::get('/company/{company}/edit', [CompanyController::class, 'edit'])->name('company.edit');
    Route::put('/company/{company}', [CompanyController::class, 'update'])->name('company.update');
    Route::delete('/company/{company}', [CompanyController::class, 'destroy'])->name('company.destroy');
    Route::get('/companies/search', [CompanyController::class, 'search'])->name('company.search');

    // EntrySheet
    Route::get('/entrysheet', [EntrysheetController::class, 'home'])->name('entrysheet');
    Route::get('/entrysheet/create', [EntrysheetController::class, 'create'])->name('entrysheet.create');
    Route::post('/entrysheet', [EntrysheetController::class, 'store'])->name('entrysheet.store');
    Route::get('/entrysheet/{entrysheet}', [EntrysheetController::class, 'show'])->name('entrysheet.show');
    Route::get('/entrysheet/{entrysheet}/edit', [EntrysheetController::class, 'edit'])->name('entrysheet.edit');
    Route::put('/entrysheet/{entrysheet}', [EntrysheetController::class, 'update'])->name('entrysheet.update');
    Route::delete('/entrysheet/{entrysheet}', [EntrysheetController::class, 'destroy'])->name('entrysheet.destory');
    Route::get('/entrysheet/{id}/pdf', [EntrySheetController::class, 'generatePDF'])->name('entrysheet.pdf');
    Route::get('/entrysheets/search', [EntrySheetController::class, 'search'])->name('entrysheet.search');


    // Content
    Route::post('/entrysheet/{entrysheet}/content', [ContentController::class, 'store'])->name('content.store');
    Route::get('/entrysheet/{entrysheet}/content/{content}/edit', [ContentController::class, 'edit'])->name('content.edit');
    Route::put('/entrysheet/{entrysheet}/content/{content}', [ContentController::class, 'update'])->name('content.update');
    Route::delete('/entrysheet/{entrysheet}/content/{content}', [ContentController::class, 'destroy'])->name('content.destroy');
});