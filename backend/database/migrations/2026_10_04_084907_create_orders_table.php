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
        // show this on the "My Folder" page
        Schema::create('orders', function (Blueprint $table) {
            $table->uuid('id')
                ->primary()
                ->default(DB::raw('uuidv7()'));
            $table->foreignUuid('user_id')
                ->constrained('users')
                ->nullOnDelete();
            $table->foreignUuid('service_id')
                ->constrained('services')
                ->nullOnDelete();
            $table->string('reference_number');
            $table->string('status', 25)
                ->default("Order placed");
            $table->timestamp('created_at');
            $table->timestamp('updated_at');
        });

        // will be retreived when opening an order item showing the files printed
        Schema::create('order_file_items', function (Blueprint $table) {
            $table->uuid('id')
                ->primary()
                ->default(DB::raw('uuidv7()'));
            $table->foreignUuid('order_id')
                ->constrained('orders');
            $table->string('file_url');
            $table->jsonb('configuration');
            $table->string('slug');
            $table->longtext('additional_instruction')
                ->nullable();
            $table->integer('quantity');
            $table->decimal('unit_price', 10, 2);
            $table->decimal('total_price', 10, 2);
            $table->timestamps();
        });

        Schema::create('order_status_histories', function(Blueprint $table) {
            $table->uuid('id')
                ->primary()
                ->default(DB::raw('uuidv7()'));
            $table->foreignUuid('order_id')
                ->constrained('orders')
                ->nullOnDelete();
            $table->string('status');
            $table->timestamp('changed_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
        Schema::dropIfExists('order_file_items');
        Schemia::dropIfExists('order_status_histories');
    }
};
