<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class EntrySheet extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'entrysheets';
    protected $fillable = [
        'title',
        'status',
        'deadline',
        'google_event_id',
        'user_id',
        'company_id',
    ];

    /**
     * 企業（Company）とのリレーション
     */
    public function company(): BelongsTo {
        return $this->belongsTo(Company::class);
    }

    /**
     * ユーザー（User）とのリレーション
     */
    public function user(): BelongsTo{
        return $this->belongsTo(User::class);
    }

    /**
     * コンテンツ（Content）とのリレーション
     */
    public function contents(): HasMany {
        return $this->hasMany(Content::class);
    }
}
