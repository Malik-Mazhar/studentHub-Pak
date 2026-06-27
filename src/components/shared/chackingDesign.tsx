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







// Profile Design component

"use client"

// import Sidebar from "@/src/components/shared/app-sidebar"
// import CustomButton from "@/src/components/shared/CustomButton"
// import { FiEdit3 } from "react-icons/fi";
// import { HiDotsHorizontal } from "react-icons/hi";
// import { IoLocationOutline } from "react-icons/io5";
// import { CgCalendarDates } from "react-icons/cg";
// import { useState } from "react";
// import Image from "next/image";
// import { FaHeart, FaRegBookmark, FaRegComment, FaShare } from "react-icons/fa6";
// import { FaCheckCircle } from "react-icons/fa";


// function page() {
//   const [activeTab, setActiveTab] = useState("Overview");
//   const profileTabs = ["OverView", "Posts", "Notes", "Groups", "Activity", "Bookmarks"];
//   const allTabs = [
//     {
//       key: "OverView",
//       title: "About Me",
//       content: "This is overview page content"
//     },
//     {
//       key: "Posts",
//       title: "My Posts",
//       content: "This is post page content"
//     },
//     {
//       key: "Notes",
//       title: "Study Notes",
//       content: "This is notes page containyt"
//     },
//     {
//       key: "Groups",
//       title: "My Groups",
//       content: "This is notes page containyt"
//     },
//     {
//       key: "Activity",
//       title: "Recent Activity",
//       content: "This is notes page containyt"
//     },
//         {
//       key: "Bookmarks",
//       title: "Saved Items",
//       content: "This is notes page containyt"
//     }
//   ];

//   const selectTabs = allTabs.find((x) => x.key == activeTab);

//   const posts = [
//     {
//       key: 1,
//       profileImg: "/img/defaultProfile.JFIF",
//       userName: "Ahmad Raza",
//       content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit autem voluptate atque consectetur error ipsum?"
//     },
//     {
//       key: 2,
//       profileImg: "/img/defaultProfile.JFIF",
//       userName: "Ahmad Raza",
//       content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit autem voluptate atque consectetur error ipsum?"
//     },
//     {
//       key: 3,
//       profileImg: "/img/defaultProfile.JFIF",
//       userName: "Ahmad Raza",
//       content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit autem voluptate atque consectetur error ipsum?"
//     }
//   ];

//   const user = {
//   profilePicture: "image.jpg",
//   coverPhoto: "cover.jpg",
//   bio: "I am a developer",
//   education: "",
//   skills: ["React", "Node.js"],
//   socialLinks: ""
//   };

//   const tasks = [
//     {
//       label: "Add Profile Picture",
//       completed: !!user.profilePicture,
//     },
//     {
//       label: "Add Cover Photo",
//       completed: !!user.coverPhoto,
//     },
//     {
//       label: "Add Bio",
//       completed: !!user.bio,
//     },
//     {
//       label: "Add Education",
//       completed: !!user.education,
//     },
//     {
//       label: "Add Skills",
//       completed: user.skills?.length > 0,
//     },
//     {
//       label: "Add Social Links",
//       completed: !!user.socialLinks,
//     },
//   ];

//   const completedCount = tasks.filter(
//   task => task.completed
// ).length;

// const percentage = (completedCount / tasks.length) * 100;

//   return (
//     <div className="flex gap-6">
//        <Sidebar />
//           <div className="max-w-[60%]">
//             <div className="relative">

//               {/* Banner */}
//               <Image
//                 src="/img/profileBanner.png"
//                 alt="banner"
//                 width={1133}
//                 height={333}
//                 className="w-full rounded-t-2xl"
//               />

//               {/* Profile Image */}
//               <div className="absolute left-6 -bottom-14">
//                 <img
//                   src="/img/defaultProfile.JFIF"
//                   alt="profile"
//                   className="w-28 h-28 rounded-full border-4 border-white"
//                 />
//               </div>

//             </div>



//             <div className="bg-white rounded-2xl shadow-sm px-6 pt-3 pb-5">

//               <div className="flex items-start gap-3 pl-16 ml-15">

//                 <div className="flex-1">
//                   <div className="flex items-center gap-3 pb-2">
//                     <h1 className="text-xl font-bold">
//                       Ahmad Raza
//                     </h1>
//                       <span className="rounded-lg text-blue-800 text-xs bg-green-100 px-2 font-semibold">Student</span>
//                   </div>

//                   <p className="text-gray-500 text-[14px]">
//                     BS Computer Science • FAST NUCES
//                   </p>

//                   <p className="mt-1 mb-2 text-sm text-gray-600">
//                     Passionate about programming,
//                     teaching and helping peers.
//                   </p>
//                 </div>

//                 <CustomButton className="flex items-center gap-x-3 text-xs rounded border border-gray-300 bg-gray-100 bg-none text-black shadow-sm">
//                   <FiEdit3 size={10} /> Edit Profile
//                 </CustomButton>
//                 <CustomButton className="rounded border border-gray-300 bg-gray-100 bg-none text-black py-2">
//                   <HiDotsHorizontal size={10}/>
//                 </CustomButton>
                

//               </div>

