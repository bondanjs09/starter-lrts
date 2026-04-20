<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Log;

class SuperAdminSeeder extends Seeder
{
    public function run(): void
    {
        $username = env('SUPERADMIN_USERNAME', 'superadmin');
        $password = env('SUPERADMIN_PASSWORD', 'password123');

        if (empty($username) || empty($password)) {
            $message = 'You must provide the value for username and password via env file !';

            // Log (optional)
            Log::error($message);

            // Hentikan eksekusi seeder
            throw new \Exception($message);
        }

        // Pastikan role ada
        $role = Role::firstOrCreate(['name' => 'LEVEL3']);

        // Buat / update user
        $user = User::updateOrCreate(
            ['username' => $username],
            [
                'password' => $password, // auto hash
                'is_active' => true,
            ]
        );

        $user->syncRoles([$role->name]);
    }
}
