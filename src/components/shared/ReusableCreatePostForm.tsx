"use client";

import { Controller, useForm, UseFormRegister, UseFormReturn } from "react-hook-form";
import CustomInput from "./CustomInput";
import { userPostSchema } from "@/src/zod-Schemas/userPostSchema";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { addPost, deletePost } from "@/src/store/postSlice";
import { useAppDispatch } from "@/src/store/useSelecterhook";
import { toast } from "sonner";
import { ApiResponse } from "@/src/lib/apiResponse";
import CustomSelect from "./CustomSelect";
import ImageUpload from "../ImageUpload";
import CustomTagInput from "./CustomTagInput"
import CoustomButton from "./CustomButton"
import { Loader2 } from "lucide-react";
import { userPostType } from "@/src/types/dataTaype";
import Link from "next/link";


interface ReusableCreatePostFormProps {
  form: UseFormReturn<z.infer<typeof userPostSchema>>;
  postType: string;
  mode?: string;
  postId?: string;
  postDeta?: userPostType | null
}

function ReusableCreatePostForm({
  form,
  postType,
  mode,
  postId,
  postDeta
}: ReusableCreatePostFormProps) {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [postImageSelect, setPostImageSelect] = useState<File | null>(null);
  const [postVideoSelect, setPostVideoSelect] = useState<File | null>(null);
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [postImagePerview, setPostImagePreview] = useState<string | null>(null);
  const [postVideoPerview, setPostVideoPreview] = useState<string | null>(null);
  const [documentUrl, setDocumentUrl] = useState<string | null>(null);
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

  const videoLink = watch("videoLink");

  useEffect(() => {
    if (postDeta) {
      setDocumentUrl(postDeta.postDocumentUrl);


      form.reset({
        title: postDeta.title,
        content: postDeta.content,
        category: postDeta.category,
        tags: postDeta.tags,
        notesCategory: postDeta.notesCategory ,
        className: postDeta.className
        // baki fields...
      });
    }
  }, [postDeta]);

 const onSubmit = async (data: z.infer<typeof userPostSchema>) => {

    setIsSubmitting(true);
    const payload = {
      ...data,
      postType:  postType.toLowerCase()
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
          formData.append("postVideo", postVideoSelect);
      };

      let response;

      if(!mode){
          response = await axios.post("/api/user/post/createpost", formData);
             console.log("response create post", response)
            dispatch(addPost(response.data.userPost));
      }else{
          response = await axios.patch(`/api/user/post/createpost?postId=${postId}`, formData);
           console.log("response update post", response)
      };

      toast(mode? "post updated successfully!" : "post created successfully!", {
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
    <form className="relative w-full min-w-0" onSubmit={handleSubmit(onSubmit)}>
      
      <input type="hidden" {...register("postType")} />

      {/* Title */}
      <div className="mt-6 sm:mt-8">
        <CustomInput
          label={postType + " Title"}
          type="text"
          placeholder="Give your post a short title..."
          optional={false}
          {...register("title")}
          className="w-full"
        />
      </div>

      {/* Video Link */}
      {postType === "Video" && (
        <div className="mt-5 sm:mt-6">
          <CustomInput
            label="Video Link"
            type="text"
            placeholder="Paste YouTube or video URL..."
            optional={true}
            {...register("videoLink")}
          />
        </div>
      )}

      {/* Content */}
      <div className="mt-5 sm:mt-6">
        <label
          className="
            mb-2 block
            text-sm sm:text-base
            font-semibold
            text-gray-700 dark:text-gray-300
          "
        >
          Write Something
          <span className="ml-1 text-red-500">*</span>
        </label>

        <textarea
          rows={8}
          placeholder="Write your post content here..."
          {...register("content")}
          className="
            w-full min-w-0
            resize-none
            rounded-xl
            border border-gray-300 dark:border-gray-700
            bg-white dark:bg-[#101827]
            p-3 sm:p-4
            text-sm sm:text-base
            text-gray-900 dark:text-white
            placeholder:text-gray-400 dark:placeholder:text-gray-500
            outline-none
            transition-colors duration-200
            focus:border-gray-400
            dark:focus:border-gray-600
            focus:ring-1
            focus:ring-gray-300
            dark:focus:ring-gray-700
          "
        />
      </div>

      {/* Image / Video Upload */}
      {!documentFile &&
        !documentUrl &&
        !videoLink?.trim() && (
          <div className="mt-5 sm:mt-6">
            <label
              className="
                mb-2 block
                text-sm sm:text-base
                font-semibold
                text-gray-700 dark:text-gray-300
              "
            >
              Attach File

              <span className="ml-1 font-normal text-gray-400 dark:text-gray-500">
                (Optional)
              </span>
            </label>

            <div
              className="
                w-full min-w-0
                rounded-2xl
                border-2 border-dashed
                border-gray-300 dark:border-gray-700
                bg-gray-50 dark:bg-[#101827]
                px-4 sm:px-6
                py-8 sm:py-12
                text-center
                transition-colors
              "
            >
              {/* Image Preview */}
              {postImagePerview && (
                <div className="w-full min-w-0">
                  <img
                    src={postImagePerview}
                    alt="Selected image preview"
                    className="
                      mx-auto
                      max-h-80
                      w-full
                      rounded-xl
                      object-contain
                    "
                  />
                </div>
              )}

              {/* Video Preview */}
              {postVideoPerview && (
                <video
                  src={postVideoPerview}
                  controls
                  className="
                    mx-auto
                    h-auto
                    max-h-80
                    w-full
                    rounded-xl
                    object-contain
                  "
                />
              )}

              {/* Upload */}
              {!postImagePerview && !postVideoPerview && (
                <div className="flex flex-col items-center">
                  <div className="text-4xl sm:text-5xl">
                    ☁️
                  </div>

                  <h3
                    className="
                      mt-3 sm:mt-4
                      font-semibold
                      text-gray-800 dark:text-gray-200
                    "
                  >
                    <ImageUpload
                      content="Drag & Drop files here"
                      onFileSelect={handleFile}
                    />
                  </h3>

                  <p
                    className="
                      mt-2
                      text-xs sm:text-sm
                      text-gray-500 dark:text-gray-400
                    "
                  >
                    here to pick Image or video
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

      {/* Notes */}
      {postType === "Notes" && (
        <>
          {/* Selected Document */}
          {documentFile && (
            <div
              className="
                mt-5 sm:mt-6
                flex
                min-w-0
                items-center
                gap-3
                rounded-xl
                border border-gray-300 dark:border-gray-700
                bg-white dark:bg-[#101827]
                p-3 sm:p-4
              "
            >
              <span className="shrink-0 text-2xl sm:text-3xl">
                📄
              </span>

              <div className="min-w-0">
                <p className="truncate font-medium text-gray-800 dark:text-gray-200">
                  {documentName}
                </p>

                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  {(documentFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          )}

          {/* Existing Document */}
          {documentUrl && (
            <div
              className="
                mt-5 sm:mt-6
                flex
                flex-col
                gap-3
                rounded-xl
                border border-gray-300 dark:border-gray-700
                bg-white dark:bg-[#101827]
                p-3 sm:p-4
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <div className="min-w-0">
                <p className="font-medium text-gray-800 dark:text-gray-200">
                  Current Document
                </p>

                <Link
                  href={documentUrl}
                  target="_blank"
                  className="
                    inline-block
                    mt-1
                    text-sm
                    text-blue-600 dark:text-blue-400
                    underline
                  "
                >
                  View PDF
                </Link>
              </div>

              <button
                type="button"
                onClick={() => setDocumentUrl(null)}
                className="
                  self-start
                  text-sm
                  text-red-500 dark:text-red-400
                  hover:text-red-600 dark:hover:text-red-300
                  sm:self-auto
                "
              >
                Remove
              </button>
            </div>
          )}
        </>
      )}

      {/* Question */}
      {postType === "Question" && (
        <div className="mt-5 sm:mt-6">
          <CustomInput
            label="Question"
            type="text"
            placeholder="Give your post a short title..."
            optional={true}
          />
        </div>
      )}

      {/* Notes Category */}
      {postType === "Notes" && (
        <>
          <div className="mt-5 sm:mt-6">
            <CustomSelect
              label="Notes Category"
              options={[
                "Mathematics",
                "English",
                "Bio",
                "Science",
              ]}
              {...register("notesCategory")}
            />
          </div>

          <div className="mt-5 sm:mt-6">
            <CustomSelect
              label="Class Name"
              options={[
                "5th",
                "6th",
                "7th",
                "8th",
                "9th",
                "10th",
                "11th",
                "12th",
              ]}
              {...register("className")}
            />
          </div>
        </>
      )}

      {/* Category */}
      <div className="mt-5 sm:mt-6">
        <CustomSelect
          label="Category"
          options={[
            "General Discussion",
            "Education",
            "Technology",
            "Science",
            "Career",
          ]}
          {...register("category")}
        />
      </div>

      {/* Tags */}
      <div className="mt-5 sm:mt-6">
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

      {/* Visibility + Publish */}
      <div
        className="
          mt-8 sm:mt-10
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-end
          sm:justify-between
        "
      >
        <div className="w-full sm:w-auto">
          <CustomSelect
            label="Visibility"
            options={[
              "Everyone",
              "Only Members",
              "Private",
            ]}
            {...register("visibility")}
          />
        </div>

        <CoustomButton
          type="submit"
          className="
            w-full
            sm:w-auto
            px-6 sm:px-10
            h-10 sm:h-11
            rounded-xl
          "
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Please wait
            </div>
          ) : (
            "Publish Post"
          )}
        </CoustomButton>
      </div>
    </form>
  );
}

export default ReusableCreatePostForm;