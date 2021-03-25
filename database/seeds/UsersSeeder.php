<?php

use Illuminate\Database\Seeder;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Admin',
            'username' => 'Admin',
            'password' => Hash::make('admin'),
            'role_id' => 1
        ]);

        DB::table('users')->insert([
            'name' => 'Павел',
            'username' => 'Paul',
            'password' => Hash::make('paul'),
            'role_id' => 2
        ]);

        DB::table('users')->insert([
            'name' => 'Вася',
            'username' => 'Vasia',
            'password' => Hash::make('vasia'),
            'role_id' => 3
        ]);
    }
}
