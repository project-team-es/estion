<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Content extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['entry_sheet_id', 'question', 'answer', 'character_limit'];
    
    protected $casts = [
        'answer' => 'string', // NULL を許容
    ];

    /**
     * エントリーシート（EntrySheet）とのリレーション
     */
    public function entrysheet(): BelongsTo {
        return $this->belongsTo(EntrySheet::class, 'entry_sheet_id');
    }
}
