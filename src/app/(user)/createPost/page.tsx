'use client';

import CoustomButton from "@/src/components/shared/CustomButton"
import { useRouter } from "next/navigation";
import CustomInput from "@/src/components/shared/CustomInput";
import CustomSelect from "@/src/components/shared/CustomSelect";
import CustomTagInput from "@/src/components/shared/CustomTagInput";
import { useState } from "react";
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
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/src/lib/apiResponse";
import { useDispatch } from "react-redux";
import { addPost } from "@/src/store/postSlice";
import { useAppDispatch } from "@/src/store/useSelecterhook";
import ImageUpload from "@/src/components/ImageUpload";
import { Loader2 } from "lucide-react";

export default function CreatePostPage() {
  const router = useRouter();
  const [isSubmitting ,setIsSubmitting] = useState(false);
  const [postImageSelect, setPostImageSelect] = useState<File | null>(null);
  const [postVideoSelect, setPostVideoSelect] = useState<File | null>(null);
  const [postImagePerview, setPostImagePerview] = useState<string | null>(null);
  const [postVideoPerview, setPostVideoPerview] = useState<string | null>(null);
  const [selectPostType, setSelectPostType] = useState("Discussion");
  const [postMode, setPostMode] = useState("simple");
  const [question, setQuestion] = useState("");
  const [duration, setDuration] = useState("");
  const dispatch = useAppDispatch();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<z.infer <typeof userPostSchema>>({
    resolver: zodResolver(userPostSchema),
    defaultValues: {
    tags: [],
  },
  });

  const onSubmit = async (data: z.infer<typeof userPostSchema>) => {
    setIsSubmitting(true);
    const payload = {
      ...data,
      postType: selectPostType.toLowerCase()
    }
    console.log("deta", payload)

    try {
      const formData = new FormData();

      for (const [key, value] of Object.entries(payload)) {
        formData.append(key, String(value ?? ""));
      };

      if (postImageSelect) {
          formData.append("postImage", postImageSelect);
      }; 

      if (postVideoSelect) {
          formData.append("coverImg", postVideoSelect);
      };

      const response = await axios.post("/api/user/createpost", formData);

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
    console.log("check file type:", file)

    if (file.type.startsWith("image/")) {
      setPostImageSelect(file);
      setPostImagePerview(url);
    }

    if (file.type.startsWith("video/")) {
      setPostVideoSelect(file);
      setPostVideoPerview(url);
    }
  };

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
    <div className="flex gap-6 p-6 bg-[#FBFCFE] min-h-screen">

      {/* LEFT */}
      <div className="flex-1">

        <div>

          {/* Back */}

          <CoustomButton onClick={() => router.push("/community")} className="flex items-center gap-3 text-gray-700 bg-none shadow-none hover:text-[#0aa382] transition">

            <FaArrowLeft />

            <span className="font-medium">
              Back to Community
            </span>

          </CoustomButton>

          {/* Card */}

          <div className="bg-white rounded-2xl mt-6 shadow-sm border border-gray-200 p-8">

           <div className="flex items-center justify-between">
            <div>
              
              <h1 className="text-2xl font-bold text-gray-800">             
                {postMode === "simple"? "Create New Post" : findUserSelectPostType?.postTitle}
              </h1>

              <p className="text-gray-500 mt-2">
                {postMode === "simple"? "Share your knowledge, help others and be a part of our community." : findUserSelectPostType?.content}
              </p>
            </div>

              <div>

                {postMode === "advanced" ? 

                  <CoustomButton
                    onClick={() => setPostMode("simple")}
                    className="text-sm mt-2"
                  >
                    Back to simple post
                  </CoustomButton>

                  :

                  <CoustomButton
                    onClick={() => setPostMode("advanced")}
                    className="text-sm mt-2"
                  >
                    + Advanced post options
                  </CoustomButton>
                }

              </div>

           </div>

            {/* Post Types */}
            {postMode === "advanced" &&

                <div className="grid grid-cols-6 mt-8 border rounded-xl overflow-hidden">

                  {postTypes.map((item) => {

                    const Icon = item.icon;

                    return (
                      <button
                        key={item.id}
                        onClick={() => setSelectPostType(item.title)}
                        className={`flex flex-col items-center justify-center gap-3 py-4 border-r cursor-pointer last:border-r-0 transition

                        ${
                          selectPostType === item.title
                            ? "bg-blue-50 text-blue-600"
                            : "hover:bg-gray-50 text-gray-700"
                        }
                        
                        `}
                      >
                        <Icon size={24} />

                        <span className="font-medium">
                          {item.title}
                        </span>

                      </button>
                    );
                  })}
                </div>

            }



            
        {/* Title */}
          {findUserSelectPostType && findUserSelectPostType.title === "Discussion" && 
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="mt-8">

                  <CustomInput
                    label={`Post Title`}
                    type="text"
                    placeholder="Give your post a short title..."
                    optional = {true}
                    {...register("title")}
                    className="w-full h-12 rounded-xl border border-gray-300 px-4 outline-none focus:border-blue-500"
                  />

                </div>
                 <input type="hidden" value={selectPostType} {...register("postType")} />
                {/* Description */}

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

                {/* Category */}

                <div className="mt-6">

                  <CustomSelect 
                    label="Category"
                    options={["General Discussion", "Education", "Technology", "Science", "Career"]}
                    {...register("category")}
                  />

                </div>

                {/* Upload */}

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

                {/* Bottom */}

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
          }
          {findUserSelectPostType && findUserSelectPostType.title === "Video" && 
          <form>

            {/* TITLE (Required) */}
            <div className="mt-8">
              <CustomInput
                label="Video Title"
                type="text"
                placeholder="Give your video a clear title..."
                optional= {true}
              />
            </div>

            {/* VIDEO LINK (MOST IMPORTANT) */}
            <div className="mt-6">
              <CustomInput
                label="Video Link"
                type="text"
                placeholder="Paste YouTube or video URL..."
                optional= {true}
              />
            </div>

            {/* DESCRIPTION */}
            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>

              <textarea
                rows={6}
                placeholder="Explain what this video is about..."
                className="w-full rounded-xl border border-gray-300 p-4 resize-none outline-none focus:border-blue-500"
              />
            </div>

            {/* CATEGORY */}
            <div className="mt-6">
              <CustomSelect
                label="Category"
                value=""
                onChange={() => ""}
                options={["Education", "Tutorial", "Lecture", "Entertainment", "Other"]}
              />
            </div>

            {/* THUMBNAIL (OPTIONAL BUT IMPORTANT) */}
            <div className="mt-6">
              <label className="block text-sm font-semibold mb-2">
                Thumbnail (Optional)
              </label>

              <div className="border-2 border-dashed rounded-2xl py-10 flex flex-col items-center">
                <div className="text-4xl">🎬</div>
                <p className="text-gray-500 mt-2">Upload video thumbnail</p>
              </div>
            </div>

            {/* TAGS */}
            <div className="mt-6">
              <CustomTagInput
                label="Tags"
                tags={[]}
                setTags={() => {}}
                max={5}
              />
            </div>

            {/* VISIBILITY + SUBMIT */}
            <div className="flex justify-between items-center mt-10">

              <CustomSelect
                label="Visibility"
                value=""
                onChange={() => ""}
                options={["Everyone", "Only Members", "Private"]}
              />

              <CoustomButton className="px-10 h-10 rounded-xl">
                Publish Video
              </CoustomButton>

            </div>

          </form>
          }

          {findUserSelectPostType && findUserSelectPostType.title === "Notes" && 
            <form action="">

                <div className="mt-8 space-y-6">

                  <CustomInput
                    label="Notes Title"
                    type="text"
                    placeholder="Enter your notes title"
                    optional = {true}
                  />

                  {/* Description */}
                  <div>
                    <label className="font-medium text-gray-700">
                      Description
                    </label>

                    <textarea
                      rows={5}
                      placeholder="Write a short description..."
                      className="w-full mt-2 border rounded-xl p-3 resize-none"
                    />
                  </div>

                  {/* Upload */}
                  <div>
                    <label className="font-medium text-gray-700">
                      Upload Notes
                    </label>

                    <div className="border-2 border-dashed rounded-xl p-10 text-center mt-2">
                      <p className="text-gray-500">
                        Drag & Drop your PDF, DOCX or PPT
                      </p>

                      <input
                        type="file"
                        className="mt-4"
                      />
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <CustomSelect 
                    label="Category"
                    value=""
                    onChange={() => ""}
                    options={["General Discussion", "Education", "Technology", "Science", "Career"]}
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-end gap-3">
                    <button className="px-5 py-3 rounded-xl border">
                      Cancel
                    </button>

                    <CoustomButton className="px-5 py-3 rounded-xl bg-blue-600 text-white">
                      Publish Notes
                    </CoustomButton>
                  </div>

                </div>

            </form>
          }

            {findUserSelectPostType && findUserSelectPostType.title === "Question" && 
              <form className="space-y-6">

                {/* Poll Question */}
                <div>
                  <label className="block mb-2 font-semibold">
                    Poll Question
                    <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="What do you want to ask?"
                    className="w-full h-12 border rounded-xl px-4 outline-none"
                  />
                </div>

                {/* Options */}
                <div>
                  <label className="block mb-2 font-semibold">
                    Options
                    <span className="text-red-500">*</span>
                  </label>

                  <div className="space-y-3">

                    {options.map((option, index) => (
                      <div
                        key={option.id}
                        className="flex items-center gap-3"
                      >

                        <input
                          type="radio"
                          disabled
                        />

                        <input
                          type="text"
                          value={option.value}
                          onChange={(e) =>
                            updateOption(option.id, e.target.value)
                          }
                          placeholder={`Option ${index + 1}`}
                          className="flex-1 h-12 border rounded-xl px-4 outline-none"
                        />

                        <button
                          type="button"
                          onClick={() => removeOption(option.id)}
                          className="w-12 h-12 border rounded-xl flex items-center justify-center"
                        >
                          <FaTrash />
                        </button>

                      </div>
                    ))}

                  </div>

                  <button
                    type="button"
                    onClick={addOption}
                    className="mt-4 text-blue-600 font-medium"
                  >
                    + Add Option
                  </button>
                </div>

                {/* Duration */}
                <div>
                  <label className="block mb-2 font-semibold">
                    Poll Duration
                    <span className="text-gray-400">
                      {" "} (Optional)
                    </span>
                  </label>

                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full h-12 border rounded-xl px-4"
                  >
                    <option value="">Select duration</option>
                    <option value="1">1 Day</option>
                    <option value="3">3 Days</option>
                    <option value="7">7 Days</option>
                    <option value="14">14 Days</option>
                    <option value="30">30 Days</option>
                  </select>
                </div>

                {/* Submit */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-8 h-11 rounded-xl"
                  >
                    Create Poll
                  </button>
                </div>

              </form>
            }

          </div>

        </div>


      </div>
    </div>
  );
}
