<?php

use Illuminate\Database\Seeder;

class TypesCmdSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('types_cmd')->insert([
            'name' => 'GET',
        ]);

        DB::table('types_cmd')->insert([
            'name' => 'SET',
        ]);

        DB::table('types_cmd')->insert([
            'name' => 'TOGGLE',
        ]);
    }
}
