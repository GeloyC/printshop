<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Order;
use App\Models\Service;


#[Fillable([
    'service_id',
    'file_url',
    'metadata',
    'configuration',
    'slug',
    'additional_instruction',
    'quantity',
    'unit_price',
    'total_price',
])]

class OrderItem extends Model
{
    public function order(): BelongsTo {
        return $this->belongsTo(Order::class, 'order_id', 'id');
    }

    public function service(): BelongsTo {
        return $this->belongsTo(Service::class);
    }

    public function casts(): array {
        return [
            'configuration' => 'array',
            'metadata' => 'array',
        ];
    }
}
