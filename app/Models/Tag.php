<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\belongsToMany;

class Tag extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    /**
     * エントリーシート（EntrySheet）との多対多リレーション
     */
    public function entrysheets(): BelongsToMany
    {
        return $this->belongsToMany(EntrySheet::class)->withTimestamp();
    }
}
