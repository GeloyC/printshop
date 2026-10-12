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
    'file_requirements',
    'configuration',
    'slug',
])]

class Service extends Model
{
    protected $keyType = 'string';  
    public $incrementing = false;  

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array {
        return [
            'is_active' => 'boolean',
            'configuration' => 'array',
            'file_requirements' => 'array',
            'created_at' => 'datetime:M d, Y h:i A',
            'updated_at' => 'datetime:M d, Y h:i A',
        ];
    }
}
