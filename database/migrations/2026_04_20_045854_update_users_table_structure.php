<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {

            // Rename name → username
            $table->renameColumn('name', 'username');

            // Drop kolom email & email_verified_at
            $table->dropColumn(['email', 'email_verified_at']);

            // Tambah is_active
            $table->boolean('is_active')->default(true);

            // Soft delete
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {

            $table->renameColumn('username', 'name');

            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();

            $table->dropColumn('is_active');

            $table->dropSoftDeletes();
        });
    }
};
