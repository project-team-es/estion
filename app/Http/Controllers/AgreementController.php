<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class AgreementController extends Controller
{
    public function index()
    {
        return Inertia::render('App/Agreement/index');
    }
}
