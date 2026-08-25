'use client';

import CoustomButton from "@/src/components/shared/CustomButton"
import { useRouter } from "next/navigation";
import { useState } from "react";
import {FaArrowLeft, FaComments, FaFileAlt, FaQuestionCircle, FaPoll, FaLink,} from "react-icons/fa";
import { FaVideo } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import z from "zod";
import { userPostSchema } from "@/src/zod-Schemas/userPostSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/src/store/useSelecterhook";
import ReusableCreatePostForm from "@/src/components/shared/ReusableCreatePostForm";
import SharePlaylist from "@/src/components/shared/playlist/SharePlaylistForm";

export default function CreatePostPage() {
  const router = useRouter();
  const [selectPostType, setSelectPostType] = useState("Discussion");
  const [postMode, setPostMode] = useState("simple");
  const [question, setQuestion] = useState("");
  const [duration, setDuration] = useState("");
  const [videoType, setVideoType] = useState("video");
  const dispatch = useAppDispatch();

  const form = useForm<z.infer <typeof userPostSchema>>({
    resolver: zodResolver(userPostSchema),
    defaultValues: {
    tags: [],
    
  },
  });

  const [options, setOptions] = useState([
    { id: 1, value: "" },
    { id: 2, value: "" },
  ]);

  const addOption = () => {
    setOptions([
      ...options,
      {
        id: Date.now(),
        value: "",
      },
    ]);
  };

  const updateOption = (id: number, value: string) => {
    setOptions(
      options.map((option) =>
        option.id === id ? { ...option, value } : option
      )
    );
  };

  const removeOption = (id: number) => {
    if (options.length <= 2) return;

    setOptions(options.filter((option) => option.id !== id));
  };

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

  const findUserSelectPostType = postTypes.find((selectType) => selectType.title === selectPostType)

  return (
      <div className="flex flex-col gap-4 sm:gap-6 p-3 pt-28 sm:p-5 lg:p-6 bg-[#FBFCFE] dark:bg-[#0F172A] min-h-screen">

        {/* LEFT */}
        <div className="flex-1 min-w-0">

          <div>

            {/* Back */}
            <CoustomButton
              onClick={() => router.push("/community")}
              className=" flex items-center gap-2 sm:gap-3 text-gray-700 dark:text-gray-300 bg-transparent shadow-none hover:text-[#0aa382] transition text-sm sm:text-base "
            >
              <FaArrowLeft />

              <span className="font-medium">
                Back to Community
              </span>
            </CoustomButton>


            {/* Card */}
            <div className=" bg-white dark:bg-[#101827] rounded-2xl mt-4 sm:mt-6 shadow-sm dark:shadow-none border border-gray-200 dark:border-gray-800 p-4 sm:p-6 lg:p-8">

              {/* Header */}
              <div className=" flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

                <div className="min-w-0">

                  <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">

                    {postMode === "simple"
                      ? "Create New Post"
                      : findUserSelectPostType?.postTitle
                    }
                  </h1>

                  <p
                    className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-2 leading-6 ">

                    {postMode === "simple"
                      ? "Share your knowledge, help others and be a part of our community."
                      : findUserSelectPostType?.content
                    }
                  </p>

                </div>


                {/* Advanced / Simple Button */}
                <div className="shrink-0">

                  {postMode === "advanced" ? (

                    <CoustomButton
                      onClick={() => setPostMode("simple")}
                      className="text-sm whitespace-nowrap"
                    >
                      Back to simple post
                    </CoustomButton>

                  ) : (

                    <CoustomButton
                      onClick={() => setPostMode("advanced")}
                      className="text-sm whitespace-nowrap"
                    >
                      + Advanced post options
                    </CoustomButton>

                  )}

                </div>

              </div>


              {/* Post Types */}
              {postMode === "advanced" && (

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 mt-6 sm:mt-8 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">

                  {postTypes.map((item) => {

                    const Icon = item.icon;

                    return (
                      <button
                        key={item.id}
                        onClick={() => setSelectPostType(item.title)}
                        className={`flex flex-col items-center justify-center gap-2 sm:gap-3 py-3 sm:py-4 border-r border-b border-gray-200 dark:border-gray-700 cursor-pointer transition last:border-r-0

                          ${
                            selectPostType === item.title
                              ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400"
                              : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                          }
                        `}
                      >

                        <Icon size={22} />

                        <span className="font-medium text-sm sm:text-base text-center">
                          {item.title}
                        </span>

                      </button>
                    );

                  })}

                </div>

              )}


              {/* Discussion */}
              {findUserSelectPostType &&
                findUserSelectPostType.title === "Discussion" && (

                  <ReusableCreatePostForm
                    form={form}
                    postType="Discussion"
                  />

              )}


              {/* Video */}
              {findUserSelectPostType &&
                findUserSelectPostType.title === "Video" && (

                  <div className="relative mt-4 sm:mt-0">

                    <select
                      value={videoType}
                      onChange={(e) => setVideoType(e.target.value)}
                      className={`
                        absolute
                        right-0
                        ${
                          videoType === "video"
                            ? "-top-5 sm:-top-6"
                            : "top-27 sm:top-29"
                        }
                        bg-gray-800
                        text-white
                        border border-gray-700
                        rounded-lg
                        px-3 sm:px-4
                        py-2
                        text-sm
                        z-10
                        max-w-[calc(100%)]
                        cursor-pointer
                      `}
                    >

                      <option value="video">
                        Single Video
                      </option>

                      <option value="playlist">
                        YouTube Playlist
                      </option>

                    </select>


                    {videoType === "video" ? (

                      <ReusableCreatePostForm
                        form={form}
                        postType="Video"
                      />

                    ) : (

                      <SharePlaylist />

                    )}

                  </div>

              )}


              {/* Notes */}
              {findUserSelectPostType &&
                findUserSelectPostType.title === "Notes" && (

                  <ReusableCreatePostForm
                    form={form}
                    postType="Notes"
                  />

              )}

            </div>

          </div>

        </div>

      </div>
  );
}
