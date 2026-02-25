<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookmarkRequest;
use App\Http\Requests\UpdateBookmarkRequest;
use App\Models\Bookmark;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

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
        return Inertia::render('Bookmark/Create', [
            'bookmarks' => Auth::check() ? Auth::user()->bookmark()->orderBy('order')->get() : [],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBookmarkRequest $request)
    {
        $maxOrder = Bookmark::where('user_id', Auth::id())->max('order') ?? -1;

        Bookmark::create([
            'name' => $request->name,
            'url' => $request->url,
            'user_id' => Auth::id(),
            'order' => $maxOrder + 1,
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
        if ($bookmark->user_id !== Auth::id()) {
            abort(403, 'このURLを編集する権限がありません。');
        }

        return Inertia::render('Bookmark/Edit/index', [
            'bookmark' => $bookmark,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookmarkRequest $request, Bookmark $bookmark)
    {
        if ($bookmark->user_id !== Auth::id()) {
            abort(403, 'このURLを編集する権限がありません。');
        }

        $bookmark->update([
            'name' => $request->name,
            'url' => $request->url,
        ]);

        return redirect()->route('bookmark.create')->with('success', 'お気に入りURLを更新しました');
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

    public function reorder(Request $request)
    {
        $ids = $request->input('ids', []);
        foreach ($ids as $index => $id) {
            Bookmark::where('id', $id)
                ->where('user_id', Auth::id())
                ->update(['order' => $index]);
        }

        return response()->noContent();
    }

    public static function middleware(): array
    {
        return [
            'auth',
            'verified',
        ];
    }
}
