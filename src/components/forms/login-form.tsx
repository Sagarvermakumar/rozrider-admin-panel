

    import { cn } from "@/lib/utils";
    import { Button } from "@/components/ui/button";
    import { Card, CardContent } from "@/components/ui/card";
    import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
    } from "@/components/ui/field";
    import { Input } from "@/components/ui/input";
    import Link from "next/link";
    import Image from "next/image";

    export function LoginForm({
    className,
    ...props
    }: React.ComponentProps<"div">) {
    return (
        <div className={cn("flex flex-col gap-6 w-full  ", className)} {...props}>
        {/* ✅ Main container width 80% on lg screens */}
        <Card className="w-full lg:w-[60%] mx-auto overflow-hidden p-0    ">
            <CardContent className="grid p-0 grid-cols-1 md:grid-cols-2 min-h-[400px] ">
            {/* Left Side (Form) */}
            <form className="p-6 md:p-8">
                <FieldGroup>
                <div className="flex flex-col items-center gap-4 text-center">
                    <h1 className="text-2xl font-bold">Welcome back</h1>
                    <p className="text-muted-foreground text-balance">
                    Login to your <span style={{color:"#4b5563"}} >Rozzrider</span> account
                    </p>
                </div>

                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    />
                </Field>

                <Field>
                    <Input id="password" type="password" required />
                </Field>

                <Field>
                    <Link href="/dashboard">
                    {" "}
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                    </Link>
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
