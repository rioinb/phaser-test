<?php

namespace App\Http\Controllers;

use App\Models\Memo;
use Illuminate\Http\Request;

class MemoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = auth()->user();
        return Memo::where('user_id', $user->id)->orderBy('created_at', 'DESC')->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // return $request;
        $Memo = Memo::create([
            'user_id' => auth()->user()->id,
            'text' => $request->text,
            'category_id' => $request->category_id
            ]);
        return response()->json(
            $Memo
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Memo  $memo
     * @return \Illuminate\Http\Response
     */
    public function show($category_id)
    {
        $user = auth()->user();
        $memos = Memo::where('user_id', $user->id)->where('category_id', $category_id)->orderBy('created_at', 'DESC')->get()->toArray();
        return $memos;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Memo  $memo
     * @return \Illuminate\Http\Response
     */
    public function edit(Memo $memo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Memo  $memo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Memo $memo)
    {
        $Memo = Memo::findOrFail($request->id)->fill([
            'text' => $request->text
        ])->save();

        $user = auth()->user();
        $memos = Memo::where('user_id', $user->id)->orderBy('created_at', 'DESC')->get()->toArray();
        return $memos;

        // return response()->json(
        //     $Memo
        // );

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Memo  $memo
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Memo::where('id', $id)->delete();
        return response()->json([]);
    }
}
