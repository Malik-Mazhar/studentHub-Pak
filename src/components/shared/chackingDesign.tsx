// First SignUp Design

// "use client"

// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod'; // or 'zod/v4'
// import { signUpSchema } from '@/src/zod-Schemas/signupSchemas';
// import { Button } from "@/components/ui/button"
// import {
//   Field,
//   FieldDescription,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field"
// import { Input } from "@/components/ui/input"
// import axios, { AxiosError } from "axios";
// import { toast } from "sonner"
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { useState } from 'react';
// import { Loader2 } from 'lucide-react';
// import { ApiResponse } from '@/src/types/dataTaype';

// type FormData = z.infer<typeof signUpSchema>

// function page() {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const router = useRouter();

//   const {
//       register,
//       handleSubmit,
//       formState: { errors },
//   } = useForm<FormData>({
//     resolver: zodResolver(signUpSchema)
//   });

//   const onsubmit = async (data: FormData) => {
//     setIsSubmitting(true);

//    try {
//     const response = await axios.post('/api/authentication/sign-up', data);

//     toast('Signup successful!', {
//       position: "top-right",
//       description: <span className="text-black">{response.data?.message}</span>,
//       action: {
//             label: "Undo",
//             onClick: () => console.log("Undo"),
//           },
//     })
//     router.replace(`/verify/${response.data?.username}`);
//     setIsSubmitting(true);
//     // alert("Signup successful! Check your email for verification.");
//    } catch (err: any) {
//       console.error('Error during sign-up:', err);

//       const axiosError = err as AxiosError<ApiResponse>
  
//       let errorMessage = axiosError.response?.data.message;

//         toast('Signup Failed!', {
//           position: "top-right",
//           description: <span className="text-black">{errorMessage}</span>,
//           action: {
//             label: "Undo",
//             onClick: () => console.log("Undo"),
//           },
//         });

        
//       setIsSubmitting(false);

//    }
//   }

//   return (
//    <div className="flex justify-center items-center min-h-screen bg-gray-800"> 
//       <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
//         <div className="text-center">
//           <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
//             SignUp
//           </h1>
//         </div>
//           <form onSubmit={handleSubmit(onsubmit)}>
//             <FieldGroup>
//               <Field>
//                 <FieldLabel htmlFor="fieldgroup-name" className="font-bold">Username</FieldLabel>
//                 <Input 
//                 id="fieldgroup-name" 
//                 placeholder="Enter your username" 
//                 {...register("username")}
//                 />
//                 {errors.username && <p className="text-red-500">{errors.username.message}</p>}
//               </Field>
//               <Field>
//                 <FieldLabel htmlFor="fieldgroup-email" className="font-bold">Email</FieldLabel>
//                 <Input
//                   id="fieldgroup-email"
//                   type="email"
//                   placeholder="name@example.com"
//                   {...register("email")}
//                 />
//                 <FieldDescription>
//                   We&apos;ll send updates to this address.
//                 </FieldDescription>
//                 {errors.email && <p className="text-red-500">{errors.email.message}</p>}
//               </Field>
//               <Field>
//                 <FieldLabel htmlFor="fieldgroup-password" className="font-bold">Password</FieldLabel>
//                 <Input 
//                 id="fieldgroup-password"
//                 placeholder="Enter your password" 
//                 {...register("password")}
//                 />
//                 {errors.password && <p className="text-red-500">{errors.password.message}</p>}
//               </Field>
//               <Field orientation="horizontal" className="pt-5">
                
//                 <Button type="submit" className="w-3/4 m-auto py-4 text-lg font-bold cursor-pointer" disabled={isSubmitting} >
//                   {isSubmitting ? ( 
//                       <>
//                         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                         Please wait
//                       </>
//                     ) : (
//                       'Sign Up'
//                     )}
//               </Button>
//               </Field>
//             </FieldGroup>
//           </form>
//            <div className="text-center mt-4">
//                 <p className="flex">
//                     If you Already a member?
//                     <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
//                     Sign in
//                     </Link>
//                 </p>
//            </div>
//       </div>
//     </div>
//   )
// }

