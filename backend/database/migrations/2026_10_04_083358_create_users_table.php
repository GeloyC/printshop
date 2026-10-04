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
        Schema::create('users', function (Blueprint $table) {
            $table->uuid('id')
                ->primary()
                ->default(DB::raw('uuidv7()'));
            $table->string('name', 100);
            $table->string('email', 100)->unique();
            $table->text('profile_url');
            $table->string('password');
            $table->string('role', 50);
            $table->timestamp('created_at');
            $table->timestamp('updated_at');
        });
        

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->uuid('id')
                ->primary()
                ->default(DB::raw('uuidv7()'));
            $table->foreignUuid('user_id')
                ->nullable()
                ->constrained('users');
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longtext('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
