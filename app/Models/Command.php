<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Command extends Model
{
    public $timestamps = false;

    public function device()
    {
        return $this->belongsTo('App\Models\Device');
    }
}
