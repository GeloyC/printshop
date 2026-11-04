<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Modesl\Order;

#[Fillable([
    'order_id',
    'status',
    'updated_at'
])]

class OrderStatusHistories extends Model
{

    public $timestamps = false;

    public function order(): BelongsTo {
        return $this->belongsTo(Order::class, 'order_id', 'id');
    }
    
    public function casts(): array {
        return [
            'updated_at' => 'datetime:M d, Y h:i A',
        ];
    }
}
