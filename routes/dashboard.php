<?php
use App\Http\Controllers\GeminiController;

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AnalysisController;
use App\Http\Controllers\BookmarkController;
use App\Http\Controllers\IndustryController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\EntrysheetController;
use App\Http\Controllers\ContentController;
use App\Http\Controllers\CompanyFileController;
use App\Http\Controllers\CalendarController;
use Illuminate\Support\Facades\Route;

// ログイン必須のルートをグループ化
Route::middleware(['auth', 'verified'])->group(function () {
    
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Google カレンダーの予定を取得するルート
    Route::get('/calendar/events', [CalendarController::class, 'getUserEvents'])->name('calendar.events');

    // Bookmark
    Route::get('/bookmark/create', [BookmarkController::class, 'create'])->name('bookmark.create');
    Route::post('/bookmark', [BookmarkController::class, 'store'])->name('bookmark.store');
    Route::delete('/bookmark/{bookmark}', [BookmarkController::class, 'destroy'])->name('bookmark.destroy');

    // Analysis
    Route::get('/analysis', [AnalysisController::class, 'index'])->name('analysis.index');
    Route::patch('/analyses/bulk-update/{user}', [AnalysisController::class, 'bulkUpdate'])->name('analysis.bulkUpdate');
    Route::get('/analyses/{analysis}/edit', [AnalysisController::class, 'edit'])->name('analysis.edit');
    Route::patch('/analyses/{analysis}', [AnalysisController::class, 'update'])->name('analysis.update');

    // Company
    Route::get('/company', [CompanyController::class, 'index'])->name('company');
    Route::get('/company/create', [CompanyController::class, 'create'])->name('company.create');
    Route::post('/company', [CompanyController::class, 'store'])->name('company.store');
    Route::get('/company/{company}', [CompanyController::class, 'show'])->name('company.show');
    Route::get('/company/{company}/edit', [CompanyController::class, 'edit'])->name('company.edit');
    Route::put('/company/{company}', [CompanyController::class, 'update'])->name('company.update');
    Route::delete('/company/{company}', [CompanyController::class, 'destroy'])->name('company.destroy');
    Route::get('/companies/search', [CompanyController::class, 'search'])->name('company.search');

    // EntrySheet
    Route::get('/entrysheet', [EntrysheetController::class, 'index'])->name('entrysheet');
    Route::get('/entrysheet/create', [EntrysheetController::class, 'create'])->name('entrysheet.create');
    Route::get('/entrysheets/create/{company_id}', [EntrysheetController::class, 'createWithCompany'])->where('company_id', '[0-9]+')->name('entrysheet.create.with.company');
    Route::post('/entrysheet', [EntrysheetController::class, 'store'])->name('entrysheet.store');
    Route::get('/entrysheet/{entrysheet}', [EntrysheetController::class, 'show'])->name('entrysheet.show');
    Route::get('/entrysheet/{entrysheet}/edit', [EntrysheetController::class, 'edit'])->name('entrysheet.edit');
    Route::put('/entrysheet/{entrysheet}', [EntrysheetController::class, 'update'])->name('entrysheet.update');
    Route::delete('/entrysheet/{entrysheet}', [EntrysheetController::class, 'destroy'])->name('entrysheet.destroy');
    Route::get('/entrysheet/{id}/pdf', [EntrySheetController::class, 'generatePDF'])->name('entrysheet.pdf');
    Route::get('/entrysheets/search', [EntrySheetController::class, 'search'])->name('entrysheet.search');

    // Content
    Route::post('/entrysheet/{entrysheet}/content', [ContentController::class, 'store'])->name('content.store');
    Route::get('/entrysheet/{entrysheet}/content/{content}/edit', [ContentController::class, 'edit'])->name('content.edit');
    Route::put('/entrysheet/{entrysheet}/content/{content}', [ContentController::class, 'update'])->name('content.update');
    Route::delete('/entrysheet/{entrysheet}/content/{content}', [ContentController::class, 'destroy'])->name('content.destroy');
    Route::patch('/entrysheet/{entrysheet}/bulk-update', [ContentController::class, 'bulkUpdate'])->name('content.bulkUpdate'); // トリガー:保存ボタン

    // CompanyFile
    Route::post('/company/{company}/files', [App\Http\Controllers\CompanyFileController::class, 'store'])->name('company.files.store');
    Route::delete('/company/files/{file}', [App\Http\Controllers\CompanyFileController::class, 'destroy'])->name('company.files.destroy');
    Route::get('/company/files/download/{file}', [App\Http\Controllers\CompanyFileController::class, 'download'])->name('company.files.download');
    Route::get('/company/files/view/{file}', [App\Http\Controllers\CompanyFileController::class, 'view'])->name('company.files.view');

    // GeminiAPI
    // Route::get('/entrysheet/{entrysheet}/interview/{content}', [GeminiController::class, 'index'])->name('interview.index');
    Route::post('/interview', [GeminiController::class, 'execute'])->name('interview.execute');
    Route::get('/interview/{entrysheet}/{content}/expected', [GeminiController::class, 'showExpectedES'])->name('interview.expected');
    Route::post('/interview/start', [GeminiController::class, 'index'])->name('interview.start');
});