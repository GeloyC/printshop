<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {
            $table->uuid('id')
                ->primary()
                ->default(DB::raw('uuidv7()'));
            $table->string('name');
            $table->longtext('description');
            $table->decimal('base_price', 10, 2);
            $table->text('thumbnail_url');
            $table->jsonb('configuration');
            $table->string('slug');
            $table->boolean('is_active');
            $table->timestamp('created_at');
            $table->timestamp('updated_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
