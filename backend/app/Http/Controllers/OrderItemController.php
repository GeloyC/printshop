<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use App\Models\OrderFileItem;
use Illuminate\Http\Request;

class OrderItemController extends Controller
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
            $path = $file->store('/orders/documents', 'r2');
        }

        $orderFileItem = OrderFileItem::create([
            'user_id' => $user_id,
            'file_url' => $path,
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
}
