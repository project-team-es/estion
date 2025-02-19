<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CompanyFile extends Model
{
    protected $fillable = ['company_id', 'filename', 'path'];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }
}
