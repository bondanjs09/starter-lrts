import React, { useEffect } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type Props = {
    user: any;
    roles: string[];
    userRole: string;
};

export default function Edit({ user, roles, userRole }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        username: user.username || "",
        role: userRole || "",
    });

    const { props } = usePage() as any;

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        put(`/users/${user.id}`, {
            preserveState: true, // 🔥 WAJIB
            preserveScroll: true,

            onError: (errors) => {
                console.log("ERROR:", errors);

                Object.values(errors).forEach((error) => {
                    const message = Array.isArray(error) ? error[0] : error;
                    toast.error(message);
                });
            },
        });
    };

    // ✅ Flash handler (ONLY for success & global message)
    useEffect(() => {
        if (props.flash?.success) {
            toast.success(props.flash.success);
        }

        if (props.flash?.error) {
            toast.error(props.flash.error);
        }

        if (props.flash?.warning) {
            toast.warning(props.flash.warning);
        }

        if (props.flash?.info) {
            toast.info(props.flash.info);
        }
    }, [props.flash]);

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-xl font-bold mb-6">Edit User</h1>

            <form onSubmit={submit} className="space-y-5">
                {/* Username */}
                <div className="space-y-1">
                    <Label>Username</Label>
                    <Input
                        value={data.username}
                        onChange={(e) => setData("username", e.target.value)}
                    />
                    {errors.username && (
                        <p className="text-sm text-red-500">
                            {errors.username}
                        </p>
                    )}
                </div>

                {/* Role */}
                <div className="space-y-1">
                    <Label>Role</Label>

                    <Select
                        value={data.role || ""}
                        onValueChange={(value) => setData("role", value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                        </SelectTrigger>

                        <SelectContent>
                            {roles.map((role) => (
                                <SelectItem key={role} value={role}>
                                    {role}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {errors.role && (
                        <p className="text-sm text-red-500">{errors.role}</p>
                    )}
                </div>

                {/* Submit */}
                <Button type="submit" disabled={processing} className="w-full">
                    {processing ? "Updating..." : "Update User"}
                </Button>
            </form>
        </div>
    );
}
