<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;


#[Fillable([
    'user_id',
    'file_url', 
    'configuration', 
    'additional_instruction', 
    'slug', 
    'quantity', 
    'unit_price', 
    'total_price'
])]

class OrderFileItem extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;


    //
    protected function casts(): array {
        return [
            'created_at' => 'datetime:M d, Y h:i A',
            'updated_at' => 'datetime:M d, Y h:i A',
            'unit_price' => 'decimal:2',
            'total_price' => 'decimal:2',
            'configuration' => 'array'
        ];
    }
}
