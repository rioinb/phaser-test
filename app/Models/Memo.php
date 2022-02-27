<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Memo extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'text',
    ];


    public function User()
    {
        return $this->belongsTo(User::class);
    }
}
