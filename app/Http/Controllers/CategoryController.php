<?php

namespace App\Http\Controllers;

use App\Models\MemoCategory;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = auth()->user();
        return MemoCategory::where('user_id', $user->id)->orderBy('created_at', 'DESC')->get();
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
        $Category = MemoCategory::create([
            'user_id' => auth()->user()->id,
            'name' => $request->name
        ]);

        return response()->json(
            $Category
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MemoCategory  $memoCategory
     * @return \Illuminate\Http\Response
     */
    public function show(MemoCategory $memoCategory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MemoCategory  $memoCategory
     * @return \Illuminate\Http\Response
     */
    public function edit(MemoCategory $memoCategory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MemoCategory  $memoCategory
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, MemoCategory $memoCategory)
    {
        $Category = MemoCategory::findOrFail($request->id)->fill([
            'name' => $request->name
        ])->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MemoCategory  $memoCategory
     * @return \Illuminate\Http\Response
     */
    public function destroy(MemoCategory $memoCategory, $id)
    {
        MemoCategory::find($id)->delete();

        return response()->json([]);
    }
}
