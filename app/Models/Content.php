<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Content extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['entrysheet_id', 'question', 'answer', 'character_limit'];

    /**
     * エントリーシート（EntrySheet）とのリレーション
     */
    public function entrysheet(): BelongsTo {
        return $this->belongsTo(EntrySheet::class);
    }
}
