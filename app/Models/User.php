<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\EntrySheet;
use App\Models\Company;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'google_id',
        'google_access_token',
        'google_refresh_token',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function bookmark(): HasMany{
        return $this->hasMany(Bookmark::class);
    }

    public function industries()
    {
        return $this->hasManyThrough(
            Industry::class, // 最終的に取得したいモデル（業界）
            Company::class,  // 中間テーブルとして経由するモデル（企業）
            'user_id',       // companies テーブルの user_id（中間テーブル）
            'id',            // industries テーブルの id（参照する主キー）
            'id',            // users テーブルの id（このモデルのキー）
            'industry_id'    // companies テーブルの industry_id（中間テーブルの外部キー）
        )->distinct();       // ユーザーが登録した業界を重複なしで取得
    }

    public function company(): HasMany{
        return $this->hasMany(Company::class);
    }

    public function entrysheet(): HasMany{
        return $this->hasMany(Entrysheet::class);
    }
}
