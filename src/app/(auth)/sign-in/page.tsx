'use client';
import { signInSchema } from "@/src/zod-Schemas/signinSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { useForm } from "react-hook-form";
import z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signIn } from 'next-auth/react';
import { account } from "@/src/services/appwrite/config";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";


const page = () => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    type FormData = z.infer<typeof signInSchema>
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(signInSchema),
            defaultValues: {
            identifier: '',
            password: '',
            },
    });

    const onSubmit = async (data: FormData) => {

        try {
            setIsSubmitting(true);

            const result = await signIn("credentials", {
            redirect: false,
            identifier: data.identifier,
            password: data.password
        });

        if(result?.error){
            if(result.error === "CredentialsSignin"){
            toast('Login Failed', {
                position: "top-right",
                description: <span className="text-black">Incorrect username or password</span>,
                action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                },
            });
            }else {
                toast('Login Failed', {
                position: "top-right",
                description: <span className="text-black">{result.error}</span>,
                action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                },
            });
            }
        };
        
        if(result?.ok){               
            toast('Login Successfully', {
            position: "top-right",
            description: <span className="text-black">Congratulations your successfully logIn.</span>,
            action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
            },
        });
        
            router.push("/"); // ya dashboard
        };
            
        } catch (err) {
            toast("Something went wrong");
        } finally {
            setIsSubmitting(false); // 🔥 always reset
        }





    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0b1120] px-4 py-8 sm:px-6">

        <div className="w-full max-w-md rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111827] p-5 sm:p-8 shadow-xl">

            {/* Heading */}
            <div className="text-center mb-7 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Welcome Back
            </h1>

            <p className="mt-2 text-sm sm:text-base text-gray-500 dark:text-gray-400">
                Sign in to continue to StudentHub
            </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>

                {/* Email */}
                <Field>
                <FieldLabel htmlFor="fieldgroup-email" className="font-semibold text-gray-700 dark:text-gray-200">
                    Email
                </FieldLabel>

                <Input
                    id="fieldgroup-email"
                    type="email"
                    placeholder="name@example.com"
                    {...register("identifier")}
                    className="bg-white dark:bg-[#0b1120] border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
                />

                <div className="relative min-h-5">
                    <p className="absolute top-1 left-0 text-xs sm:text-sm text-red-500">
                    {errors.identifier?.message || (error && "Invalid email or password")}
                    </p>
                </div>
                </Field>

                {/* Password */}
                <Field>
                <FieldLabel htmlFor="fieldgroup-password" className="font-semibold text-gray-700 dark:text-gray-200">
                    Password
                </FieldLabel>

                <Input
                    id="fieldgroup-password"
                    type="password"
                    placeholder="Enter your password"
                    {...register("password")}
                    className="bg-white dark:bg-[#0b1120] border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
                />

                <div className="relative min-h-5">
                    <p className="absolute top-1 left-0 text-xs sm:text-sm text-red-500">
                    {errors.password?.message || (error && "Invalid email or password")}
                    </p>
                </div>
                </Field>

                {/* Login Button */}
                <Field orientation="horizontal" className="pt-2">
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-5 rounded-xl text-base sm:text-lg font-bold cursor-pointer bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white transition-colors"
                >
                    {isSubmitting ? (
                    <span className="flex items-center justify-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                    </span>
                    ) : (
                    "Sign In"
                    )}
                </Button>
                </Field>

            </FieldGroup>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            <span className="text-xs text-gray-400 dark:text-gray-500">
                OR CONTINUE WITH
            </span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            </div>

            {/* Google */}
            <div className="flex justify-center">
            <button
                type="button"
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className="flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-md cursor-pointer transition-all"
            >
                <FcGoogle className="h-7 w-7 sm:h-8 sm:w-8" />
            </button>
            </div>

            {/* Sign Up */}
            <div className="text-center mt-7">
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
                Don't have an account?{" "}
                <Link
                href="/sign-up"
                className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                >
                Sign up
                </Link>
            </p>
            </div>

        </div>

        </div>
    )
};

export default page;