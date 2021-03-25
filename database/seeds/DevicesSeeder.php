<?php

use Illuminate\Database\Seeder;

class DevicesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('devices')->insert([
            'name' => 'Контроллер света',
            'topic' => '/lights'
        ]);

        DB::table('devices')->insert([
            'name' => 'Настольный компьютер',
            'topic' => '/comp'
        ]);

        DB::table('devices')->insert([
            'name' => 'Датчик температуры на улице',
            'topic' => '/outdoor'
        ]);
    }
}
