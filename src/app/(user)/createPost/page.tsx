'use client';
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldDescription,
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
import z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createUserPost, createUserProfile } from "@/src/services/appwrite/database";
import { profileSchema } from "@/src/zod-Schemas/profileSchema";
import Image from 'next/image'
import ImageUpload from "@/src/components/ImageUpload";
import { createImg, getImgView } from "@/src/services/appwrite/storage";
import { useAppSelector } from "@/src/store/useSelecterhook";
import { userPostSchema } from "@/src/zod-Schemas/userPostSchema";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { ApiResponse } from "@/src/types/dataTaype";
import { Loader2 } from "lucide-react";
import { Preview } from "@react-email/components";

const page = () => {
    const router = useRouter();
    const [isSubmitting ,setIsSubmitting] = useState(false);
    const [selectPostImg, setSelectPostImg] = useState<File | null>(null);
    const [pereview, setPreview] = useState<string | null>(null);
    const [showSelectImg, setShowSelectImg] = useState<string | null>(null);
    const [error, setError] = useState("");
    const [isEdit, setIsEdit] = useState(true);
    type FormData = z.infer<typeof userPostSchema>
    const userData = useAppSelector((state) => state.userData.profileData);
    

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(userPostSchema),
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
         console.log("FORM SUBMIT", data);
        try {
                    // 🧠 1. IMAGE UPLOAD (separate error handling)
            let imageUrl: string | null = null;
            let publicId: string | null = null;

            try {
                if(selectPostImg){
                    const formData = new FormData();
                    formData.append("postimg", selectPostImg); 

                    const res = await axios.post("/api/user/postImg-upload", formData);

                    if (!res.data.success) {
                        throw new Error("Upload failed");
                    };

                    imageUrl = res.data.secure_url
                    publicId = res.data.publicId
                };
            } catch (error: any) {
                console.log("post Img Upload error checking createpost page", error);

                // UI feedback
                toast("Image upload failed", {
                    description: <span className="text-black">{ error.response?.data?.message || "Something went wrong" }</span>,
                });
                setIsSubmitting(false)

                return;
            };

            const updateData = {
                ...data,
                ...(imageUrl && {postImageUrl: imageUrl}),
                ...(publicId && {postImgPublicId: publicId})
            };
                
            const response = await axios.post("/api/user/createpost", updateData);

            toast('post successful!', {
            position: "top-right",
            description: <span className="text-black">{response.data?.message}</span>,
            action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                },
            });

            setIsSubmitting(false);
            router.push('/')

        } catch (err:any) {
            console.log("Error creating post please checking createpost page",err)
            
            const axiosError = err as AxiosError<ApiResponse>;

            toast('post successful!', {
            position: "top-right",
            description: <span className="text-black">{axiosError.response?.data?.message}</span>,
            action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                },
            });

            setIsSubmitting(false);
        };
    };

    const handleUserFile = (file: File) => {
        setSelectPostImg(file);
        setShowSelectImg(URL.createObjectURL(file))
    };


    useEffect(() => {
        const profileImgurl = userData?.userProfile?.profileImgUrl;
        setPreview(profileImgurl? profileImgurl : null);
    }, [userData]);

    // const showProfileImg = prifileImgId
    // ? 
    // getImgView(prifileImgId)
    // :
    // "/img/defaultProfile.JFIF";

    // useEffect(() => {
    // if (userData) {
    //     reset({
    //     profileName: userData[0]?.profileName,
    //     Bio: userData[0]?.Bio,
    //     class: userData[0]?.class,
    //     subjects: userData[0]?.subjects,
    //     });
    // }
    // }, [userData]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-600"> 
            <div className="w-full max-w-5xl max-h-screen px-8 pb-8 space-y-8">
                <div className="text-3xl text-info-emphasis font-bold mb-0 pt-8 px-12">
                    <h1 className="tracking-tight font-mono">
                        Create Post
                    </h1>
                </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex justify-start gap-x-12  bg-white rounded-lg shadow-lg p-8">

                                <FieldGroup>
                                    <div className="flex items-center">
                                   <div className="w-full max-w-xl">
                                        <div className="flex justify-start items-center">
                                            <div className="">
                                                <Image
                                                src={pereview || "/img/defaultProfile.JFIF"}
                                                width={80}
                                                height={80}
                                                alt="Picture of the author"
                                                className="p-3 rounded-full m-auto"
                                                />
                                            </div>
                                            <h1 className="text-start font-bold text-gray-500">create Post</h1>
                                        </div>
                                        <Field>
                                            <FieldLabel htmlFor="fieldgroup-title" className="font-bold text-gray-500">Title</FieldLabel>
                                            <Input
                                            id="fieldgroup-title"
                                            type="title"
                                            placeholder="name@example.com"
                                            {...register("title")}
                                            className="p-5"
                                            />
                                            {/* //dobara anna he error handling k liye */}
                                            <div className="relative">
                                            <p className="absolute text-red-500 text-sm top-full left-0">
                                                {errors.title && errors.title.message || error }
                                            </p>
                                            </div>

                                        </Field>
                                        <Field>
                                            <FieldLabel htmlFor="textarea-content" className="font-bold text-gray-500">Bio</FieldLabel>
                                                
                                            <Textarea 
                                            id="textarea-content"
                                            placeholder="Type your message here." 
                                            {...register("content")}
                                            className="h-32 resize-none"
                                            />
                                            <div className="relative">
                                            <p className="absolute text-red-500 text-sm top-full left-0">
                                                {errors.content && errors.content.message || error }
                                            </p>
                                            </div>
                                        </Field>                  
                                    </div>
                                     <div className="m-auto">
                                                <Image
                                                src={showSelectImg || "/img/defaultProfile.JFIF"}
                                                width={300}
                                                height={300}
                                                alt="Picture of the author"
                                                // className="p-3 w-72 h-80 object-cover m-auto"
                                                />
                                            </div>
                                    </div>
                                    <div>
                                        <ImageUpload onFileSelect={handleUserFile} />
                                    </div>
                               
                                <Field orientation="horizontal" className="pt-2">

                                    <Button type="submit" className="w-1/5 ml-auto py-4 bg-gray-800 rounded-full cursor-pointer">
                                        {isSubmitting && (
                                            <Loader2 className="animate-spin w-4 h-4 absolute left-4" />
                                        )}
                                        <span className={isSubmitting? "opacity-70" : ""}>
                                            {isSubmitting? "Publishing...": "publish"}
                                        </span>

                                    </Button>
                                

                                </Field>
                                </FieldGroup>
                    </div>
                    </form>
            </div>
        </div>
    )
};

export default page;