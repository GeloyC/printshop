<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use MohamedSaid\Referenceable\Traits\HasReference;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\OrderItem;


#[Fillable([
    'id',
    'user_id',
    'reference_number',
    'status'
])]

class Order extends Model
{
    use hasReference;

    protected $referenceColumn = 'reference_number';
    protected $referenceStrategy = 'random';
    protected $referencePrefix = 'ORD';
    protected $referenceLength = 8;
    protected $referenceCase = 'upper';
    
    protected $keyType = 'string';
    public $incrementing = false;

    public function items(): HasMany {
        return $this->hasMany(OrderItem::class, 'order_id', 'id');
    }

    public function casts(): array {
        return [
            'created_at' => 'datetime:M d, Y, g:i A',
            'updated_at' => 'datetime:M d, Y, g:i A',
        ];
    }
}
