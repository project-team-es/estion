<?php

namespace App\Http\Controllers;
use Inertia\Inertia;

use Illuminate\Http\Request;

class AgreementController extends Controller
{
    public function index()
    {
     return Inertia::render('App/Agreement/index');
    }
}
