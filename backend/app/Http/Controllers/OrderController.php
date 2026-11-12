<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Http\Request;

use App\Models\OrderItem;
use App\Models\CartItem;
use App\Models\OrderStatusHistories;
use App\Models\Order;
use App\Models\Service;

use App\Enums\OrderStatus;

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


    public function getOrdersByStatus (Request $request) {
        
        $userId = auth()->id();
        $status = $request->query('status');

        $sql = "
            SELECT
                orders.id,
                orders.reference_number,
                orders.status,
                orders.updated_at,
                COUNT(orderItems.file_url) AS number_of_files,
                SUM(orderItems.total_price) AS total_paid

            FROM orders

            JOIN order_items AS orderItems
                ON orderItems.order_id = orders.id

            WHERE orders.user_id = ?
        ";

        $params = [$userId];

        if (!empty($status)) {
            $sql .= " AND orders.status = ?";
            $params[] = $status;
        }

        $sql .= "
            GROUP BY
                orders.id,
                orders.reference_number,
                orders.status,
                orders.updated_at
            ORDER BY orders.updated_at DESC
        ";

        $orders = DB::select($sql, $params);
        return response()->json($orders);
    }


    public function getOrderPlacedCount () {
        $userId = auth()->id();

        $orderCount = Order::query()
            ->where('status', 'Order placed')
            ->where('user_id', $userId)
            ->count();

        return response()->json($orderCount);
    }


    public function getOrderItemData (String $item_id) {
        $userId = auth()->id();

        $validator = Validator::make(
            ['id' => $item_id],
            [
                'id' => ['required', 'uuid', 'exists:order_items,id'],
            ]
        );

        $orderItem = DB::select("
            SELECT
                o.id,
                o.reference_number,
                o.status,
                o.created_at,
                o.updated_at,

                COALESCE(SUM(oi.total_price), 0) AS order_total,

                u.name AS customer_name,
                u.id AS user_id,

                COALESCE(
                    (
                        SELECT JSON_AGG(
                            JSON_BUILD_OBJECT(
                                'id', osh.id,
                                'status', osh.status,
                                'updated_at', osh.updated_at
                            )
                            ORDER BY osh.updated_at ASC
                        )
                        FROM order_status_histories AS osh
                        WHERE osh.order_id = o.id
                    ),
                    '[]'::json
                ) AS order_status_histories,

                COALESCE(
                    JSON_AGG(
                        JSON_BUILD_OBJECT(
                            'id', oi.id,
                            'file_url', oi.file_url,
                            'metadata', oi.metadata,
                            'configuration', oi.configuration,
                            'slug', oi.slug,
                            'additional_instruction', oi.additional_instruction,
                            'quantity', oi.quantity,
                            'unit_price', oi.unit_price,
                            'total_price', oi.total_price
                        )
                    ) FILTER (WHERE oi.id IS NOT NULL),
                    '[]'::json
                ) AS order_items

            FROM orders AS o

            LEFT JOIN order_items AS oi
                ON oi.order_id = o.id
            LEFT JOIN users AS u
                ON o.user_id = u.id

            WHERE
                o.user_id = ?
                AND o.id = ?    

            GROUP BY
                o.id,
                u.name,
                u.id;
        ", 
        [$userId, $item_id]);

        return response()->json($orderItem[0] ?? null);
    }


    public function getOrdersAdmin () {
        
        $orders = DB::select("
            SELECT 
                o.id,
                o.reference_number,
                u.name AS customer_name,
                o.status,
                o.updated_at
            FROM orders AS o
            INNER JOIN users AS u
                ON u.id = o.user_id
        ");

        return response()->json($orders);
    }


    public function getOrderDataFromAdmin (String $reference_number) {

        $validator = Validator::make(
            ['reference_number' => $reference_number],
            [
                'reference_number' => ['required', 'string', 'exists:orders,reference_number'],
            ]
        );

        $order = DB::select("
            SELECT
                o.id,
                o.reference_number,
                o.status,
                o.created_at,
                o.updated_at,

                COALESCE(SUM(oi.total_price), 0) AS order_total,

                u.name AS customer_name,
                u.id AS user_id,

                COALESCE(
                    (
                        SELECT JSON_AGG(
                            JSON_BUILD_OBJECT(
                                'id', osh.id,
                                'status', osh.status,
                                'updated_at', osh.updated_at
                            )
                            ORDER BY osh.updated_at ASC
                        )
                        FROM order_status_histories AS osh
                        WHERE osh.order_id = o.id
                    ),
                    '[]'::json
                ) AS order_status_histories,

                COALESCE(
                    JSON_AGG(
                        JSON_BUILD_OBJECT(
                            'id', oi.id,
                            'file_url', oi.file_url,
                            'metadata', oi.metadata,
                            'configuration', oi.configuration,
                            'slug', oi.slug,
                            'additional_instruction', oi.additional_instruction,
                            'quantity', oi.quantity,
                            'unit_price', oi.unit_price,
                            'total_price', oi.total_price
                        )
                    ) FILTER (WHERE oi.id IS NOT NULL),
                    '[]'::json
                ) AS order_items

            FROM orders AS o

            LEFT JOIN order_items AS oi
                ON oi.order_id = o.id
            LEFT JOIN users AS u
                ON o.user_id = u.id

            WHERE
                o.reference_number = ?
                
            GROUP BY
                o.id,
                u.name,
                u.id;
        ", [$reference_number]);

        return response()->json($order[0] ?? null);
    }



    public function updateOrderStatus (Request $request) {

        $validated = $request->validate([
            'status' => ['required', Rule::enum(OrderStatus::class)],
            'reference_number' => ['required', 'string', 'exists:orders,reference_number']
        ]);

        
        DB::transaction(function () use ($validated) {
            
            $referenceNumber = $validated['reference_number'];
            $status = $validated['status'];

            $orders = Order::where(
                'reference_number',
                $referenceNumber
            )->firstOrFail();

            DB::update("
                UPDATE orders
                SET 
                    status = ?,
                    updated_at = NOW()
                WHERE reference_number = ?
            ", [$status ,$referenceNumber]);

            DB::insert("
                INSERT INTO order_status_histories
                    (id, order_id, status, updated_at)
                VALUES (?, ?, ?, NOW())
            ", [
                Str::uuid7(),
                $orders->id,
                $status, 
            ]);
        });


        return response()->json([
            'message'=>'status updated',
        ]);
    }
}
