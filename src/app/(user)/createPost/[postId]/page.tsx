'use client';

import CoustomButton from "@/src/components/shared/CustomButton"
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaArrowLeft,
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

export default function CreatePostPage() {
  const { postId } = useParams();
  const [selectPostType, setSelectPostType] = useState("Discussion");
  const [postMode, setPostMode] = useState("simple");
  console.log("findUserSelectPostType", ) 

    const form = useForm<z.infer <typeof userPostSchema>>({
    resolver: zodResolver(userPostSchema),
    defaultValues: {
    tags: [],
  },
  });

  const postTypes = [
    {
      id: 1,
      title: "Discussion",
      postTitle: "General Discussion",
      content: "Share your thoughts, ask opinions, and start meaningful discussions with the community.",
      icon: FaComments,
      active: true,
    },
    {
      id: 2,
      title: "Notes",
      postTitle: "Share Notes",
      content: "Share your study notes to help others learn and revise important topics.",
      icon: FaFileAlt,
    },
    {
      id: 6,
      title: "Video",
      postTitle: "Share Video",
      content: "Share educational videos, tutorials, and explanations with your community.",
      icon: FaVideo
    },
    {
      id: 3,
      title: "Question",
      postTitle: "Ask Question",
      content: "Ask your questions and get help from the community quickly and easily.",
      icon: FaQuestionCircle,
    },
    {
      id: 4,
      title: "Poll",
      postTitle: "Vote & Decide",
      content: "Create polls and let others vote to share their opinions easily.",
      icon: FaPoll,
    },
    {
      id: 5,
      title: "Resource",
      postTitle: "Share Resource",
      content: "Share useful links, files, and resources to help others learn and grow.",
      icon: FaLink,
    },
  ];

  useEffect(() => {
  const getPost = async () => {
    try {
        const res = await axios.get(`/api/user/get/getPostByPostId?postId=${postId}`);
        setSelectPostType(res.data.data.postType)
        console.log("post", res)
        form.reset({
        title: res.data.data.title,
        content: res.data.data.content,
        category: res.data.data.category,
        tags: res.data.data.tags,
        // baki fields...
        });
    } catch (error) {
       console.log("error fatching post by Id")   
    }

  };

  getPost();
}, [postId]);

  const findUserSelectPostType = postTypes.find((selectType) => selectType.title === selectPostType.charAt(0).toLocaleUpperCase() + selectPostType.slice(1))
       console.log("findUserSelectPostType", findUserSelectPostType)  

  return (
    <div className="flex gap-6 p-6 bg-[#FBFCFE] min-h-screen">

      {/* LEFT */}
      <div className="flex-1">

        <div>


          {/* Card */}

          <div className="bg-white rounded-2xl mt-6 shadow-sm border border-gray-200 p-8">

           <div className="flex items-center justify-between">
                <div>
                
                <h1 className="text-2xl font-bold text-gray-800">             
                    Edit Post
                </h1>

                <p className="text-gray-500 mt-2">
                    Update your post details and make changes
                </p>
                </div>

                <div>

                    <CoustomButton
                        onClick={() => setPostMode("advanced")}
                        className="flex w-full items-center gap-3 px-4 py-3 text-sm shadow-none bg-none bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 transitio"
                    >
                         <Trash2 size={18} />
                        Delete post
                    </CoustomButton>

                </div>

           </div>



            
        {/* Title */}
          {findUserSelectPostType && findUserSelectPostType.title === "Discussion" && 

            <ReusableCreatePostForm
                form={form}
                postType="Discussion"
            />
          }

          {findUserSelectPostType && findUserSelectPostType.title === "Notes" && 

            <ReusableCreatePostForm
                form={form}
                postType="Notes"
            />
          }

          </div>

        </div>


      </div>
    </div>
  );
}
