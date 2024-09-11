<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;

class MenuController extends Controller
{
    public function index()
    {
        return inertia('Master/Menu');
    }
}
