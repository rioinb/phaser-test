<?php

namespace App\Models;

use App\Models\Memo;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MemoCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'user_id'
    ];

    public function Memos()
    {
        return $this->hasMany(Memo::class);
    }

    public function User()
    {
        return $this->belongsTo(User::class);
    }
}
