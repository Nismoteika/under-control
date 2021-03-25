<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\User;
use App\Models\Role;
use Laravel\Passport\Passport;

class AuthController extends Controller
{
    /**
     * Create user
     *
     * @param  [string] name
     * @param  [string] username
     * @param  [string] password
     * @param  [string] password_confirmation
     * @return [string] message
     */
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'username' => 'required|string|unique:users',
            'password' => 'required|string|confirmed'
        ]);
        
        $user = new User([
            'name' => $request->name,
            'username' => $request->username,
            'password' => bcrypt($request->password),
            'role_id' => 2 //hardcode user role
        ]);
        $user->save();

        return response()->json([
            'message' => 'Пользователь успешно создан'
        ], 201);
    }
  
    /**
     * Login user and create token
     *
     * @param  [string] username
     * @param  [string] password
     * @return [string] access_token
     * @return [string] token_type
     * @return [string] expires_at
     */
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        $credentials = request(['username', 'password']);

        if(!Auth::attempt($credentials))
            return response()->json([
                'message' => 'Не авторизован'
            ], 401);
        
        $user = $request->user();
        $role = Role::where('id', $user->role_id)->first();

        $tokenResult = $user->createToken('Personal Access Token', [$role->scope]);
        
        $token = $tokenResult->token;
        $token->expires_at = Carbon::now()->addWeeks(1);

        $token->save();

        return response()->json([
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString(),
            $user
        ]);
    }
  
    /**
     * Logout user (Revoke the token)
     *
     * @return [string] message
     */
    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        
        return response()->json([
            'message' => 'Успешно вышли из системы'
        ]);
    }
  
    /**
     * Get the authenticated User
     *
     * @return [json] user object
     */
    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}
