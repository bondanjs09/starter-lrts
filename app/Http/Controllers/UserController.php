<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display list of users
     */
    public function index(): Response
    {
        $users = User::with('roles')
            ->latest()
            ->paginate(10)
            ->through(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'roles' => $user->getRoleNames(),
                ];
            });

        return Inertia::render('Users/Index', [
            'users' => $users,
        ]);
    }

    /**
     * Show create user page
     */
    public function create(): Response
    {
        $roles = Role::whereIn('name', ['LEVEL1', 'LEVEL2'])
            ->pluck('name');

        return Inertia::render('Users/Create', [
            'roles' => $roles
        ]);
    }

    /**
     * Store new user
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'username' => ['required', 'unique:users,username'],
            'password' => ['required', 'min:6', 'confirmed'],
            'role' => ['required', 'in:LEVEL1,LEVEL2'],
        ]);

        $user = User::create([
            'username' => $validated['username'],
            'password' => $validated['password'], // auto hash
            'is_active' => true,
        ]);

        $user->assignRole($validated['role']);

        return redirect()
            ->route('dashboard.level3')
            ->with('success', 'User registered successfully.');
    }

    /**
     * Show edit user page
     */
    public function edit(User $user)
    {
        $roles = Role::whereIn('name', ['LEVEL1', 'LEVEL2'])
            ->pluck('name')
            ->values();

        return Inertia::render('Users/Edit', [
            'user' => $user,
            'roles' => $roles,
            'userRole' => $user->getRoleNames()->first(),
        ]);
    }

    /**
     * Update user
     */
    public function update(Request $request, User $user)
    {
        $validator = Validator::make($request->all(), [
            'username' => ['required', 'string', 'max:255', 'unique:users,username,' . $user->id],
            'role' => ['required', 'in:LEVEL1,LEVEL2'],
        ]);

        // ❌ VALIDATION FAIL → pakai flash
        if ($validator->fails()) {
            $firstError = collect($validator->errors()->all())->first();

            return redirect()
                ->back()
                ->with('error', $firstError);
        }

        // ✅ VALIDATION SUCCESS
        $validated = $validator->validated();

        $user->update([
            'username' => $validated['username'],
        ]);

        $user->syncRoles([$validated['role']]);

        return redirect()
            ->route('dashboard.level3')
            ->with('success', 'User berhasil diupdate');
    }

    /**
     * Delete user
     */
    public function destroy(User $user): RedirectResponse
    {
        // Optional: jangan hapus superadmin
        if ($user->hasRole('superadmin')) {
            return back()->withErrors([
                'error' => 'Superadmin tidak bisa dihapus.'
            ]);
        }

        $user->delete();

        return redirect()->route('users.index')
            ->with('success', 'User berhasil dihapus.');
    }

    /**
     * Reset password oleh admin
     */
    public function resetPassword(User $user): RedirectResponse
    {
        $user->update([
            'password' => 'password123', // auto hashed
        ]);

        return back()->with('success', 'Password berhasil direset ke default.');
    }
}
