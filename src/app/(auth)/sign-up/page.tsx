// "use client"

// import { signUpSchema } from '../../../zod-Schemas/signupSchemas';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { signUp } from '../../../lib/appwrite/auth';
// import z from 'zod';

// type FormData = z.infer<typeof signUpSchema>

// export default function SignupForm() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>({
//     resolver: zodResolver(signUpSchema)
//   });

//     const onSubmit = async (data: FormData) => {
//     try {
//         await signUp(data.username, data.email, data.password);
//         alert("Signup successful");
//     } catch (err: any) {
//         alert(err.message);
//     }
//     };

//   return (
//      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">

//         <input {...register("username")} placeholder='Username' />
//         {errors.username && <p>{errors.username.message}</p>}

//         <input {...register("email")} placeholder='Email' />
//         {errors.email && <p>{errors.email.message}</p>}

//         <input {...register("password")} placeholder='Password' />
//         {errors.password && <p>{errors.password.message}</p>}

//         <button type="submit">Signup</button>

//      </form>
//   )
// };;



// import React from 'react'
// import { Button } from "@/components/ui/button"
// import {
//   Field,
//   FieldDescription,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field"
// import { Input } from "@/components/ui/input"

// function page() {
//   return (
//     <div className='w-screen h-screen flex bg-[#1D2A33]'>
//       <div className='bg-gray-100 w-1/2 m-auto'>
//       <form action="" className='w-5/6 m-auto'>
//         <h1 className='text-4xl font-extrabold text-center text-black'>SignUp</h1>
//         <div className='py-5'>
//           <FieldGroup>
//             <Field>
//               <FieldLabel htmlFor="fieldgroup-name">Username</FieldLabel>
//               <Input id="fieldgroup-name" placeholder="Enter your username" />
//             </Field>
//             <Field>
//               <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
//               <Input
//                 id="fieldgroup-email"
//                 type="email"
//                 placeholder="name@example.com"
//               />
//               <FieldDescription>
//                 We&apos;ll send updates to this address.
//               </FieldDescription>
//             </Field>
//             <Field>
//               <FieldLabel htmlFor="fieldgroup-password">Password</FieldLabel>
//               <Input id="fieldgroup-password" placeholder="Enter your password" />
//             </Field>
//             <Field orientation="horizontal">
//               <Button type="reset" variant="outline">
//                 Reset
//               </Button>
//               <Button type="submit">Submit</Button>
//             </Field>
//           </FieldGroup>
//         </div>
//       </form>
//       </div>
//     </div>
//   )
// }

// export default page




import React from 'react'

function page() {
  return (
   <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join True Feedback
          </h1>
        </div>
      </div>
    </div>
  )
}

export default page
