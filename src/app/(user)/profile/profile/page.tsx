'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea";
import { Controller, useForm } from "react-hook-form";
import z, { object } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter, useSelectedLayoutSegments  } from "next/navigation";
import React, { useEffect, useState } from "react";
import { profileSchema } from "@/src/zod-Schemas/profileSchema";
import Image from 'next/image'
import ImageUpload from "@/src/components/ImageUpload";
import { useAppDispatch, useAppSelector } from "@/src/store/useSelecterhook";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { ApiResponse } from "@/src/types/dataTaype";
import { profileData } from "@/src/store/userDataSlice";
import { usePathname } from "next/navigation";
import { Camera, Loader2, User } from "lucide-react";
import CustomButton from '@/src/components/shared/CustomButton'
import { FaHand } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { TbPinnedFilled } from "react-icons/tb";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { TbGenderTransgender } from "react-icons/tb";
import { BsPersonWorkspace } from "react-icons/bs";
import { UserProfile } from "@/src/types/dataTaype";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";


const page = () => {
    const router = useRouter();
    const pathname = usePathname();
    const segments = useSelectedLayoutSegments();
    const [selectProfileImg, setSelectProfileImg] = useState<File | null>(null);
    const [selectCoverImg, setSelectCoverImg] = useState<File | null>(null);
    const [profilePreview, setProfilePreview] = useState<string | null>(null);
    const [coverPreview, setCoverPreview] = useState<string | null>(null);
    const [isEdit, setIsEdit] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();

    type FormData = z.infer<typeof profileSchema>;   // 👈 string
    const userData = useAppSelector((state) => state.userData.profileData);
    const userProfileData = userData?.data?.userProfile;
    const checkUserDetaLength = userData && Object.keys(userData).length > 0;
   console.log("userData:", coverPreview);

    const {
        register,
        handleSubmit,
        control,
        reset,
        watch,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            profileName: userProfileData?.profileName || "",
            bio: userProfileData?.bio || "",
            location: userProfileData?.location || "",
            pinnedDetail: userProfileData?.pinnedDetail || "",
            gender: userProfileData?.gender || ""
        }
    });

    const onSubmit = async (data: FormData) => {
            setIsLoading(true);

        try { 
            const formData = new FormData();
            
            for (const [key, value] of Object.entries(data)) {
                formData.append(key, String(value ?? ""));
            }
            
            if (selectProfileImg) {
                formData.append("profileImg", selectProfileImg);
            };

            if (selectCoverImg) {
                formData.append("coverImg", selectCoverImg);
            }

            const response = await axios.post("/api/user/profile", formData);

            dispatch(profileData(response?.data?.updatedUser));
            setError("");

            toast("profile data successfully saved", {
                position: "top-right",        
                description: <span className="text-black">{ response.data?.message }</span>,
            });

            setIsLoading(false);
            setIsEdit(true);

        } catch (err: any) {
            setIsLoading(false);

            const AxiosError = err as AxiosError<ApiResponse>;
            const message = AxiosError.response?.data?.message || "Something went wrong";
            setError(message);

            toast("Profile deta Failed!", {
                position: "top-right",
                description: <span className="text-black">{ message }</span>,
            });
        }
    };

    
    const handleFile = (file: File, type?: "profile" | "cover") => {
        const url = URL.createObjectURL(file);

        if (type === "profile") {
            setSelectProfileImg(file);
            setProfilePreview(url);
        }

        if (type === "cover") {
            setSelectCoverImg(file);
            setCoverPreview(url);
        }
    };

    useEffect(() => {

    if (userData) {
        const profileImgUrl = userProfileData?.profileImgUrl;
        const coverImgUrl = userProfileData?.coverImageUrl;
        setProfilePreview(profileImgUrl ? profileImgUrl : null);
        setCoverPreview(coverImgUrl ? coverImgUrl : null);

        reset({
        profileName: userProfileData?.profileName ?? "",
        bio: userProfileData?.bio ?? "",
        location: userProfileData?.location ?? "",
        pinnedDetail: userProfileData?.pinnedDetail ?? "",
        gender: userProfileData?.gender ?? "",
        });

    }
    }, [userData]);

    const ProfileInformation = {
        Info: {
            Bio: { label: "Bio", value: "bio", type: "textarea", placeholder: "introduce yourself...", showButtonText: "About you", icon: FaHand },
            pinnedDetails: { label: "Pinned details", value: "pinnedDetail", type: "pinnedDetails", placeholder: "introduce yourself...", showButtonText: "Pinned details", icon: TbPinnedFilled },
        },
        PersnalDetails: {
            fullName: { label: "Full Name", value: "profileName", type: "pinnedDetails", placeholder: "change your name",  showButtonText: "change your profile name", icon: User },
            Location: { label: "Location", value: "location", type: "textarea", placeholder: "Current city or town", showButtonText: "current city or town", icon: IoLocationOutline },
            Birthday: { label: "Birthday", value: "Developer", type: "textarea", placeholder: "introduce yourself...", showButtonText: "Bathday", icon: LiaBirthdayCakeSolid },
            Gender: { label: "Gender", value: "gender", type: "gender", placeholder: "introduce yourself...", showButtonText: "Gender", icon: TbGenderTransgender }
        },
        Work: {
            Company: { label: "Work", value: "Work experiance", type: "textarea", placeholder: "introduce yourself...", showButtonText: "Work experiance", icon: BsPersonWorkspace },
        },
    };

    const genderOptions = ["Male", "Female", "Other"]

    const [editSection, setEditSection] = useState<string | null>(null);
    const [selectedTabs, setSelectedTabs] = useState("Info");

        //  console.log("result :", )

    const tabData = ProfileInformation[selectedTabs as keyof typeof ProfileInformation];
    const currentObj = Object.values(tabData).find((type) => type.type === editSection);


    return (
        <div className="p-5 bg-[#FBFCFE] min-h-screen">

            <div className="text-start">
                <h1 className="font-bold text-xl">Edit Profile</h1>
                <p className="text-sm text-gray-500 font-semibold">Update your information and manage your profile</p>
            </div>
            <form   onSubmit={handleSubmit(onSubmit)}>

                <div className="bg-white border rounded-md max-w-[60%] mt-6 p-5">
                    <div className="text-start">
                        <h1 className="font-bold text-lg">Profile Images</h1>
                        <p className="text-sm text-gray-500 font-semibold">Update a profile picture and cover photo</p>
                    </div>

                    <div className="relative pt-5">
        
                        {/* Banner */}
                        <div className="relative">

                            <PhotoProvider>
                                <PhotoView src={ coverPreview || "/img/profileBanner.png"}>
                                    <img
                                        src={ coverPreview || "/img/profileBanner.png"}
                                        alt="banner"
                                        className="w-full h-44 rounded-t-2xl object-center object-cover "
                                    />
                                </PhotoView>
                            </PhotoProvider>
                                    
                                <ImageUpload onFileSelect={handleFile} type="cover" />
                            
                        </div>
                        
                        
        
                        {/* Profile Image */}
                        <div className="absolute left-6 top-32">
                        <div className="relative w-32 h-32">
                            <PhotoProvider>
                                <PhotoView src={profilePreview || "/img/defaultProfile.JFIF"}>
                                    <img
                                        src={profilePreview || "/img/defaultProfile.JFIF"}
                                        alt="Profile"
                                        className="w-full h-full rounded-full object-cover border-4 border-white"
                                    />
                                </PhotoView>
                            </PhotoProvider>
     

                                <ImageUpload onFileSelect={handleFile} type="profile" />
                            </div>
                        </div>
                         
                        <div className="flex justify-end items-end w-full h-20 pb-5">
                            {(selectProfileImg || selectCoverImg) && 
                                <CustomButton type="submit" className="rounded-lg border border-gray-300 bg-transparent shadow-none px-5 py-2 text-sm bg-none hover:bg-[#0aa382] text-black">Upload File</CustomButton>
                            }
                        </div>
                    </div>
                    
                </div>

                <div className="flex bg-white border rounded-md max-w-[60%] mt-5">
                
                {/* Sidebar */}
                <aside className="w-52 bg-white border-r">
                    <h1 className="font-bold text-xl p-5">About</h1>
                    <ul>
                        {Object.keys(ProfileInformation).map((key) => ({key})).map((key) => (
                            
                        <li 
                        key={key.key}
                        onClick={() => setSelectedTabs(key.key)}
                        className="font-semibold cursor-pointer text-gray-600 hover:bg-gray-200 text-md px-3 py-1 m-1 rounded-md">{key.key}</li>
                        ))}
                    </ul>
                </aside>

                {/* Main Content */}
                <main className="flex-1 bg-white p-5 min-h-100">

                      
                      { tabData &&
                        Object.values(tabData).map((item) => {
                            const Icon = item.icon
                            return (
                                <React.Fragment key={item.value}>
                                <h1 className={`font-semibold text-gray-600 text-md pb-1 ${ currentObj?.value === item.value && "hidden"}`}>
                                    {item.label}
                                </h1>

                                <CustomButton
                                    onClick={() => setEditSection(item.type)}
                                    type="button"
                                   className={`flex items-center gap-3 rounded-lg border-2 border-gray-100 bg-none px-4 py-2 mb-5 text-black shadow-sm hover:bg-gray-50 
                                    ${ currentObj?.value === item.value && "hidden"}`}
                                >
                                    <Icon size={18} /> 
                                    <span>{item.showButtonText}</span>
                                </CustomButton>

                                     {currentObj && currentObj.value === item.value &&
                                        <Field>
                                            <FieldLabel htmlFor={currentObj.label} className="text-md font-semibold text-gray-700" >
                                                Edit {currentObj.label} 
                                            </FieldLabel>

                                            {currentObj.type === "textarea" && (
                                                <>
                                                    <Textarea
                                                        id={currentObj.label}
                                                        placeholder={currentObj.placeholder}
                                                        className={`${currentObj.label === "Location"? "h-0" : "h-32 border-blue-500"} mb-4 resize-none border-2 focus:ring-2 focus:ring-blue-500`}
                                                        maxLength={100}
                                                        {...register(currentObj.value as keyof UserProfile)}
                                                    />

                                                    
                                                        <div className="flex items-center justify-between border-b pb-2">
                                                            <span className="text-xs text-gray-500">
                                                            {watch(currentObj.value as keyof UserProfile)?.length || 0}/100
                                                            </span>
                                                        </div>
                                                </>           
                                            )}

                                                
                                            {currentObj.type === "pinnedDetails" && (
                                                
                                                <Input
                                                    id="fieldgroup-email"
                                                    type="text"
                                                    placeholder={`${currentObj.label === "Pinned details" ? "Select up to 5 details to also show at the top of your profile. Details will be visible based on audience settings." : `${item.placeholder}`}`}
                                                    readOnly={currentObj.label === "Pinned details"}
                                                    className="
                                                        border-0
                                                        border-b
                                                        rounded-none
                                                        shadow-none
                                                        px-0
                                                        bg-transparent
                                                        focus-visible:ring-0
                                                        focus-visible:ring-offset-0
                                                        focus:border-b-blue-500
                                                    "
                                                    {...register(currentObj.value as keyof UserProfile)}
                                                />
                                            )}

                                            {currentObj.type === "gender" && (
                                                <select className="w-full border rounded-lg p-3"  {...register(currentObj.value as keyof UserProfile)} >
                                                {genderOptions.map((option) => (
                                                    <option key={option} value={option} >
                                                    {option}
                                                    </option>
                                                ))}
                                                </select>
                                            )}

                                                <div className="flex items-center justify-between pb-5">

                                                    {errors[currentObj.value as keyof UserProfile] && (
                                                    <p className="text-sm text-red-500">
                                                        {
                                                        errors[currentObj.label as keyof UserProfile]
                                                            ?.message as string
                                                        }
                                                    </p>
                                                    )}
                                                </div>

                                                {currentObj.type === item.type && (
                                                    <div className="mt-1 flex justify-end gap-3">
                                                        <CustomButton
                                                        type="button"
                                                        onClick={() => setEditSection(null)}
                                                        className="rounded-lg border border-gray-300 bg-gray-100 px-5 py-2 text-sm bg-none text-black"
                                                        >
                                                        Cancel
                                                        </CustomButton>

                                                        <CustomButton
                                                        type="submit"
                                                        disabled={currentObj.type === "textarea" && !watch(currentObj.value as keyof UserProfile)?.length}
                                                        className="rounded-lg border border-gray-300 bg-gray-100 px-5 py-2 text-sm"
                                                        >
                                                        Save Changes
                                                        </CustomButton>
                                                    </div>
                                                    )}

                                        </Field>
                                        }
                                </React.Fragment>
                        );
                    })}



                </main>

                </div>
            </form>
        </div>

    )
};

