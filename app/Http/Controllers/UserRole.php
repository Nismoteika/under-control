<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Role;
use App\User;
use \DB;

class UserRole extends Controller
{
    public function index()
    {
        $user_w_roles = DB::table('users')
            ->join('roles', 'users.role_id', '=', 'roles.id')
            ->select('users.id', 'users.name', 'users.username', 'roles.name as role', 'roles.id as role_id')
            ->get();

        return json_encode($user_w_roles);
    }

    public function update($user_id, $role_id)
    {
        $user = User::where('id', $user_id)->first();

        $user->role_id = $role_id;
        
        $res = $user->save();
        if($res) {
            return response()->json(['status' => 'success']);
        } else {
            return response()->json(['status' => 'failed']);
        }
    }
}
