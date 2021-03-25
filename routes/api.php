<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\DeviceController;
use App\Http\Controllers\CommandController;
use App\Http\Controllers\TypesCmd;
use App\Http\Controllers\CardController;
use App\Http\Controllers\UserRole;
use Laravel\Passport\Http\Controllers\AccessTokenController;


Route::group(['prefix' => 'auth'], function () {
    Route::post('login', 'AuthController@login');
    Route::post('register', 'AuthController@register');
  
    Route::group(['middleware' => 'auth:api'], function() {
        Route::get('logout', 'AuthController@logout');
        Route::get('user', 'AuthController@user');
    });
});


Route::group(['middleware' => 'auth:api'], function() {
    Route::get('/cards/{role_id}', 'CardController@index');
    Route::post('/card/add/{role_id}', 'CardController@store');
    Route::get('/commands/{role_id}', 'CommandController@index');
});

Route::group(['middleware' => ['auth:api', 'scope:admin']], function() {
    Route::post('/device/add', 'DeviceController@store');
    Route::post('/command/add', 'CommandController@store');

    Route::get('/usersrole', 'UserRole@index');
    Route::get('/usersrole/update/{user_id}/{role_id}', 'UserRole@update');
});

Route::get('/roles', 'RoleController@index');
Route::get('/devices', 'DeviceController@index');
Route::get('/typesCmd', 'TypesCMDController@index');




