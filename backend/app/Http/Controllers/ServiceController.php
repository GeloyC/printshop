<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
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
            ->firstOrFail();

        return response()->json($service);
    }


    public function getNames () {
        $service = Service::query()
            ->select('id', 'name', 'slug')
            ->get();

        return response()->json($service);
    }


    public function getClientService (String $slug) {

        $service = Service::query() 
            ->select(
                'id', 
                'name',
                'description',
                'file_requirements'
            )
            ->where('slug', $slug)
            ->firstorFail();

        return response()->json($service);
    }


    public function store (Request $request) {
        
        $request->merge([
            'file_requirements' => json_decode(
                $request->input('file_requirements', ''),
                true
            ),
            'configuration' => json_decode(
                $request->input('configuration', ''),
                true
            ),
        ]);

        $validated = $request->validate([
            'name' => ['required', 'string'],
            'description' => ['required', 'string', 'max:5000'],
            'base_price' => ['required', 'numeric', 'decimal:0,2', 'min:0' ],
            'file_requirements' => ['required', 'array'],
            'thumbnail_file' => [
                'nullable',
                'file',
                'mimes:png,jpeg,jpg',
                'max:20480'
            ],
            'configuration' => ['required', 'array'],
            'slug' => ['required', 'string'],
        ]);

        $name = $validated['name'];
        $description = $validated['description'];
        $base_price = $validated['base_price'];
        $file_requirements = $validated['file_requirements'];
        $thumbnail_file = $validated['thumbnail_file'] ?? null;

        $check_exist = Service::query()
            ->where('name', $name)
            ->exists();

        if ($check_exist) {
            return response()->json([
                'message' => 'duplicate service'
            ], 409);
        }

        $path = null;

        if ($thumbnail_file) {
            $path = $thumbnail_file->store('service/thumbnail', 'r2');
        }
        // $url = config('filesystems.disks.r2.url')
        //     .'/'
        //     .$path;

        $configuration = $validated['configuration'];
        $slug = $validated['slug'];

        $service = Service::create([
            'name' => $name,
            'description' => $description,
            'base_price' => $base_price,
            'file_requirements' => $file_requirements,
            'thumbnail_url' => $path,
            'configuration' => $configuration,
            'slug' => $slug
        ]);

        return response()->json([
            'message' => 'new service created successfully',
            'service' => $service,
        ]);
    }




    public function edit () {
        
    }

    public function update (Request $request, String $id) {
        $service = DB::table('services')
            ->where('id', $id)
            ->firstOrFail();

        $request->merge([
            'file_requirements' => json_decode(
                $request->input('file_requirements', ''),
                true
            ),
            'configuration' => json_decode(
                $request->input('configuration', ''),
                true
            ),
        ]);

        $validated = $request->validate([
            'name' => ['sometimes', 'string'],
            'description' => ['sometimes', 'string', 'max:5000'],
            'base_price' => ['sometimes', 'numeric', 'decimal:0,2', 'min:0'],
            'file_requirements' => ['sometimes', 'array'],
            'thumbnail_file' => [
                'sometimes',
                'file',
                'mimes:png,jpeg,jpg',
                'max:20480'
            ],
            'configuration' => ['sometimes', 'array'],
            'slug' => ['sometimes', 'string'],
        ]);

        DB::table('services')
            ->where('id', $id)
            ->update($validated);

        return response()->json([
            'message' => 'service updated successfully',
            'service' => $service
        ]);
    }

    public function destroy (String $id) {

        $validator = Validator::make(
            ['id' => $id],
            [
                'id' => ['required', 'uuid', 'exists:services,id'],
            ]
        );

        if ($validator->fails()) {
            return reponse()->json([
                'message'=>'invalid id',
                'errors' => $validator->errors(),
            ], 422);
        }

        $thumbnail = DB::table('services')
            ->select('thumbnail_url')
            ->where('id', $id)
            ->firstOrFail();

        $disk = Storage::disk('r2');
        $disk->delete($thumbnail->thumbnail_url);

        DB::table('services')
            ->where('id', $id)
            ->delete();

        return response()->json([
            'message' => 'delete service success',
        ]);
    }
}