// export default page





//  Second SignUp Design

// import Image from 'next/image'
// import { FcGoogle } from "react-icons/fc";
// import { BsFacebook } from "react-icons/bs";
// import { SiBookstack } from "react-icons/si";
// import { FaUsers } from "react-icons/fa6";

// function page() {
//   return (

//     <div className="min-h-screen bg-[#f4f7fb] flex items-center justify-center p-4">

//   <div className="w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl grid grid-cols-1 lg:grid-cols-2">

//     {/* LEFT SIDE */}
//     <div>
//     <div className="relative hidden lg:block">

//       {/* Background Image */}
//       <Image
//         src="/img/signUp-bg.png"
//         alt="background"
//         fill
//         className="object-cover"
//       />

//       {/* Dark Overlay */}
//       <div className="absolute inset-0 bg-[#032b2c]/70"></div>

//       {/* Content */}
//       <div className="relative z-10 flex h-full flex-col justify-between p-8 text-white">

//         {/* TOP */}
//         <div>

//           {/* Logo */}
//           <div className="flex justify-center items-center gap-2">

//             <div className="relative h-20 w-20">
//               <Image
//                 src="/img/Logoo.png"
//                 alt="logo"
//                 fill
//                 className="object-contain"
//               />
//             </div>

//             <div className="leading-none">
//               <h2 className="text-xl font-bold">
//                 Student Hub
//               </h2>

//               <p className="font-semibold text-green-400">
//                 Pakistan
//               </p>
//             </div>

//           </div>

//           {/* Heading */}
//           {/* <div className="mt-10">

//             <h1 className="flex space-x-10 text-4xl font-bold leading-tight">
//               <span>Learn, </span>
//               <span> Connect.</span>  
//               <span>Grow.</span>    
             
//               <br />
//             </h1>

//             <h1 className='flex space-x-10 text-4xl font-bold leading-tight'>
//               <span className="text-green-400">
//                 Succeed ,  
//               </span>

//                Together.
//             </h1>

//             <p className="mt-6 max-w-xs text-sm leading-6 text-gray-200">
//               Join thousands of students across Pakistan
//               who are learning, sharing and growing together.
//             </p>

//           </div> */}
//             <div className="mt-12">

//               <h1 className="text-5xl font-bold leading-tight text-white">
//                 Learn.
//                 <br />
//                 Connect.
//                 <br />

//                 <span className="text-green-400">
//                   Succeed
//                 </span>

//                 <br />
//                 Together.
//               </h1>

//               <p className="mt-6 max-w-xs text-sm leading-6 text-gray-300">
//                 Join thousands of students across Pakistan
//                 who are learning, sharing and growing together.
//               </p>

//             </div>

//           {/* Stats */}
//           <div className="mt-10 space-y-6">

//             <div className='flex justify-around items-center'>
//               <div className="flex items-center gap-4">

//                 <span className="text-4xl text-indigo-400">
//                   <FaUsers />
//                 </span>

//                 <div>
//                   <h3 className="text-2xl font-bold">
//                     50K+
//                   </h3>

//                   <p className="text-gray-300">
//                     Students
//                   </p>
//                 </div>

//               </div>

//               <div className="flex items-center gap-4">

//                 <span className="text-3xl text-green-400">
//                   <SiBookstack />
//                 </span>

//                 <div>
//                   <h3 className="text-2xl font-bold">
//                     10K+
//                   </h3>

//                   <p className="text-gray-300">
//                     Notes
//                   </p>
//                 </div>

//               </div>
//             </div>

//             <div className='flex justify-around items-center'>
//               <div className="flex items-center gap-4">

//                 <span className="text-3xl text-green-400">
//                   🏫
//                 </span>

//                 <div>
//                   <h3 className="text-2xl font-bold">
//                     500+
//                   </h3>

