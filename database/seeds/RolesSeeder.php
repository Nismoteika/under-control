<?php

use Illuminate\Database\Seeder;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->insert([
            'name' => 'Администратор',
            'scope' => 'admin',
            'cards' => '[]'
        ]);

        DB::table('roles')->insert([
            'name' => 'Пользователь',
            'scope' => 'user',
            'cards' => '[]'
        ]);

        DB::table('roles')->insert([
            'name' => 'Презентация',
            'scope' => 'presentation',
            'cards' => '[]'
        ]);
    }
}
