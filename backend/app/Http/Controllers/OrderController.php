<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use App\Models\OrderItem;
use App\Models\CartItem;
use App\Models\OrderStatusHistories;
use App\Models\Order;
use App\Models\Service;
use Illuminate\Http\Request;
use App\Enums\OrderStatus;
use Illuminate\Support\Str;

class OrderController extends Controller
{

    public function checkout(Request $request) {

        $validated = $request->validate([
            'items' => ['required', 'array', 'min:1'],
            'items.*.slug' => ['required', 'string', 'exists:services,slug'],
            'items.*.file_url' => ['required', 'string'],
            'items.*.metadata' => ['required', 'array'],
            'items.*.configuration' => ['required', 'array'],
            'items.*.additional_instruction' => ['sometimes', 'nullable', 'string', 'max:5000'],
            'items.*.quantity' => ['required', 'integer'],
            'items.*.unit_price' => ['required', 'numeric', 'decimal:0,2'],
            'items.*.total_price' => ['required', 'numeric', 'decimal:0,2'],
        ]);

        
        $order = DB::transaction(function () use ( $validated ) {

            $order = Order::create([
                'id' => (string) Str::uuid7(),
                'user_id' => auth()->id(),
                'status' => OrderStatus::OrderPlaced
            ]);

            if (!$order->id) {
                throw new \Exception('Order ID was not generated.');
            }

            OrderStatusHistories::create([
                'order_id' => $order->id,
                'status' => $order->status,
                'updated_at' => now(),
            ]);
            

            $slugs = collect($validated['items'])
                ->pluck('slug')
                ->unique();

            $services = Service::query()
                ->select('id', 'slug')
                ->whereIn('slug', $slugs)
                ->get()
                ->keyBy('slug');


            if (!$order->exists || !$order->id) {
                throw new \Exception('Order does not exist or has no ID.');
            }

            
            $order->items()->createMany(
                array_map(fn ($item) => [
                    'service_id' => $services[$item['slug']]->id,
                    'file_url' => $item['file_url'],
                    'metadata' => $item['metadata'],
                    'configuration' => $item['configuration'],
                    'slug' => $item['slug'],
                    'additional_instruction' => $item['additional_instruction'] ?? null,
                    'quantity' => $item['quantity'],
                    'unit_price' => $item['unit_price'],
                    'total_price' => $item['total_price']
                ], $validated['items'])
            );

            

            CartItem::query()
            ->where('user_id', auth()->id())
            ->delete();
            

            return $order;
        });

        return response()->json([
            'message' => 'Order successfully placed!',
            'order' => $order->load('items')
        ], 201);
    }
}
