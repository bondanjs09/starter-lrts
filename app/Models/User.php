<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasRoles, SoftDeletes;

    /*
    |--------------------------------------------------------------------------
    | Guard Name (Spatie)
    |--------------------------------------------------------------------------
    */
    protected $guard_name = 'web';

    /*
    |--------------------------------------------------------------------------
    | Mass Assignment
    |--------------------------------------------------------------------------
    */
    protected $fillable = [
        'username',
        'password',
        'is_active',
    ];

    /* Soft Deletes conf */
    protected $dates = ['deleted_at'];

    /*
    |--------------------------------------------------------------------------
    | Hidden Attributes
    |--------------------------------------------------------------------------
    */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /*
    |--------------------------------------------------------------------------
    | Attribute Casting
    |--------------------------------------------------------------------------
    */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed', // otomatis hash saat set
    ];

    /*
    |--------------------------------------------------------------------------
    | Accessor: Roles (untuk Inertia / React)
    |--------------------------------------------------------------------------
    */
    public function getRoleNamesAttribute()
    {
        return $this->getRoleNames();
    }

    /*
    |--------------------------------------------------------------------------
    | Helper: Check Role (opsional)
    |--------------------------------------------------------------------------
    */
    public function isSuperAdmin(): bool
    {
        return $this->hasRole('superadmin');
    }
}
