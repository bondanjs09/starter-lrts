<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{

    public function index(): Response
    {
        $users = User::with('roles')
            ->where('is_active', 1)
            ->orderBy('username', 'asc')
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'username' => $user->username,
                    'role' => $user->roles->pluck('name')->first(), // ambil 1 role
                ];
            });

        return Inertia::render('Dashboard/LEVEL3/Index', [
            'users' => $users,
        ]);
    }
}
