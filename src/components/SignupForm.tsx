"use client"

import { signUpSchema } from '../zod-Schemas/signupSchemas';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUp } from '../lib/appwrite/auth';
import z from 'zod';

type FormData = z.infer<typeof signUpSchema>

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signUpSchema)
  });

    const onSubmit = async (data: FormData) => {
    try {
        await signUp(data.username, data.email, data.password);
        alert("Signup successful");
    } catch (err: any) {
        alert(err.message);
    }
    };

  return (
     <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">

        <input {...register("username")} placeholder='Username' />
        {errors.username && <p>{errors.username.message}</p>}

        <input {...register("email")} placeholder='Email' />
        {errors.email && <p>{errors.email.message}</p>}

        <input {...register("password")} placeholder='Password' />
        {errors.password && <p>{errors.password.message}</p>}

        <button type="submit">Signup</button>

     </form>
  )
}