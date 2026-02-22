<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class QaController extends Controller
{
    public function index()
    {
        return Inertia::render('App/Qa/index');
    }
}
