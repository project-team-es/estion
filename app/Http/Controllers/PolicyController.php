<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class PolicyController extends Controller
{
    public function index()
    {
        return Inertia::render('App/Policy/index');
    }
}
