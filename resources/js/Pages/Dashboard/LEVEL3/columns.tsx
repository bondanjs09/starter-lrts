import { ColumnDef } from "@tanstack/react-table";
import { router } from "@inertiajs/react";

export type User = {
    id: number;
    username: string;
    roles: string[];
};

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "username",
        header: "Username",
    },
    {
        accessorKey: "roles",
        header: "Role",
        cell: ({ row }) => row.original.roles.join(", "),
    },
    {
        id: "actions",
        header: "Action",
        cell: ({ row }) => {
            const user = row.original;

            return (
                <button
                    onClick={() => router.get(`/users/${user.id}/edit`)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                    Edit
                </button>
            );
        },
    },
];