export default page;




        // <div className="flex justify-center items-center min-h-screen"> 
        //     <div className="w-full max-w-5xl max-h-screen px-8 bg-gray-100 pb-8 space-y-8 rounded-lg shadow-md">
        //         <div className="text-3xl text-info-emphasis font-bold mb-0 pt-8 px-12">
        //             <h1 className="tracking-tight font-mono">
        //                 Edit Profile
        //             </h1>
        //         </div>
                
        //             <form onSubmit={handleSubmit(onSubmit)}>
        //                 <div className="flex justify-center gap-x-12  bg-white rounded-lg shadow-lg p-8">
        //                     <div className="w-full max-w-3/12 shadow-[4px_0_15px_rgba(0,0,0,0.1)]">
                                
        //                         <Image
        //                         src={imageSrc || "/img/defaultProfile.JFIF"}
        //                         width={170}
        //                         height={170}
        //                         alt="Picture of the author"
        //                         className="p-3 rounded-full m-auto"
        //                         />
        //                         <ImageUpload onFileSelect={handleFile}/>
        //                     </div>
        //                     <div className="w-full max-w-3xl">
        //                         <FieldGroup>
        //                         <Field>
        //                             <FieldLabel htmlFor="fieldgroup-email" className="font-bold text-gray-500">Full Name</FieldLabel>
        //                             <Input
        //                             id="fieldgroup-email"
        //                             type="profileName"
        //                             placeholder="name@example.com"
        //                             disabled= {!isEdit}
        //                             {...register("profileName")}
        //                             />
        //                             {/* //dobara anna he error handling k liye */}
        //                             <div className="relative">
        //                             <p className="absolute text-red-500 text-sm top-full left-0">
        //                                 {errors.profileName && errors.profileName.message || error && "Invalid email or password"}
        //                             </p>
        //                             </div>

        //                         </Field>
        //                         <Field>
        //                             <FieldLabel htmlFor="textarea-disabled" className="font-bold text-gray-500">Bio</FieldLabel>
                                        
        //                             <Textarea 
        //                             id="textarea-disabled"
        //                             placeholder="Type your message here." 
        //                             disabled= {!isEdit}
        //                             {...register("Bio")}
        //                             />
        //                             <div className="relative">
        //                             <p className="absolute text-red-500 text-sm top-full left-0">
        //                                 {errors.Bio && errors.Bio.message || error && "Invalid email or password"}
        //                             </p>
        //                             </div>
        //                         </Field>
        //                                                         <Field>
        //                             <FieldLabel htmlFor="fieldgroup-email" className="font-bold text-gray-500">pinnedDetail</FieldLabel>
        //                             <Input
        //                             id="fieldgroup-email"
        //                             type="pinnedDetail"
        //                             placeholder="name@example.com"
        //                             disabled= {!isEdit}
        //                             {...register("pinnedDetail")}
        //                             />
        //                             {/* //dobara anna he error handling k liye */}
        //                             <div className="relative">
        //                             <p className="absolute text-red-500 text-sm top-full left-0">
        //                                 {errors.profileName && errors.profileName.message || error && "Invalid email or password"}
        //                             </p>
        //                             </div>

        //                         </Field>
        //                         <Field>
        //                             <FieldLabel htmlFor="fieldgroup-email" className="font-bold text-gray-500">location</FieldLabel>
        //                             <Input
        //                             id="fieldgroup-email"
        //                             type="location"
        //                             placeholder="nlocationm"
        //                             disabled= {!isEdit}
        //                             {...register("location")}
        //                             />
        //                             {/* //dobara anna he error handling k liye */}
        //                             <div className="relative">
        //                             <p className="absolute text-red-500 text-sm top-full left-0">
        //                                 {errors.profileName && errors.profileName.message || error && "Invalid email or password"}
        //                             </p>
        //                             </div>

        //                         </Field>
                                
                                
        //                         {/* <Controller 
        //                         name="class"
        //                         control={control}
        //                         render={({field}) => (

        //                         <div className="flex flex-col w-full">
        //                         <label htmlFor="class-select" className="mb-1 text-sm font-bold text-gray-500">
        //                             Select Class
        //                         </label>
        //                         <Select
        //                         onValueChange={field.onChange}
        //                         value={field.value}
        //                         disabled= {!isEdit}                              
        //                         >
        //                             <SelectTrigger id="class-select" className="w-full">
        //                             <SelectValue placeholder="Select class" />
        //                             </SelectTrigger>
        //                             <SelectContent>
        //                             <SelectGroup>
        //                                 <SelectLabel>1st into 12th</SelectLabel>
        //                                 <SelectItem value="one">1st Grade</SelectItem>
        //                                 <SelectItem value="two">2nd Grade</SelectItem>
        //                                 <SelectItem value="three">3rd Grade</SelectItem>
        //                                 <SelectItem value="four">4th Grade</SelectItem>
        //                                 <SelectItem value="five">5th Grade</SelectItem>
        //                                 <SelectItem value="six">6th Grade</SelectItem>
        //                                 <SelectItem value="seven">7th Grade</SelectItem>
        //                                 <SelectItem value="eight">8th Grade</SelectItem>
        //                                 <SelectItem value="nine">9th Grade</SelectItem>
        //                                 <SelectItem value="ten">10th Grade</SelectItem>
        //                                 <SelectItem value="eleven">11th Grade</SelectItem>
        //                                 <SelectItem value="twelve">12th Grade</SelectItem>
        //                             </SelectGroup>
        //                             </SelectContent>
        //                         </Select>
        //                         </div>
        //                         )}
        //                         /> */}

                                
                               
        //                         <Field orientation="horizontal" className="pt-5">
        //                         {isEdit ?
                                
        //                         <>
        //                             <Button disabled={isLoading} className="relative w-1/3 py-4 bg-blue-500 text-lg font-bold cursor-pointer disabled:cursor-not-allowed">
        //                             {isLoading && (
        //                                 <Loader2 className="animate-spin w-4 h-4 absolute left-4" />
        //                             )}
        //                             <span className={isLoading ? "opacity-70" : ""}>
        //                                 {isLoading ? "Saving..." : "Save Data"}
        //                             </span>
        //                             </Button>
        //                             <Button type="button" className="w-1/3 py-4 bg-blue-500 text-lg font-bold cursor-pointer" onClick={(e) => {
        //                                 e.preventDefault();
        //                                 setIsEdit(false);
        //                             }}>Cencel</Button>
        //                         </>
        //                         :
                                
        //                         (<Button type="button" className="py-4 cursor-pointer ml-auto w-fit bg-blue-500 text-lg font-bold" onClick={(e) => {
        //                             e.preventDefault()
        //                             setIsEdit(true)
        //                         }}>Edit</Button>)
        //                         }

        //                         </Field>
        //                         </FieldGroup>
        //                     </div>
        //             </div>
        //             </form>

        //     </div>
        // </div>
        