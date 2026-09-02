'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import z from "zod";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { profileSchema } from "@/src/zod-Schemas/profileSchema";
import ImageUpload from "@/src/components/ImageUpload";
import { useAppDispatch, useAppSelector } from "@/src/store/useSelecterhook";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { ApiResponse } from "@/src/types/dataTaype";
import { profileData } from "@/src/store/userDataSlice";
import {  Loader2, User } from "lucide-react";
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
            gender: userProfileData?.gender || "",
            birthday: userProfileData?.birthday || ""
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

            const response = await axios.post("/api/user/post/profile", formData);

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
    if (userProfileData) {
        setProfilePreview(userProfileData.profileImgUrl || null);
        setCoverPreview(userProfileData.coverImageUrl || null);

        reset({
        profileName: userProfileData.profileName ?? "",
        bio: userProfileData.bio ?? "",
        location: userProfileData.location ?? "",
        pinnedDetail: userProfileData.pinnedDetail ?? "",
        gender: userProfileData.gender ?? "",
        birthday: userProfileData.birthday ?? "",
        });
    }
    }, [userProfileData, reset]);

    const ProfileInformation = {
        Info: {
            Bio: { label: "Bio", value: "bio", type: "textarea", placeholder: "introduce yourself...", showButtonText: "About you", icon: FaHand },
            pinnedDetails: { label: "Pinned details", value: "pinnedDetail", type: "pinnedDetails", placeholder: "introduce ...", showButtonText: "Pinned details", icon: TbPinnedFilled },
        },
        PersnalDetails: {
            fullName: { label: "Full Name", value: "profileName", type: "pinnedDetails", placeholder: "change your name",  showButtonText: "change your profile name", icon: User },
            Location: { label: "Location", value: "location", type: "textarea", placeholder: "Current city or town", showButtonText: "current city or town", icon: IoLocationOutline },
            Birthday: { label: "Birthday", value: "birthday", type: "Birthday", placeholder: "introduce yourself...", showButtonText: "Bathday", icon: LiaBirthdayCakeSolid },
            Gender: { label: "Gender", value: "gender", type: "gender", placeholder: "introduce yourself...", showButtonText: "Gender", icon: TbGenderTransgender },
        },
        Work: {
            Company: { label: "Work", value: "Workexperiance", type: "textarea", placeholder: "introduce yourself...", showButtonText: "Work experiance", icon: BsPersonWorkspace },
        },
    };

    const genderOptions = ["Male", "Female", "Other"]

    const [editSection, setEditSection] = useState<string | null>(null);
    const [selectedTabs, setSelectedTabs] = useState("Info");

    const tabData = ProfileInformation[selectedTabs as keyof typeof ProfileInformation];
    const currentObj = Object.values(tabData).find((type) => type.label === editSection);
    const fieldError = errors[currentObj?.value as keyof typeof errors];
    

    return (
        <div className="p-3 sm:p-5 bg-[#FBFCFE] dark:bg-[#0b1120] min-h-screen pt-26 md:pt-19">

            <div className="text-start">
                <h1 className="font-bold text-xl text-gray-900 dark:text-white">Edit Profile</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold">Update your information and manage your profile</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>

                {/* Profile Images */}
                <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700 rounded-md w-full max-w-4xl mt-5 sm:mt-6 p-3 sm:p-5">

                    <div className="text-start">
                        <h1 className="font-bold text-lg text-gray-900 dark:text-white">Profile Images</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold">Update a profile picture and cover photo</p>
                    </div>

                    <div className="relative pt-4 sm:pt-5">

                        {/* Banner */}
                        <div className="relative">

                        <PhotoProvider>
                            <PhotoView src={coverPreview || "/img/profileBanner.png"}>
                            <img
                                src={coverPreview || "/img/profileBanner.png"}
                                alt="banner"
                                className="w-full h-32 sm:h-44 rounded-t-2xl object-center object-cover"
                            />
                            </PhotoView>
                        </PhotoProvider>

                        <ImageUpload onFileSelect={handleFile} type="cover" />

                        </div>

                        {/* Profile Image */}
                        <div className="absolute left-4 sm:left-6 top-24 sm:top-32">
                            <div className="relative w-24 h-24 sm:w-32 sm:h-32">
                                <PhotoProvider>
                                    <PhotoView src={profilePreview || "/img/defaultProfile.JFIF"}>
                                    <img
                                        src={profilePreview || "/img/defaultProfile.JFIF"}
                                        alt="Profile"
                                        className="w-full h-full rounded-full object-cover border-4 border-white dark:border-[#111827] cursor-pointer"
                                    />
                                    </PhotoView>
                                </PhotoProvider>

                                <ImageUpload onFileSelect={handleFile} type="profile" />
                            </div>
                        </div>

                        <div className="flex justify-end items-end w-full h-16 sm:h-20 pb-3 sm:pb-5">
                        {(selectProfileImg || selectCoverImg) && (
                            <CustomButton
                            type="submit"
                            className="rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent shadow-none px-4 sm:px-5 py-2 text-sm text-gray-900 dark:text-gray-100 hover:bg-[#0aa382] hover:text-white"
                            >
                            Upload File
                            </CustomButton>
                        )}
                        </div>

                    </div>

                </div>

                {/* About */}
                <div className="flex flex-col lg:flex-row bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700 rounded-md w-full max-w-4xl mt-5 overflow-hidden">

                {/* Sidebar / Mobile Tabs */}
                <aside className="w-full lg:w-52 shrink-0 bg-white dark:bg-[#111827] border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700">

                    <h1 className="font-bold text-lg sm:text-xl text-gray-900 dark:text-white p-4 sm:p-5">
                    About
                    </h1>

                    <ul className="flex lg:flex-col overflow-x-auto px-2 pb-2 lg:pb-0 scrollbar-hide">

                    {Object.keys(ProfileInformation).map((key) => ({ key })).map((key) => (

                        <li
                        key={key.key}
                        onClick={() => setSelectedTabs(key.key)}
                        className="shrink-0 whitespace-nowrap font-semibold cursor-pointer text-sm sm:text-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 m-1 rounded-md"
                        >
                        {key.key}
                        </li>

                    ))}

                    </ul>

                </aside>

                {/* Main Content */}
                <main className="flex-1 min-w-0 bg-white dark:bg-[#111827] p-3 sm:p-5 min-h-100">

                    {tabData &&
                    Object.values(tabData).map((item) => {

                        const Icon = item.icon;

                        return (

                        <React.Fragment key={item.value}>

                            <h1
                            className={`font-semibold text-gray-600 dark:text-gray-300 text-sm sm:text-md pb-1 ${currentObj?.value === item.value && "hidden"}`}
                            >
                            {item.label}
                            </h1>

                            <CustomButton
                            onClick={() => setEditSection(item.label)}
                            type="button"
                            className={`flex items-center gap-2 sm:gap-3 rounded-lg border-2 border-gray-100 dark:border-gray-700 bg-none bg-transparent px-3 sm:px-4 py-2 mb-5 text-gray-800 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 ${currentObj?.value === item.value && "hidden"}`}
                            >
                            <Icon size={18} />
                            <span>{item.showButtonText}</span>
                            </CustomButton>

                            {currentObj && currentObj.value === item.value && (

                            <Field>

                                <FieldLabel
                                htmlFor={currentObj.label}
                                className="text-sm sm:text-md font-semibold text-gray-700 dark:text-gray-300"
                                >
                                Edit {currentObj.label}
                                </FieldLabel>

                                {/* Textarea */}
                                {currentObj.type === "textarea" && (
                                <>
                                    <Textarea
                                    id={currentObj.label}
                                    placeholder={currentObj.placeholder}
                                    className={`${currentObj.label === "Location" ? "h-0" : "h-32"} mb-4 resize-none border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0b1120] text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500`}
                                    maxLength={100}
                                    {...register(currentObj.value as keyof UserProfile)}
                                    />

                                    <div className="flex items-center justify-between border-b-2 border-gray-200 dark:border-gray-700">
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {watch(currentObj.value as keyof UserProfile)?.length || 0}/100
                                    </span>
                                    </div>
                                </>
                                )}

                                {/* Input */}
                                {["pinnedDetails", "Birthday"].includes(currentObj.type) && (
                                <Input
                                    id="fieldgroup-email"
                                    type="text"
                                    placeholder={`${currentObj.label === "Pinned details" ? "Select up to 5 details to also show at the top of your profile. Details will be visible based on audience settings." : `${item.placeholder}`}`}
                                    readOnly={currentObj.label === "Pinned details"}
                                    className="w-full border-0 border-b border-gray-300 dark:border-gray-600 rounded-none shadow-none px-0 bg-transparent text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-b-blue-500"
                                    {...register(currentObj.value as keyof UserProfile)}
                                />
                                )}

                                {/* Gender */}
                                {currentObj.type === "gender" && (
                                <select
                                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-[#0b1120] text-gray-900 dark:text-gray-100"
                                    {...register(currentObj.value as keyof UserProfile)}
                                >
                                    {genderOptions.map((option) => (
                                    <option
                                        key={option}
                                        value={option}
                                        className="bg-white dark:bg-[#0b1120] text-gray-900 dark:text-gray-100"
                                    >
                                        {option}
                                    </option>
                                    ))}
                                </select>
                                )}

                                {/* Error + Buttons */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-5">

                                {fieldError && (
                                    <p className="text-sm text-red-500">
                                    {fieldError.message}
                                    </p>
                                )}

                                </div>

                                {currentObj.type === item.type && (
                                <div className="mt-1 flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3">

                                    <CustomButton
                                        type="button"
                                        onClick={() => setEditSection(null)}
                                        className="w-full sm:w-auto rounded-lg border border-gray-300 dark:border-gray-600 bg-none bg-gray-100 dark:bg-gray-800 px-5 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                                    >
                                    Cancel
                                    </CustomButton>

                                    <CustomButton
                                        type="submit"
                                        disabled={currentObj.type === "textarea" && !watch(currentObj.value as keyof UserProfile)?.length}
                                        className="w-full sm:w-auto rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 bgno dark:bg-gray-800 px-5 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center gap-2">
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Please wait
                                        </div>
                                    ) : (
                                        "Save Changes"
                                    )}
                                    </CustomButton>

                                </div>
                                )}

                            </Field>

                            )}

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