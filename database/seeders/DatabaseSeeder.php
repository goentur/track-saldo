<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Role::create(['name' => 'pemilik']);
        Role::create(['name' => 'pegawai']);
        Role::create(['name' => 'developer']);

        $userDeveloper = User::factory()->create([
            'zona_waktu_id' => 1,
            'email' => 'dev@mail.com',
            'name' => 'Developer',
            'password' => bcrypt('a')
        ]);
        $userDeveloper->assignRole('developer');
    }
}
