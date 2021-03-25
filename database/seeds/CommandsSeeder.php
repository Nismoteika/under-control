<?php

use Illuminate\Database\Seeder;

class CommandsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('commands')->insert([
            'name' => 'Свет центральная линия',
            'topic' => '/rele16',
            'action' => '1',
            'role_id' => 1,
            'type_id' => 3,
            'device_id' => 1
        ]);

        DB::table('commands')->insert([
            'name' => 'Свет сцены',
            'topic' => '/rele14',
            'action' => '1',
            'role_id' => 1,
            'type_id' => 3,
            'device_id' => 1
        ]);

        DB::table('commands')->insert([
            'name' => 'Свет правая часть',
            'topic' => '/rele13',
            'action' => '1',
            'role_id' => 1,
            'type_id' => 3,
            'device_id' => 1
        ]);

        DB::table('commands')->insert([
            'name' => 'Свет левая часть',
            'topic' => '/rele12',
            'action' => '1',
            'role_id' => 1,
            'type_id' => 3,
            'device_id' => 1
        ]);

        DB::table('commands')->insert([
            'name' => 'Предыдущий слайд',
            'topic' => '/laptop/slides',
            'action' => 'prev',
            'role_id' => 3,
            'type_id' => 2,
            'device_id' => 2
        ]);

	
        DB::table('commands')->insert([
            'name' => 'Следующий слайд',
            'topic' => '/laptop/slides',
            'action' => 'next',
            'role_id' => 3,
            'type_id' => 2,
            'device_id' => 2
        ]);


        DB::table('commands')->insert([
            'name' => 'Воспроизвести-пауза',
            'topic' => '/laptop/audio',
            'action' => 'play-pause',
            'role_id' => 3,
            'type_id' => 2,
            'device_id' => 2
        ]);

        DB::table('commands')->insert([
            'name' => 'Следующий трек',
            'topic' => '/laptop/audio',
            'action' => 'next-track',
            'role_id' => 3,
            'type_id' => 2,
            'device_id' => 2
        ]);

        DB::table('commands')->insert([
            'name' => 'Предыдущий трек',
            'topic' => '/laptop/audio',
            'action' => 'prev-track',
            'role_id' => 3,
            'type_id' => 2,
            'device_id' => 2
        ]);


        DB::table('commands')->insert([
            'name' => 'Температура за окном',
            'topic' => '/temp',
            'action' => 'get',
            'role_id' => 2,
            'type_id' => 1,
            'device_id' => 3
        ]);


        DB::table('commands')->insert([
            'name' => 'Влажность за окном',
            'topic' => '/humidity',
            'action' => 'get',
            'role_id' => 2,
            'type_id' => 1,
            'device_id' => 3
        ]);
    }
}
