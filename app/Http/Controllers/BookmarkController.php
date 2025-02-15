<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookmarkRequest;
use App\Http\Requests\UpdateBookmarkRequest;
use Illuminate\Routing\Controllers\HasMiddleware;

use App\Models\Bookmark;

use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;

class BookmarkController extends Controller implements HasMiddleware
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('bookmark.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBookmarkRequest $request)
    {
        Bookmark::create([
            'name' => $request->name,
            'url' => $request->url,
            'user_id' => Auth::id(),
        ]);

        return redirect()->route('bookmark.create')->with('success', 'お気に入りURLを追加しました');
    }

    /**
     * Display the specified resource.
     */
    public function show(Bookmark $bookmark)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Bookmark $bookmark)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookmarkRequest $request, Bookmark $bookmark)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Bookmark $bookmark)
    {
        if ($bookmark->user_id !== Auth::id()) {
            abort(403, 'このURLを削除する権限がありません。');
        }

        $bookmark->delete();

        return redirect()->route('bookmark.create')->with('success', 'お気に入りURLを削除しました！');
    }

    public static function middleware(): array
    {
        return [
            'auth',
            'verified'
        ];
    }
}
