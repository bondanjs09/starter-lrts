import React from "react";
import { router } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { columns, User } from "./columns";

type Props = {
    users: User[];
};

export default function Dashboard({ users }: { users: User[] }) {
    const { props } = usePage() as any;
    const handleLogout = () => {
        router.post("/logout");
    };

    useEffect(() => {
        if (props.flash?.success) {
            toast.success(props.flash.success);
        }
    }, [props.flash]);

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Dashboard LEVEL3</h1>
                <div className="flex gap-2">
                    <Button
                        variant="default"
                        onClick={() => router.get("/users/create")}
                    >
                        Add New User
                    </Button>
                    <Button variant="destructive" onClick={handleLogout}>
                        LogOut
                    </Button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <DataTable columns={columns} data={users} />
            </div>
        </div>
    );
}
