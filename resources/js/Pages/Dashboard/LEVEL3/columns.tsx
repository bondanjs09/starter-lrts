// import { ColumnDef } from "@tanstack/react-table";
// import { router } from "@inertiajs/react";

// export type User = {
//     id: number;
//     username: string;
//     roles: string[];
// };

// export const columns: ColumnDef<User>[] = [
//     {
//         accessorKey: "id",
//         header: "ID",
//     },
//     {
//         accessorKey: "username",
//         header: "Username",
//     },
//     {
//         accessorKey: "roles",
//         header: "Role",
//         cell: ({ row }) => row.original.roles.join(", "),
//     },
//     {
//         id: "actions",
//         header: "Action",
//         cell: ({ row }) => {
//             const user = row.original;

//             return (
//                 <button
//                     onClick={() => router.get(`/users/${user.id}/edit`)}
//                     className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
//                 >
//                     Edit
//                 </button>
//             );
//         },
//     },
// ];

import { ColumnDef } from "@tanstack/react-table";
import { router } from "@inertiajs/react";

import { Button } from "@/components/ui/button";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// ❗ Rename biar tidak conflict dengan Model User (TS error sebelumnya)
export type User = {
    id: number;
    username: string;
    role: string;
};

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "username",
        header: "Username",
    },
    {
        accessorKey: "role",
        header: "Role",
    },

    // ✅ ACTION COLUMN
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const user = row.original;

            return (
                <div className="flex gap-2">
                    {/* EDIT */}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.get(`/users/${user.id}/edit`)}
                    >
                        Edit
                    </Button>

                    {/* DELETE */}
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                                Delete
                            </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Apakah kamu yakin?
                                </AlertDialogTitle>

                                <AlertDialogDescription>
                                    User <b>{user.username}</b> akan dihapus
                                    permanen.
                                </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter>
                                <AlertDialogCancel>Batal</AlertDialogCancel>

                                <AlertDialogAction
                                    onClick={() => {
                                        router.delete(`/users/${user.id}`);
                                    }}
                                >
                                    Ya, Hapus
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            );
        },
    },
];
