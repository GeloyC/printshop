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
        Schema::create('orders', function (Blueprint $table) {
            $table->uuid('id')
                ->primary()
                ->default(DB::raw('uuidv7()'));
            $table->foreign('user_id')
                ->references('id')
                ->on('users');
            $table->foreign('service_id')
                ->references('id')
                ->on('services');
            $table->string('reference_number');
            $table->string('order_status');
            $table->timestamp('created_at');
            $table->timestamp('updated_at');
        });

        Schema::create('order_items', function (Blueprint $table) {
            $table->uuid('id')
                ->primary()
                ->default(DB::raw('uuidv7()'));
            $table->foriegn('order_id')
                ->references('id')
                ->on('orders');
            $table->string('filename');
            $table->decimal('price', 10, 2);
            $table->jsonb('configuration');
            $table->integer('quantity');
        });

        Schema::create('order_status_histories', function(Blueprint $table) {
            $table->uuid('id')
                ->primary()
                ->default(DB::raw('uuidv7()'));
            $table->foreign('order_id')
                ->references('id')
                ->on('orders');
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
        Schema::dropIfExists('order_items');
        Schemia::dropIfExists('order_status_histories');
    }
};
