"use client";

import { Controller, useForm, UseFormRegister, UseFormReturn } from "react-hook-form";
import CustomInput from "./CustomInput";
import { userPostSchema } from "@/src/zod-Schemas/userPostSchema";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { addPost } from "@/src/store/postSlice";
import { useAppDispatch } from "@/src/store/useSelecterhook";
import { toast } from "sonner";
import { ApiResponse } from "@/src/lib/apiResponse";
import CustomSelect from "./CustomSelect";
import ImageUpload from "../ImageUpload";
import CustomTagInput from "./CustomTagInput"
import CoustomButton from "./CustomButton"
import { Loader2 } from "lucide-react";


interface ReusableCreatePostFormProps {
  form: UseFormReturn<z.infer<typeof userPostSchema>>;
  postType: string;
}

function ReusableCreatePostForm({
  form,
  postType,
}: ReusableCreatePostFormProps) {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [postImageSelect, setPostImageSelect] = useState<File | null>(null);
  const [postVideoSelect, setPostVideoSelect] = useState<File | null>(null);
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [postImagePerview, setPostImagePreview] = useState<string | null>(null);
  const [postVideoPerview, setPostVideoPreview] = useState<string | null>(null);
  const [documentName, setDocumentName] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;


 const onSubmit = async (data: z.infer<typeof userPostSchema>) => {
    setIsSubmitting(true);
    const payload = {
      ...data,
      postType: postType.toLowerCase()
    }

    try {
      const formData = new FormData();

      for (const [key, value] of Object.entries(payload)) {
        formData.append(key, String(value ?? ""));
      };

      if (postImageSelect) {
          formData.append("postImage", postImageSelect);
      }; 

      if (documentFile) {
          formData.append("document", documentFile);
      };

      if (postVideoSelect) {
          formData.append("coverImg", postVideoSelect);
      };

      const response = await axios.post("/api/user/post/createpost", formData);

      dispatch(addPost(response.data.userPost));

      toast("post created successfully!", {
          position: "top-right",        
          description: <span className="text-black">{ response.data?.message }</span>,
      });

      setIsSubmitting(false);
      router.push("/community")
      
    } catch (err) {
      console.log("Error creating post please checking createpost page",err)
      
      const axiosError = err as AxiosError<ApiResponse>;

      toast('post created Failed', {
      position: "top-right",
      description: <span className="text-black">{axiosError.response?.data?.message}</span>,
      action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
          },
      });

      setIsSubmitting(false);
    }
  };

  const handleFile = (file: File) => {
    const url = URL.createObjectURL(file);

    if (file.type.startsWith("image/")) {
      setPostImageSelect(file);
      setPostImagePreview(url);
    }

    if (file.type.startsWith("video/")) {
      setPostVideoSelect(file);
      setPostVideoPreview(url);
    };

    if (
      file.type === "application/pdf" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.type === "application/msword"
    ) {
      setDocumentFile(file);
      setDocumentName(file.name);
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <div className="mt-8">

        {/* Title */}

        <CustomInput
          label={`Post Title`}
          type="text"
          placeholder="Give your post a short title..."
          optional = {true}
          {...register("title")}
          className="w-full h-12 rounded-xl border border-gray-300 px-4 outline-none focus:border-blue-500"
          />

        </div>

        
        <input type="hidden" {...register("postType")} />

      {/* Content */}

       <div className="mt-6">

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Write Something
                    <span className="text-red-500">*</span>
                  </label>

                  <textarea
                    rows={8}
                    placeholder="Write your post content here..."
                    {...register("content")}
                    className="w-full rounded-xl border border-gray-300 p-4 resize-none outline-none focus:border-blue-500"
                  />

       </div>

      {/* Different Fields */}

      {postType === "Notes"  && (

        <>

         {!documentFile && (
            <div className="mt-6">
            
                <label className="block text-sm font-semibold mb-2">

                Attach File

                <span className="text-gray-400">
                    {" "} (Optional)
                </span>

                </label>
            
                <div className="border-2 border-dashed rounded-2xl py-12 flex flex-col items-center">
                  
                    { postImagePerview &&
                        <div>
                          <img
                            src={postImagePerview}
                            alt="" 
                            className="w-full"
                          />
                        </div>
                    }


                    { postVideoPerview && (
                      <video
                        src={postVideoPerview}
                        controls
                        className="w-full h-100 rounded-lg"
                      />
                    )}

                    { !postImagePerview && !postVideoPerview && 
                        <div>

                        <div className="text-5xl">
                          ☁️
                        </div>

                        <h3 className=" relative font-semibold mt-4">

                        <ImageUpload content="Drag & Drop files here" onFileSelect={handleFile} />

                        </h3>

                        <p className="text-gray-500 mt-2">

                          here to pick Image or video

                        </p>

                      </div>
                    }


                </div>
            
            </div>
          )}

        {documentFile && (
          <div className="flex items-center gap-3 p-4 border rounded-lg">
            <span className="text-3xl">📄</span>

            <div>
              <p className="font-medium">{documentName}</p>
              <p className="text-sm text-gray-500">
                {(documentFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
        )}
        </>
        // <ImageUpload
        //   content="Upload Image"
        //   onFileSelect={handleFile}
        // />
      )}

      {/* {postType === "Notes" && (
        <ImageUpload
          content="Upload PDF / DOC"
          onFileSelect={handleFile}
        />
      )} */}

      {postType === "Video" && (
        <ImageUpload
          content="Upload Video"
          onFileSelect={handleFile}
        />
      )}

      {postType === "Question" && (

        <CustomInput
            label="Question"
            type="text"
            placeholder="Give your post a short title..."
            optional = {true}
            // {...register("")}
            className="w-full h-12 rounded-xl border border-gray-300 px-4 outline-none focus:border-blue-500"
            />
      )}

        {/* Notes Category */}
        {postType === "Notes" &&

          <div className="mt-6">
              <CustomSelect 
                label="Notes Category"
                options={["Math", "English", "Bio", "Science"]}
                {...register("notesCategory")}
                />
          </div>

        }

        {/* Category */}
       <div className="mt-6">
          <CustomSelect 
            label="Category"
            options={["General Discussion", "Education", "Technology", "Science", "Career"]}
            {...register("category")}
            />
          </div>

      {/* Tags */}
      <div className="mt-6">
          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <CustomTagInput
                label="Tags"
                tags={field.value ?? []}
                setTags={field.onChange}
                max={5}
              />
            )}
          />

      </div>

      {/* Visibility */}

      <div className="flex justify-between items-center mt-10">

        <CustomSelect
          label="Visibility"
          options={["Everyone", "Only Members", "Private"]}
          {...register("visibility")}
          />

        <CoustomButton type="submit"
            className="px-10 h-10 rounded-xl"
          >
            {isSubmitting ? (
                <div className="flex gap-2">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </div>
            ):(
              "Publish Post"
            )}

        </CoustomButton>

      </div>

    </form>
  );
}

export default ReusableCreatePostForm;