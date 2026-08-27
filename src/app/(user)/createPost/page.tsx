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
import { Plus, Trash2 } from "lucide-react";

export default function CreatePostPage() {
  const router = useRouter();
  const [selectPostType, setSelectPostType] = useState("Discussion");
  const [postMode, setPostMode] = useState("simple");
  const [question, setQuestion] = useState("");
  const [duration, setDuration] = useState("");
  const [videoType, setVideoType] = useState("video");
  const [correctOption, setCorrectOption] = useState<number | null>(null);
  const [pollQuestion, setPollQuestion] = useState("");
  const dispatch = useAppDispatch();

  const form = useForm<z.infer <typeof userPostSchema>>({
    resolver: zodResolver(userPostSchema),
    defaultValues: {
    tags: [],

    pollOptions: [
      { value: "" },
      { value: "" },
    ],
    pollDuration: undefined,
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

  const deleteOption = (id: number) => {
    // Kam az kam 2 options rehne dein
    if (options.length <= 2) return;

    setOptions((prev) => prev.filter((option) => option.id !== id));

    // Agar deleted option correct answer tha
    if (correctOption === id) {
      setCorrectOption(null);
    }
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

              {findUserSelectPostType && findUserSelectPostType.title === "Question" &&
              // <div>
              //         {/* Question */}
              //     <div className="mb-7">
              //       <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
              //         Question <span className="text-red-500">*</span>
              //       </label>

              //       <input
              //         type="text"
              //         value={question}
              //         onChange={(e) => setQuestion(e.target.value)}
              //         placeholder="What do you want to ask?"
              //         className="w-full h-11 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111827] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
              //       />
              //     </div>

              //     {/* Options */}
              //     <div className="mb-7">
              //       <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">
              //         Options <span className="text-red-500">*</span>
              //       </label>

              //       <div className="space-y-3">
              //         {options.map((option) => (
              //           <div
              //             key={option.id}
              //             className="flex items-center gap-3"
              //           >
              //             {/* Correct answer radio */}
              //             <input
              //               type="radio"
              //               name="correctOption"
              //               checked={correctOption === option.id}
              //               onChange={() => setCorrectOption(option.id)}
              //               className="w-4 h-4 shrink-0 cursor-pointer"
              //             />

              //             {/* Option input */}
              //             <input
              //               type="text"
              //               value={option.value}
              //               onChange={(e) =>
              //                 updateOption(option.id, e.target.value)
              //               }
              //               placeholder={`Option ${options.indexOf(option) + 1}`}
              //               className="flex-1 min-w-0 h-11 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111827] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
              //             />

              //             {/* Delete */}
              //             <button
              //               type="button"
              //               onClick={() => deleteOption(option.id)}
              //               disabled={options.length <= 2}
              //               className="w-11 h-11 shrink-0 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 disabled:opacity-40 disabled:cursor-not-allowed"
              //             >
              //               <Trash2 size={17} />
              //             </button>
              //           </div>
              //         ))}
              //       </div>

              //       {/* Add option */}
              //       <button
              //         type="button"
              //         onClick={addOption}
              //         className="mt-4 flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
              //       >
              //         <Plus size={17} />
              //         Add Option
              //       </button>

              //       <p className="mt-2 text-xs text-gray-400">
              //         Select the radio button to mark the correct answer.
              //       </p>
              //     </div>

              //     {/* Duration */}
              //     <div className="mb-8">
              //       <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
              //         Question Duration
              //         <span className="text-gray-400 font-normal ml-1">
              //           (Optional)
              //         </span>
              //       </label>

              //       <select
              //         value={duration}
              //         onChange={(e) => setDuration(e.target.value)}
              //         className="w-full h-11 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111827] text-gray-700 dark:text-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
              //       >
              //         <option value="">Select duration</option>
              //         <option value="15">15 seconds</option>
              //         <option value="30">30 seconds</option>
              //         <option value="60">1 minute</option>
              //         <option value="120">2 minutes</option>
              //         <option value="300">5 minutes</option>
              //       </select>
              //     </div>

              //     {/* Buttons */}
              //     <div className="flex items-center justify-end gap-3">
              //       <button
              //         type="button"
              //         className="px-5 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              //       >
              //         Cancel
              //       </button>

              //       <button
              //         type="submit"
              //         className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold"
              //       >
              //         Create Question
              //       </button>
              //     </div>
              // </div>
                  <ReusableCreatePostForm
                    form={form}
                    postType="Question"
                  />
              }

              {findUserSelectPostType && findUserSelectPostType.title === "Poll" && 
                  <ReusableCreatePostForm
                    form={form}
                    postType="Poll"
                  />
 
              }

            </div>

          </div>

        </div>

      </div>
  );
}


// import { useState } from "react";
// import { Trash2, Plus } from "lucide-react";

// const CreateQuestion = () => {
//   const [question, setQuestion] = useState("");

//   const [options, setOptions] = useState([
//     { id: 1, text: "" },
//     { id: 2, text: "" },
//   ]);

//   const [correctOption, setCorrectOption] = useState<number | null>(null);

//   const [duration, setDuration] = useState("");

//   // Add new option
//   const addOption = () => {
//     setOptions((prev) => [
//       ...prev,
//       {
//         id: Date.now(),
//         text: "",
//       },
//     ]);
//   };

//   // Delete option
//   const deleteOption = (id: number) => {
//     // Kam az kam 2 options rehne dein
//     if (options.length <= 2) return;

//     setOptions((prev) => prev.filter((option) => option.id !== id));

//     // Agar deleted option correct answer tha
//     if (correctOption === id) {
//       setCorrectOption(null);
//     }
//   };

//   // Option text update
//   const updateOption = (id: number, value: string) => {
//     setOptions((prev) =>
//       prev.map((option) =>
//         option.id === id
//           ? { ...option, text: value }
//           : option
//       )
//     );
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     const data = {
//       question,
//       options,
//       correctOption,
//       duration,
//     };

//     console.log("Question Data:", data);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-2xl mx-auto p-6 bg-white dark:bg-[#0f172a] rounded-2xl border border-gray-200 dark:border-gray-700"
//     >

//     </form>
//   );
// };

// export default CreateQuestion;