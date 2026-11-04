<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use App\Models\CartItem;
use Illuminate\Http\Request;

class CartItemController extends Controller
{
    //
    public function store (Request $request, String $user_id) {

        $service = DB::table('services')
            ->select('file_requirements')
            ->where('slug', $request->service_slug)
            ->firstOrFail();

        $fileRequirements = json_decode(
            $service->file_requirements,
            true
        ) ?? [];

        $acceptedExtensions = collect($fileRequirements)
            ->pluck('extension')
            ->map(fn ($extension) => ltrim($extension, '.'))
            ->toArray();

        $request->merge([
            'configuration' => json_decode(
                $request->input('configuration', ''),
                true
            ),
        ]);
        
        $validated = $request->validate([
            'configuration' => ['required', 'array'],
            'file' => [
                'required',
                'file',
                'mimes:' . implode(',', $acceptedExtensions),
                'max:20480'
            ],
            'additional_instruction' => ['sometimes', 'string', 'max:5000'],
            'slug' => ['required', 'string'],
            'quantity' => ['required', 'integer', 'min:1'],
            'unit_price' => ['required', 'numeric' ,'decimal:0,2', 'min:1'],
            'total_price' => ['required', 'numeric', 'decimal:0,2']
        ]);

        $file = $validated['file'];
        $path = null;
        if ($file) {
            $path = $file->store('/documents', 'r2');
        }

        $orderFileItem = CartItem::create([
            'user_id' => $user_id,
            'file_url' => $path,
            'metadata' => [
                'file_name' => $file->getClientOriginalName(),
                'file_size' => $file->getSize(),
                'file_type' => $file->getMimeType(),
                'last_modified' => now()->toISOString(), 
            ],
            'configuration' => $validated['configuration'],
            'additional_instruction' => $validated['additional_instruction'] ?? null,
            'slug' => $validated['slug'],
            'quantity' => $validated['quantity'],
            'unit_price' => $validated['unit_price'],
            'total_price' => $validated['total_price'],
        ]);

        return response()->json([
            'message' => 'order saved',
            'data' => $orderFileItem 
        ]);
    } 


    public function index() {

        $orders = CartItem::query()
            ->where('user_id', auth()->id())
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json($orders);
    }

    public function cartItemCount() {

        $cartItemCount = CartItem::query()
            ->where('user_id', auth()->id())
            ->count();

        return response()->json($cartItemCount);
    }

    
    public function addItemQuantity (String $id) {
        $cart_item = CartItem::findOrFail($id);

        $currentQuantity = (int) $cart_item->quantity;
        $unitPrice = (float) $cart_item->unit_price;

        $newQuantity = $currentQuantity + 1;
        $totalPrice = $unitPrice * $newQuantity;

        $cart_item->refresh();

        $cart_item->update([
            'quantity' => $newQuantity,
            'total_price' => $totalPrice
        ]);


        return response()->json($cart_item->fresh());
    }


    public function subtractItemQuantity (String $id) {
        $cart_item = CartItem::findOrFail($id);

        $currentQuantity = (int) $cart_item->quantity;
        $unitPrice = (float) $cart_item->unit_price;

        $newQuantity = $currentQuantity - 1;
        $totalPrice = $unitPrice * $newQuantity;

        $cart_item->refresh();

        $cart_item->update([
            'quantity' => $newQuantity,
            'total_price' => $totalPrice
        ]);


        return response()->json($cart_item->fresh());
    }


    public function destroy (String $id) {

        $validator = Validator::make(
            ['id' => $id],
            [
                'id' => ['required', 'uuid', 'exists:order_file_items,id'],
            ]
        );

        if ($validator->fails()) {
            return reponse()->json([
                'message'=>'invalid id',
                'errors' => $validator->errors(),
            ], 422);
        }

        $file = CartItem::query()
            ->select('file_url')
            ->where('id', $id)
            ->firstOrFail();

        $disk = Storage::disk('r2');
        $disk->delete($file->file_url);

        $deleteItem = CartItem::query()
            ->where('id', $id)
            ->delete($id);

        return response()->json([
            'message'=>'item delete'
        ]);
    }


    public function updateItemConfiguration (Request $request, String $id) {
        $item = CartItem::query()
            ->where('id', $id)
            ->firstOrFail();

        $unitPrice = (float) $item->unit_price;

        $validated = $request->validate([
            'configuration' => ['sometimes', 'array'],
            'additional_instruction' => ['sometimes', 'nullable', 'string'],
            'quantity' => ['sometimes', 'integer', 'min:1']
        ]);

        $quantity = (int) $validated['quantity'];
        $totalPrice = (float) $quantity * $unitPrice;

        $updatedConfiguration = CartItem::query()
            ->where('id', $id)
            ->update([
                'configuration' => $validated['configuration'] ?? null,
                'additional_instruction' => $validated['additional_instruction'] ?? null,
                'quantity' => $validated['quantity'] ?? null,
                'total_price' => $totalPrice

            ]);

        return response()->json([
            'message' => 'configuration updated',
            'data' => $updatedConfiguration
        ]);
    }
}
