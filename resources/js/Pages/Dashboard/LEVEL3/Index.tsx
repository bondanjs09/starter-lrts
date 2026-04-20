import React from "react";
import { router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";

type User = {
    id: number;
    username: string;
    roles: string[];
};

export default function Dashboard({ users }: { users: User[] }) {
    const handleLogout = () => {
        router.post("/logout");
    };
    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Dashboard LEVEL3</h1>

                {/* <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Logout
                </button> */}
                <Button variant="destructive" onClick={handleLogout}>
                    LogOut
                </Button>
            </div>

            {/* Table */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="p-3">ID</th>
                            <th className="p-3">Username</th>
                            <th className="p-3">Role</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="p-4 text-center">
                                    Tidak ada user aktif
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user.id} className="border-t">
                                    <td className="p-3">{user.id}</td>
                                    <td className="p-3">{user.username}</td>
                                    <td className="p-3">
                                        {user.roles.join(", ")}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
