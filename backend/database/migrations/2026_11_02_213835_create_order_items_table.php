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
        Schema::create('order_items', function (Blueprint $table) {
            $table->uuid('id')
                ->primary()
                ->default(DB::raw('uuidv7()'));
            $table->foreignUuid('order_id')
                ->constrained('orders')
                ->nullOnDelete();
            $table->foreignUuid('service_id')
                ->constrained('services')
                ->nullOnDelete();
            $table->string('file_url');
            $table->jsonb('metadata');
            $table->jsonb('configuration');
            $table->string('slug');
            $table->longtext('additional_instruction')
                ->nullable();
            $table->integer('quantity');
            $table->decimal('unit_price', 10, 2);
            $table->decimal('total_price', 10, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_items');
    }
};
