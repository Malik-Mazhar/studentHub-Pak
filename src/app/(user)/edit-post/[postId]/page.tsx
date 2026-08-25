'use client';

import CoustomButton from "@/src/components/shared/CustomButton"
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaComments,
  FaFileAlt,
  FaQuestionCircle,
  FaPoll,
  FaLink,
} from "react-icons/fa";
import { FaTrash, FaVideo } from "react-icons/fa6";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { userPostSchema } from "@/src/zod-Schemas/userPostSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ReusableCreatePostForm from "@/src/components/shared/ReusableCreatePostForm";
import { Trash2 } from "lucide-react";
import axios from "axios";
import { userPostType } from "@/src/types/dataTaype";
import { deletePost } from "@/src/store/postSlice";
import { useAppDispatch } from "@/src/store/useSelecterhook";

export default function CreatePostPage() {
  const { postId } = useParams();
  const [selectPostType, setSelectPostType] = useState("Discussion");
  const [postDeta, setPostDeta] = useState<userPostType | null>(null);
  const dispatch = useAppDispatch()

  const form = useForm<z.infer <typeof userPostSchema>>({
    resolver: zodResolver(userPostSchema),
    defaultValues: {
    tags: [],
  },
  });
  console.log("selectPostType", selectPostType)


  useEffect(() => {
    const getPost = async () => {
        try {
            const res = await axios.get(`/api/user/get/getPostByPostId?postId=${postId}`);
            setSelectPostType(res.data.data.postType)
            setPostDeta(res.data.data)
            console.log("post", res)

        } catch (error) {
          console.log("error fatching post by Id")   
        }

      };

    getPost();
}, [postId]);

  const removePost = async (postId: string) => {
    try {
      const response = await axios.delete(`/api/user/post/createpost/${postId}`);

      console.log(response.data);

      dispatch(deletePost(postId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen pt-20 md:pt-16 gap-6 p-4 sm:p-6 bg-[#FBFCFE] text-gray-900 dark:bg-[#0F172A] dark:text-gray-100">

    {/* LEFT */}
    <div className="flex-1 min-w-0">

        <div>

        {/* Card */}
        <div className="bg-white dark:bg-[#101827] rounded-2xl mt-6 shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 md:p-8">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div className="min-w-0">

                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                Edit Post
                </h1>

                <p className="text-gray-500 dark:text-gray-400 mt-2">
                Update your post details and make changes
                </p>

            </div>

            <div className="shrink-0">

                <CoustomButton
                onClick={() => removePost(postId as string)}
                className="
                    flex
                    w-full
                    sm:w-auto
                    items-center
                    justify-center
                    gap-3
                    px-4
                    py-3
                    text-sm
                    shadow-none
                    bg-red-50
                    dark:bg-red-950/30
                    border
                    border-red-200
                    dark:border-red-900
                    text-red-600
                    bg-none
                    dark:text-red-400
                    hover:bg-red-100
                    dark:hover:bg-red-950/50
                    transition
                "
                >
                <Trash2 size={18} />
                Delete post
                </CoustomButton>

            </div>

            </div>

            {/* Title */}
            {selectPostType && (

                <ReusableCreatePostForm
                    form={form}
                    postType={selectPostType}
                    mode="Edit"
                    postId={postId as string}
                    postDeta={postDeta}
                />

            )}

        </div>

        </div>

    </div>

    </div>
  );
}
