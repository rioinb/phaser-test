<?php

namespace App\Models;

use App\Models\User;
use App\Models\MemoCategory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Memo extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'text',
        'category_id'
    ];


    public function User()
    {
        return $this->belongsTo(User::class);
    }

    public function Category()
    {
        return $this->belongsTo(MemoCategory::class);
    }
}
