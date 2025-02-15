<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Company extends Model
{
    /** @use HasFactory<\Database\Factories\CompanyFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'homepage',
        'mypage',
        'loginid',
        'status',
        'process',
        'industry_id',
        'user_id',
    ];

    /**
     * 業界（Industry）とのリレーション
     */
    public function industry(): BelongsTo {
        return $this->belongsTo(Industry::class);
    }

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    /**
     * エントリーシート（EntrySheet）とのリレーション
     */
    public function entrysheets(): HasMany {
        return $this->hasMany(EntrySheet::class);
    }
}
