import { Head, useForm } from "@inertiajs/react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useEffect } from "react";
import { usePage } from "@inertiajs/react";

export default function Login() {
    const { data, setData, post, processing } = useForm({
        username: "",
        password: "",
    });
    const { props } = usePage() as any;

    useEffect(() => {
        if (props.flash?.error) {
            toast.error(props.flash.error);
        }
    }, [props.flash]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/login");
    };

    return (
        <>
            <Head title="Login" />

            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <Card className="w-full max-w-md shadow-lg">
                    <CardHeader>
                        {/* LOGO */}
                        <div className="flex justify-center mb-6">
                            <img
                                src="/images/login.png"
                                alt="Logo"
                                className="h-20 w-auto"
                            />
                        </div>
                        <CardTitle className="text-2xl font-bold text-center">
                            Login
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Email */}
                            <div className="space-y-2">
                                <Label>Username</Label>
                                <Input
                                    placeholder="Username"
                                    value={data.username}
                                    onChange={(e) =>
                                        setData("username", e.target.value)
                                    }
                                />
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <Label>Password</Label>
                                <Input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            {/* Button */}
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={processing}
                            >
                                {processing ? (
                                    <span className="flex items-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Loading...
                                    </span>
                                ) : (
                                    "Login"
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