//               <div className="flex justify-between max-w-80 text-sm text-gray-600 pl-20 ml-15">
//                 <span className="flex items-center gap-3"><IoLocationOutline /> Location</span>
//                 <span className="flex items-center gap-3"><CgCalendarDates /> created date</span>
//               </div>

//               <div className="flex flex-wrap justify-between mt-8 border-t pt-4 gap-4">

//                 <div className="text-center flex-1">
//                   <h3 className="font-bold text-md">125</h3>
//                   <p className="text-gray-500 text-sm">Posts</p>
//                 </div>

//                 <div className="w-px h-10 bg-gray-200" />

//                 <div className="text-center flex-1">
//                   <h3 className="font-bold text-md">2.4K</h3>
//                   <p className="text-gray-500 text-sm">Followers</p>
//                 </div>
                
//                 <div className="w-px h-10 bg-gray-200" />

//                 <div className="text-center flex-1">
//                   <h3 className="font-bold text-md">320</h3>
//                   <p className="text-gray-500 text-sm">Following</p>
//                 </div>
                
//                 <div className="w-px h-10 bg-gray-200" />

//                 <div className="text-center flex-1">
//                   <h3 className="font-bold text-md">45</h3>
//                   <p className="text-gray-500 text-sm">Groups</p>
//                 </div>
                
//                 <div className="w-px h-10 bg-gray-200"></div>

//                 <div className="text-center flex-1">
//                   <h3 className="font-bold text-md">12</h3>
//                   <p className="text-gray-500 text-sm">Badges</p>
//                 </div>

//               </div>

//             </div>

//               <div className="flex flex-wrap justify-between mt-8 border gap-4 rounded-lg relative">
//                 {profileTabs.map((tab) => (
//                   <button
//                     key={tab}
//                     onClick={() => setActiveTab(tab)}
//                     className={`cursor-pointer px-3 py-3 font-semibold border-b-2 ${
//                       activeTab === tab
//                         ? "border-blue-700 text-blue-700 font-bold"
//                         : "border-transparent"
//                     }`}
//                   >
//                     {tab}
//                   </button>
//                 ))}
//               </div>

//               <div className="h-60 w-full p-5 overflow-scroll mt-8 border gap-4 rounded-lg relative">
//                 <h2 className="text-xl font-bold">{selectTabs?.title}</h2>
//                 <p className="pt-4 leading-relaxed font-semibold text-gray-700">{selectTabs?.content}</p>
//               </div>

//               <div className="p-5 mt-8 border gap-4 rounded-lg relative">
//                 <div className="flex justify-between items-center mb-5">
//                   <h2 className="text-xl font-bold">Recent Posts</h2>
//                   <span className="text-blue-500">View All</span>
//                 </div>

//                 {posts.map((post) => (
//                   <div key={post.key} className="border p-5 rounded-lg gap-4 mt-5">
                
                
//                       <div className="flex items-center gap-3">
//                         <div className="w-14 h-14 relative pt-5">
//                           <Image
//                             src={"/img/defaultProfile.JFIF"}
//                             alt="Logo"
//                             fill
//                             className='object-contain rounded-full'
//                           />
//                         </div>
//                         <div className='text-[12px] leading-4'>
//                             <h2 className='text-gray-800 font-bold text-[14px]'>Ahmad Raza</h2>
//                             <p className='text-gray-600'>3 houver ago</p>
//                         </div>
//                       </div>

//                       <div>
//                         <p className="">{post.content}</p>
//                       </div>

//                       <div className="flex items-center gap-8 pt-13">

//                       <button className="flex items-center gap-2 text-gray-600 hover:text-red-500">
//                         <FaHeart />
//                         <span>124</span>
//                       </button>

//                       <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500">
//                         <FaRegComment />
//                         <span>23</span>
//                       </button>

//                       <button className="flex items-center gap-2 text-gray-600 hover:text-green-500">
//                         <FaShare />
//                         <span>12</span>
//                       </button>

//                       <button className="ml-auto text-gray-600 hover:text-yellow-500">
//                         <FaRegBookmark />
//                       </button>

//                     </div>
//                   </div>
//                 ))}

                
//               </div>


//           </div>

//           <div>
//             <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm w-60">
  
//                   {/* Heading */}
//                   <h3 className="font-semibold text-gray-800">
//                     Profile Completeness
//                   </h3>

//                   {/* Percentage */}
//                   <p className="text-green-600 text-sm font-medium mt-4">
//                     85% Complete
//                   </p>

//                   {/* Progress Bar */}
//                   <div className="w-full bg-gray-200 rounded-full h-2 mt-2 mb-4">
//                     <div className="bg-green-500 h-2 rounded-full w-[85%]"></div>
//                   </div>

//                   {/* Checklist */}
//                 {tasks.map((task) => (
//                   <div
//                     key={task.label}
//                     className="flex items-center gap-3 py-1"
//                   >
//                     {task.completed ? (
//                       <FaCheckCircle className="text-green-500" />
//                     ) : (
//                       <div className="w-4 h-4 rounded-full border" />
//                     )}

//                     <span>{task.label}</span>
//                   </div>
//                 ))}
//           </div>
//           </div>

//       </div>
//   )
// }

// export default page;




