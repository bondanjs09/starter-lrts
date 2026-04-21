<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Handle login request
     */
    public function login(Request $request): RedirectResponse
    {
        // Validasi input
        $credentials = $request->validate([
            'username' => ['required'],
            'password' => ['required'],
        ]);

        // Attempt login
        if (!Auth::attempt($credentials)) {
            return redirect()
                ->route('login')
                ->with('error', 'Invalid credential.');
        }

        // Regenerate session (security)
        $request->session()->regenerate();

        $user = Auth::user();

        /*
        |--------------------------------------------------------------------------
        | Redirect berdasarkan role (opsional tapi direkomendasikan)
        |--------------------------------------------------------------------------
        */

        if ($user->hasRole('LEVEL3')) {
            return redirect()->route('dashboard.level3');
        }

        // Default redirect
        return redirect()->route('dashboard.level3');
    }

    /**
     * Handle logout
     */
    public function logout(Request $request): RedirectResponse
    {
        Auth::logout();

        // Invalidate session
        $request->session()->invalidate();

        // Regenerate CSRF token
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }
}
