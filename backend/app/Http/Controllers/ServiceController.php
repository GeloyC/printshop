<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Service;

class ServiceController extends Controller
{
    // 
    public function index () {

    }

    public function show () {

    }

    public function store (Request $request) {
        // creates a new configuration row 
        $validated = $request->validate([
            'name' => ['required', 'string'],
            'description' => ['reqiured', 'string', 'max:5000'],
            'base_price' => ['required', 'numeric', 'decimal:0,2', 'min:0' ],
            'thumbnail_url' => ['nullable', 'string'],
            'configuration' => ['required', 'array'],
            'slug' => ['required', 'string'],
        ]);

        $name = $validated['name'];
        $description = $validated['description'];
        $base_price = $validated['base_price'];
        $thumbnail_url = $validated['thumbnail_url'];
        $configuration = $validated['configuration'];
        $slug = $validated['slug'];

        $service = Service::create([
            'name' => $name,
            'description' => $description,
            'base_price' => $base_price,
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
