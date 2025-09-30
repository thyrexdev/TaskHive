"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import AuthLayout from "@/components/auth/authLayout";
import {useAuthStore} from "@/store/auth";

const formSchema = z.object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
    const {login, user, error} = useAuthStore();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {email: "", password: ""},
    });

    useEffect(() => {
        if (user) {
            router.push("/dashboard");
        }
    }, [user, router]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        try {
            await login(values.email, values.password);
            router.push("/dashboard");
        } catch {
            form.setError("password", {
                message: error || "Invalid email or password",
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthLayout
            title="Welcome back"
            footer={
                <>
                    Don’t have an account?{" "}
                    <a
                        href="/register"
                        className="underline underline-offset-2 hover:text-primary"
                    >
                        Sign up
                    </a>
                </>
            }
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="you@example.com"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="********" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </Button>
                </form>
            </Form>
        </AuthLayout>
    );
}


