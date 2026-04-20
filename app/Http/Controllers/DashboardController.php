<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $users = User::where('is_active', true)
            ->with('roles')
            ->latest()
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'username' => $user->username,
                    'roles' => $user->getRoleNames(),
                ];
            });

        return Inertia::render('Dashboard/LEVEL3/Index', [
            'users' => $users
        ]);
    }
}
