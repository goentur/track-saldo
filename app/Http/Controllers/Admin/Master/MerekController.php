<?php

namespace App\Http\Controllers\Admin\Master;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MerekController extends Controller
{
    public function index()
    {
        return inertia('Master/Merek/Index');
    }
}
