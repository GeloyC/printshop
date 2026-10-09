<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use RuntimeException;
use App\Models\User;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $email = config('admin.email');
        $password = config('admin.password');
        $name = config('admin.name');

        if (!$email || !$password) {
            throw new RuntimException(
                'ADMIN_EMAIL and ADMIN_PASSWORD must be configured'
            );
        }

        User::firstOrCreate(
            ['email' => $email],
            [
                'name' => $name,
                'password' => Hash::make($password),
                'role' => 'admin'
            ]
        );
    }
}
