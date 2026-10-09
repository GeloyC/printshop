<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;

#[Fillable([
    'name',
    'description',
    'base_price',
    'thumbnail_url',
    'configuration',
    'slug',
])]

class Service extends Model
{
    protected $keyType = 'string';  
    public $incrementing = false;  

    protected function casts(): array {
        return [
            'is_active' => 'boolean',
            'configuration' => 'array',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }
}
