<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommandsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('commands', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('topic');
            $table->string('action')->nullable();
            $table->foreignId('role_id')->constrained();
            $table->foreignId('type_id')->constrained('types_cmd');
            $table->foreignId('device_id')->constrained();
            
            $table->unique(['topic', 'action', 'type_id', 'device_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('commands');
    }
}
