<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Orders extends Model
{
    protected $fillable = [
        'nombre',
        'metodo',
        'productos',
        'precio',
        'tipo',
    ];
}