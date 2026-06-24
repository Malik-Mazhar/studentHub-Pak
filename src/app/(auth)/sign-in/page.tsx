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
        <div className="flex justify-center items-center min-h-screen bg-gray-800"> 
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                    LogIn
                </h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="fieldgroup-email" className="font-bold">Email</FieldLabel>
                        <Input
                        id="fieldgroup-email"
                        type="email"
                        placeholder="name@example.com"
                        {...register("identifier")}
                        />
                        {/* //dobara anna he error handling k liye */}
                        <div className="relative">
                        <p className="absolute text-red-500 text-sm top-full left-0">
                            {errors.identifier && errors.identifier.message || error && "Invalid email or password"}
                        </p>
                        </div>

                    </Field>
                    <Field>
                        <FieldLabel htmlFor="fieldgroup-password" className="font-bold">Password</FieldLabel>
                        <Input 
                        id="fieldgroup-password"
                        placeholder="Enter your password" 
                        {...register("password")}
                        />
                        {/* {errors.password && <p className="text-red-500">{}</p>} */}
                        <div className="relative">
                        <p className="absolute text-red-500 text-sm top-full left-0">
                            {errors.password && errors.password.message || error && "Invalid email or password"}
                        </p>
                        </div>
                    </Field>
                    <Field orientation="horizontal" className="pt-5">
                        
                        <Button type="submit" disabled={isSubmitting} className="w-3/4 m-auto py-4 text-lg font-bold cursor-pointer">
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </>
                            ) : (
                            'Sign In'
                        )}
                        </Button>
                    </Field>
                    </FieldGroup>
                </form>
                <div className="text-center mt-4">
                    <p className="flex">
                        Create New Account?
                        <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
                        Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
};

export default page;