<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Analysis extends Model
{
    /** @use HasFactory<\Database\Factories\AnalysisFactory> */
    use HasFactory;

    protected $fillable = [
        'question',
        'answer',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
