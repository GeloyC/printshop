<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Service;

class ServiceController extends Controller
{
    // 
    public function index () {
        // retrieve all service
        $service = Service::query()
            ->select(
                'id',
                'thumbnail_url',
                'name',
                'file_requirements',
                'slug',
                'created_at',
                'base_price'
            )->get();

        return response()->json($service);
    }

    public function show (string $slug) {
        // retrieve a service base on id

        if (!$slug) {
            return reponse()->json([
                'message' => 'invalid id',
            ]);
        }

        $service = DB::table('services')
            ->select(
                'id',
                'thumbnail_url',
                'name',
                'description',
                'base_price',
                'file_requirements',
                'configuration',
                'created_at',
                'updated_at'
            )
            ->where('slug', $slug)
            ->first();

        return response()->json($service);
    }


    public function getNames () {
        $service = Service::query()
            ->select('id', 'name', 'slug')
            ->get();

        return response()->json($service);
    }

    public function store (Request $request) {
        // creates a new configuration row 
        $validated = $request->validate([
            'name' => ['required', 'string'],
            'description' => ['required', 'string', 'max:5000'],
            'base_price' => ['required', 'numeric', 'decimal:0,2', 'min:0' ],
            'file_requirements' => ['required', 'array'],
            'thumbnail_url' => ['nullable', 'string'],
            'configuration' => ['required', 'array'],
            'slug' => ['required', 'string'],
        ]);

        $name = $validated['name'];
        $description = $validated['description'];
        $base_price = $validated['base_price'];
        $file_requirements = $validated['file_requirements'];
        $thumbnail_url = $validated['thumbnail_url'];
        $configuration = $validated['configuration'];
        $slug = $validated['slug'];

        $service = Service::create([
            'name' => $name,
            'description' => $description,
            'base_price' => $base_price,
            'file_requirements' => $file_requirements,
            'thumbnail_url' => $thumbnail_url,
            'configuration' => $configuration,
            'slug' => $slug
        ]);

        return response()->json([
            'message' => 'new service created successfully'
        ]);
    }

    public function edit () {

    }

    public function update () {

    }

    public function destroy () {

    }
}
