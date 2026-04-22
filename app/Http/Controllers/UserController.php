<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Carbon;
use Illuminate\Validation\Rule;

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
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => [
                'required',
                'string',
                'max:255',
                Rule::unique('users', 'username')
                    ->where(function ($query) {
                        return $query->where('is_active', 1); // 🔥 hanya cek yg aktif
                    }),
            ],
            'password' => ['required', 'confirmed', 'min:6'],
            'role' => ['required', 'in:LEVEL1,LEVEL2'],
        ]);

        // ❌ VALIDATION FAIL → flash
        if ($validator->fails()) {
            $firstError = collect($validator->errors()->all())->first();

            return redirect()
                ->back()
                ->with('error', $firstError);
        }

        // ✅ SUCCESS
        $validated = $validator->validated();

        $user = User::create([
            'username' => $validated['username'],
            'password' => bcrypt($validated['password']),
            'is_active' => 1,
        ]);

        $user->assignRole($validated['role']);

        return redirect()
            ->route('dashboard.level3')
            ->with('success', 'User berhasil ditambahkan.');
    }

    /**
     * Show edit user page
     */
    public function edit(User $user)
    {
        if ($user->hasRole('LEVEL3')) {
            return redirect()
                ->route('dashboard.level3')
                ->with('error', 'User LEVEL3 tidak bisa diedit.');
        }

        return Inertia::render('Users/Edit', [
            'user' => $user,
            'roles' => ['LEVEL1', 'LEVEL2'],
            'userRole' => $user->roles->pluck('name')->first(),
        ]);
    }

    /**
     * Update user
     */
    public function update(Request $request, User $user): RedirectResponse
    {
        // ❌ Cegah edit LEVEL3
        if ($user->hasRole('LEVEL3')) {
            return redirect()
                ->route('dashboard.level3')
                ->with('error', 'User LEVEL3 tidak bisa diedit.');
        }

        // VALIDATION
        $validator = Validator::make($request->all(), [
            'username' => [
                'required',
                'string',
                'max:255',
                Rule::unique('users', 'username')
                    ->ignore($user->id)
                    ->where(function ($query) {
                        return $query->where('is_active', 1);
                    }),
            ],
            'role' => ['required', 'in:LEVEL1,LEVEL2'],
        ]);

        if ($validator->fails()) {
            $firstError = collect($validator->errors()->all())->first();

            return redirect()
                ->route('users.edit', $user->id)
                ->with('error', $firstError);
        }

        $validated = $validator->validated();

        $user->update([
            'username' => $validated['username'],
        ]);

        $user->syncRoles([$validated['role']]);

        return redirect()
            ->route('dashboard.level3')
            ->with('success', 'User berhasil diupdate.');
    }

    /**
     * Delete user
     */
    public function destroy(User $user): RedirectResponse
    {
        // ❌ Cegah hapus LEVEL3
        if ($user->hasRole('LEVEL3')) {
            return redirect()
                ->back()
                ->with('error', 'User LEVEL3 tidak bisa dihapus.');
        }

        // ❌ Cegah double delete
        if (!$user->is_active) {
            return redirect()
                ->back()
                ->with('warning', 'User sudah tidak aktif.');
        }

        // ✅ Soft delete custom
        $user->update([
            'is_active' => 0,
            'deleted_at' => Carbon::now(),
        ]);

        return redirect()
            ->route('dashboard.level3')
            ->with('success', 'User berhasil dinonaktifkan.');
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
