"use client"

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { account } from "@/src/services/appwrite/config"; // tumhara Appwrite SDK
import { Controller, useForm } from "react-hook-form";
import { verifySchema } from "@/src/zod-Schemas/verifySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";import { REGEXP_ONLY_DIGITS } from "input-otp"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { ApiResponse } from "@/src/types/dataTaype";
import { Button } from "@react-email/components";
// import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

export default function VerifyPage() {
  const router = useRouter();
    const params = useParams<{username: string}>()

    const {
      register,
      handleSubmit,
      control,
      formState: {errors}
    } = useForm<z.infer<typeof verifySchema>>({
      resolver: zodResolver(verifySchema),
      defaultValues: {
        otp: ""   // ❗ ye zaroori hai
      }
    })


    const onSubmit = async (data: z.infer<typeof verifySchema>) => {
      try {
        const response = await axios.post("/api/authentication/verify-code", {
            username: params.username,
            code: data.otp
         });

        toast('verifycation successfully!', {
          position: "top-right",
          description: <span className="text-black">{response.data?.message}</span>,
          action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
        });
       
         router.replace(`/sign-in`)
      } catch (error) {
        console.error('Error during sign-in:', error);

        const axiosError = error as AxiosError<ApiResponse>;

        toast('verifycation successfully!', {
          position: "top-right",
          description: <span className="text-black">{axiosError.response?.data.message}</span>,
          action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
        });
      }
    }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
            <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                Verify Your Account
            </h1>
            <p className="mb-4">Enter the verification code sent to your email</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col items-center gap-5">

                        <FieldGroup>
                        <div className="flex justify-center">
                            <Controller 
                            name="otp"
                            control={control}
                            render={({field}) => (
                                <InputOTP
                                maxLength={6}
                                value={field.value}
                                onChange={field.onChange}
                                >
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                    <InputOTPSlot index={3} />
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                </InputOTPGroup>
                                </InputOTP>
                            )}
                            />
                        </div>
                        </FieldGroup>

                    <Button className="bg-gray-900 text-gray-100 px-6 py-2 rounded shadow-sm">
                    Verify Otp
                    </Button>

                </div>
            </form>
        </div>
    </div>
  )
};