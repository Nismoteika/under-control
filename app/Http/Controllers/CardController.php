<?php

namespace App\Http\Controllers;

use App\Models\Card;
use App\Models\Command;
use App\Models\Role;
use \DB;
use Illuminate\Http\Request;

class CardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(request $request, $role_id)
    {
        $role = Role::where('id', $role_id)->first();

        $cards_arr = json_decode($role->cards, true);

        $commands = Command::whereIn('role_id', $cards_arr)->get();

        $cards = DB::table('cards')
            ->join('commands', 'cards.command_id', '=', 'commands.id')
            ->join('devices', 'commands.device_id', '=', 'devices.id')
            ->join('types_cmd', 'commands.type_id', '=', 'types_cmd.id')
            ->whereIn('cards.id', $cards_arr)
            ->select(
                'cards.id',
                'cards.name',
                'commands.topic as topic_cmd',
                'commands.type_id',
                'commands.action',
                'devices.topic as topic_dev',
                'types_cmd.name as type',
                )
            ->get();

        return json_decode($cards);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $role_id)
    {
        $role = Role::where('id', $role_id)->first();

        $card = new Card();
        $card->name = $request->name;
        $card->command_id = $request->command_id;
        $res0 = $card->save();

        //add new card to role
        $role_cards_json = $role->cards;
        $role_cards_arr = json_decode($role_cards_json);
        array_push($role_cards_arr, $card->id);
        $role_cards_json = json_encode($role_cards_arr);
        $role->cards = $role_cards_json;
        $res1 = $role->save();
        if($res0 && $res1) {
            return response()->json(['status' => 'success']);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Card  $card
     * @return \Illuminate\Http\Response
     */
    public function show(Card $card)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Card  $card
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Card $card)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Card  $card
     * @return \Illuminate\Http\Response
     */
    public function destroy(Card $card)
    {
        //
    }
}
