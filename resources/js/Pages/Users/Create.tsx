import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { Portal } from "@radix-ui/react-portal";
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
    roles: string[];
};

export default function Create({ roles }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        username: "",
        password: "",
        password_confirmation: "",
        role: "",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/users");
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-xl font-bold mb-6">Add New User</h1>

            <form onSubmit={submit} className="space-y-5">
                {/* Username */}
                <div className="space-y-1">
                    <Label>Username</Label>
                    <Input
                        value={data.username}
                        onChange={(e) => setData("username", e.target.value)}
                        placeholder="Enter username"
                    />
                    {errors.username && (
                        <p className="text-sm text-red-500">
                            {errors.username}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div className="space-y-1">
                    <Label>Password</Label>
                    <Input
                        type="password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        placeholder="Enter password"
                    />
                    {errors.password && (
                        <p className="text-sm text-red-500">
                            {errors.password}
                        </p>
                    )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-1">
                    <Label>Confirm Password</Label>
                    <Input
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        placeholder="Confirm password"
                    />
                </div>

                {/* Role */}
                <div className="space-y-1">
                    <Label>Role</Label>

                    <Select
                        value={data.role || ""}
                        onValueChange={(value) => setData("role", value)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select role" />
                        </SelectTrigger>

                        <Portal>
                            <SelectContent className="z-[9999]">
                                {roles.map((role) => (
                                    <SelectItem key={role} value={role}>
                                        {role}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Portal>
                    </Select>

                    {errors.role && (
                        <p className="text-sm text-red-500">{errors.role}</p>
                    )}
                </div>

                {/* Submit */}
                <Button type="submit" disabled={processing} className="w-full">
                    {processing ? "Creating..." : "Create User"}
                </Button>
            </form>
        </div>
    );
}
