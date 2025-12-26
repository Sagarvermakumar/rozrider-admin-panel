
'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useLoginMutation } from "@/redux/services/adminApi";
import { toast } from "sonner";

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, { isLoading }] = useLoginMutation();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Attempting login with:", email);
        try {
            const data = await login({ email, password }).unwrap();
            console.log("Login success:", data);
            if (data?.access_token) {
                localStorage.setItem('token', data.access_token);
                // Set cookie for middleware
                document.cookie = `token=${data.access_token}; path=/; max-age=86400; SameSite=Strict`;
                console.log("Token saved to localStorage and Cookie");
            }
            toast.success("Login successful");
            router.push("/dashboard");
        } catch (err: any) {
            console.error("Login Error:", err);
            toast.error(err?.data?.message || JSON.stringify(err) || "Login failed");
        }
    };

    return (
        <div className={cn("flex flex-col gap-6 w-full  ", className)} {...props}>
            {/* ✅ Main container width 80% on lg screens */}
            <Card className="w-full lg:w-[60%] mx-auto overflow-hidden p-0    ">
                <CardContent className="grid p-0 grid-cols-1 md:grid-cols-2 min-h-[400px] ">
                    {/* Left Side (Form) */}
                    <form className="p-6 md:p-8" onSubmit={handleSubmit}>
                        <FieldGroup>
                            <div className="flex flex-col items-center gap-4 text-center">
                                <h1 className="text-2xl font-bold">Welcome back</h1>
                                <p className="text-muted-foreground text-balance">
                                    Login to your <span style={{ color: "#4b5563" }}>Rozzrider</span> account
                                </p>
                            </div>

                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Field>

                            <Field>
                                <div className="flex items-center justify-between">
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Field>

                            <Field>
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? "Logging in..." : "Login"}
                                </Button>
                            </Field>
                        </FieldGroup>
                    </form>

                    {/* Right Side Image */}
                    {/* ✅ Hide on sm screens, show only md+ */}
                    <div className="relative hidden md:block bg-muted">
                        <Image
                            src="/rozauth1.png"
                            alt="Image"
                            width={500}
                            height={500}
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.6] dark:grayscale"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