//                   <p className="text-gray-300">
//                     Online Classes
//                   </p>
//                 </div>

//               </div>

//               <div className="flex items-center gap-4">

//                 <span className="text-3xl text-yellow-400">
//                   💬
//                 </span>

//                 <div>
//                   <h3 className="text-2xl font-bold">
//                     Active
//                   </h3>

//                   <p className="text-gray-300">
//                     Communities
//                   </p>
//                 </div>

//               </div>
//             </div>

//           </div>

//         </div>


//       </div>

//     </div>
      
//     </div>

//     {/* RIGHT SIDE */}
//         <div className="p-2 sm:p-4">

//           <div className="mx-auto max-w-md">

//             <h1 className="text-4xl font-bold text-gray-900 tracking-tight font-serif">
//               Create Your Account
//             </h1>

//             <p className="mt-2 text-sm text-gray-500">
//               Join Student Hub Pakistan today
//             </p>

//             {/* FORM */}
//             <form className="mt-8 space-y-5">

//               {/* Full Name */}
//               <div>
//                 <label className="mb-1 block text-sm font-medium text-gray-700">
//                   Full Name
//                 </label>

//                 <input
//                   type="text"
//                   placeholder="Enter your full name"
//                   className="w-full rounded-md border border-gray-300 px-4 py-1 outline-none focus:border-green-500"
//                 />
//               </div>

//               {/* Email */}
//               <div>
//                 <label className="mb-1 block text-sm font-medium text-gray-700">
//                   Email Address
//                 </label>

//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   className="w-full rounded-md border border-gray-300 px-4 py-1 outline-none focus:border-green-500"
//                 />
//               </div>

//               {/* Password */}
//               <div>
//                 <label className="mb-1 block text-sm font-medium text-gray-700">
//                   Password
//                 </label>

//                 <div className="relative">

//                   <input
//                     type="password"
//                     placeholder="Create a password"
//                     className="w-full rounded-md border border-gray-300 px-4 py-1 pr-12 outline-none focus:border-green-500"
//                   />

//                 </div>
//               </div>

//               {/* Checkbox */}
//               <div className="flex items-start gap-2">

//                 <input
//                   type="checkbox"
//                   className="mt-1"
//                 />

//                 <p className="text-sm text-gray-600">
//                   I agree to the

//                   <span className="cursor-pointer font-medium text-green-600">
//                     {" "}Terms & Conditions
//                   </span>

//                   {" "}and

//                   <span className="cursor-pointer font-medium text-green-600">
//                     {" "}Privacy Policy
//                   </span>

//                 </p>

//               </div>

//               {/* Button */}
//               <button className="w-full rounded-xl bg-linear-to-r from-green-600 to-emerald-500 py-2 font-semibold text-white shadow-lg transition hover:scale-[1.01]">
//                 Sign Up
//               </button>

//             </form>

//             {/* Divider */}
//             <div className="my-6 flex items-center gap-4">

//               <div className="h-px flex-1 bg-gray-300"></div>

//               <span className="text-sm text-gray-500">
//                 or continue with
//               </span>

//               <div className="h-px flex-1 bg-gray-300"></div>

//             </div>

//             {/* Social Login */}
//             <div className="grid grid-cols-2 gap-4">

//               <button className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 py-3 font-medium transition hover:bg-gray-50">
//                 <FcGoogle className='text-3xl'/>
//               </button>

//               <button className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 py-3 font-medium transition hover:bg-gray-50">
//                 <BsFacebook className='text-blue-600 text-3xl'/>
//               </button>

//             </div>

//             {/* Login */}
//             <p className="mt-6 text-center text-sm text-gray-600">
//               Already have an account?

//               <span className="ml-1 cursor-pointer font-semibold text-green-600">
//                 Login
//               </span>
//             </p>

//           </div>

//         </div>


//   </div>

// </div>
//   )
// }

// export default page
