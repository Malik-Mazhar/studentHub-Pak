"use client"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod'; // or 'zod/v4'
import { signUpSchema } from '@/src/zod-Schemas/signupSchemas';
import axios, { AxiosError } from "axios";
import { toast } from "sonner"
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { ApiResponse } from '@/src/types/dataTaype';
import CustomInput from '@/src/components/shared/CustomInput'
import Image from 'next/image'
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { FaApple } from "react-icons/fa6";

type FormData = z.infer<typeof signUpSchema>

function page() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signUpSchema)
  });

  const onsubmit = async (data: FormData) => {
    setIsSubmitting(true);

  try {
    const response = await axios.post('/api/authentication/sign-up', data);

    toast('Signup successful!', {
      position: "top-right",
      description: <span className="text-black">{response.data?.message}</span>,
      action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
    })
    router.replace(`/verify/${response.data?.username}`);
    setIsSubmitting(true);
    // alert("Signup successful! Check your email for verification.");
   } catch (err: any) {
      console.error('Error during sign-up:', err);

      const axiosError = err as AxiosError<ApiResponse>
  
      let errorMessage = axiosError.response?.data.message;

        toast('Signup Failed!', {
          position: "top-right",
          description: <span className="text-black">{errorMessage}</span>,
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });

        
      setIsSubmitting(false);

   }
  }

  return (
<div className="min-h-screen bg-linear-to-br from-cyan-100 via-white to-green-100 flex items-center justify-center">

  {/* Background Card */}
  <div
    className="relative w-full max-w-md md:max-w-full overflow-hidden shadow-2xl"
    style={{
      backgroundImage: "url('/img/signup-backgroun.webp')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >

    {/* Overlay */}
    <div className="bg-black/25 backdrop-blur-[2px] p-5 sm:p-8">

      {/* Form Card */}
      <div className="rounded-3xl md:w-1/2 md:m-auto border border-white/30 bg-white/20 backdrop-blur-xl p-5 sm:p-7">

        {/* Logo */}
        <div className="flex flex-col items-center text-center">

          <div className="relative md:h-20 md:w-20 h-14 w-14">
            <Image
              src="/img/Logoo.png"
              alt="logo"
              fill
              className="object-contain"
            />
          </div>

          <h1 className="mt-3 text-2xl font-bold text-gray-900">
            Create Your Account
          </h1>

          <p className="mt-1 text-sm text-gray-300">
            Start your journey with us
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onsubmit)} className="mt-6 space-y-4" autoComplete="off">

          {/* Full Name */}
          <div>
            <CustomInput 
            label='Full Name' 
            type='text' 
            placeholder='Enter Your Full name' 
            {...register("username")}
            />

            {errors.username && <p className="text-red-900">{errors.username.message}</p>}
          </div>

         {/* Email */}
         <div>
            <CustomInput 
            label='Email' 
            type='email' 
            placeholder='Enter Your email' 
            {...register("email")}
            />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className='pb-8'>
          <CustomInput 
          label='Password' 
          type='password' 
          placeholder='Enter Your password'
          {...register("password")}
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>

          {/* Button */}
          <button type='submit' className="w-full rounded-xl bg-linear-to-r from-green-600 to-emerald-500 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.01]" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ): (
               'Sign Up'
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-300"></div>

          <span className="text-sm text-gray-300">
            or continue with
          </span>

          <div className="h-px flex-1 bg-gray-300"></div>
        </div>

        {/* Social Buttons */}
        <div className="flex items-center justify-center gap-4">

          <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md">
            <FcGoogle className='h-8 w-8' />
          </button>

          <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md">
            <BsFacebook className='h-8 w-8 text-blue-700' />
          </button>

          <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md">
            <FaApple className='h-8 w-8' />
          </button>

        </div>

        {/* Login */}
        <p className="mt-6 text-center text-sm text-gray-400">
          If you Already have an account?
          <span className="ml-1 cursor-pointer font-semibold text-green-400">
            <Link href='/sign-in'>Login</Link>
          </span>
        </p>

        {/* Footer */}
        <p className="mt-4 text-center text-xs text-gray-300">
          By signing up, you agree to our
        </p>

        <div className="mt-1 flex items-center justify-center gap-2 text-xs text-green-400">
          <span className="cursor-pointer hover:underline">
            Terms & Conditions
          </span>

          <span>and</span>

          <span className="cursor-pointer hover:underline">
            Privacy Policy
          </span>
        </div>

      </div>
    </div>
  </div>
</div>
  )
}

export default page

