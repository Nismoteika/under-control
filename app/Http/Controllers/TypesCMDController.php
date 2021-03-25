<?php

namespace App\Http\Controllers;

use App\Models\TypesCMD;
use Illuminate\Http\Request;

class TypesCMDController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return TypesCMD::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\TypesCMD  $typesCMD
     * @return \Illuminate\Http\Response
     */
    public function show(TypesCMD $typesCMD)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\TypesCMD  $typesCMD
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TypesCMD $typesCMD)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TypesCMD  $typesCMD
     * @return \Illuminate\Http\Response
     */
    public function destroy(TypesCMD $typesCMD)
    {
        //
    }
}
