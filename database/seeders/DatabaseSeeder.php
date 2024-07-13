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

        $userDeveloper = User::factory()->create([
            'name' => 'Developer',
            'email' => 'dev@mail.com',
            'password' => bcrypt('a')
        ]);
        $userDeveloper->assignRole('pemilik');
    }
}
