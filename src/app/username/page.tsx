"use client";

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
import { FaVideo } from "react-icons/fa6";

export default function CreatePostPage() {
  const router = useRouter();
  const[selectPostType, setSelectPostType] = useState("Discussion");
  const [postMode, setPostMode] = useState("simple");

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
            <form action="">

                <div className="mt-8">

                  <CustomInput
                    label={`Post Title`}
                    type="text"
                    placeholder="Give your post a short title..."
                    optional = {true}
                    className="w-full h-12 rounded-xl border border-gray-300 px-4 outline-none focus:border-blue-500"
                  />

                </div>

                {/* Description */}

                <div className="mt-6">

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Write Something
                    <span className="text-red-500">*</span>
                  </label>

                  <textarea
                    rows={8}
                    placeholder="Write your post content here..."
                    className="w-full rounded-xl border border-gray-300 p-4 resize-none outline-none focus:border-blue-500"
                  />

                </div>

                {/* Category */}

                <div className="mt-6">

                  <CustomSelect 
                    label="Category"
                    value=""
                    onChange={() => ""}
                    options={["General Discussion", "Education", "Technology", "Science", "Career"]}
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

                    <div className="text-5xl">
                      ☁️
                    </div>

                    <h3 className="font-semibold mt-4">

                      Drag & Drop files here

                    </h3>

                    <p className="text-gray-500 mt-2">

                      or click to browse

                    </p>

                    <p className="text-xs text-gray-400 mt-2">

                      PDF • DOC • PPT • Image • Video

                    </p>

                  </div>

                </div>

                {/* Tags */}

                <div className="mt-6">

                  <CustomTagInput 
                            label="Tags"
                    tags={[]}
                    setTags={() => ["XXXX", ""]}
                    max={5}
                  />

                </div>

                {/* Bottom */}

                <div className="flex justify-between items-center mt-10">

                  <CustomSelect
                    label="Visibility"
                    value=""
                    onChange={() => ""}
                    options={["Everyone", "Only Members", "Private"]}
                  />

                  <CoustomButton
                    className="px-10 h-10 rounded-xl"
                  >

                    Publish Post

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
              <form action="">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">

                      <h1 className="text-3xl font-bold text-gray-800">
                          Ask a Question
                      </h1>

                      <p className="text-gray-500 mt-2">
                          Ask your question and get help from the community.
                      </p>

                      <div className="space-y-6 mt-8">

                          {/* Question Title */}
                          <div>
                              <label className="block font-medium text-gray-700 mb-2">
                                  Question Title
                              </label>

                              <input
                                  type="text"
                                  placeholder="e.g. How do I use useEffect in React?"
                                  className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
                              />
                          </div>

                          {/* Description */}
                          <div>
                              <label className="block font-medium text-gray-700 mb-2">
                                  Describe Your Problem
                              </label>

                              <textarea
                                  rows={6}
                                  placeholder="Explain your problem in detail..."
                                  className="w-full border rounded-xl p-3 resize-none outline-none focus:ring-2 focus:ring-blue-500"
                              />
                          </div>

                          {/* Category */}
                          <div>
                              <label className="block font-medium text-gray-700 mb-2">
                                  Category
                              </label>

                              <select className="w-full border rounded-xl p-3">
                                  <option>Select Category</option>
                                  <option>Programming</option>
                                  <option>Mathematics</option>
                                  <option>Science</option>
                              </select>
                          </div>

                          {/* Tags */}
                          <div>
                              <label className="block font-medium text-gray-700 mb-2">
                                  Tags
                              </label>

                              <input
                                  type="text"
                                  placeholder="React, JavaScript, Next.js"
                                  className="w-full border rounded-xl p-3"
                              />
                          </div>

                          {/* Attachment */}
                          <div>
                              <label className="block font-medium text-gray-700 mb-2">
                                  Attachment (Optional)
                              </label>

                              <input
                                  type="file"
                                  accept="image/*"
                                  className="w-full border rounded-xl p-3"
                              />
                          </div>

                          {/* Buttons */}
                          <div className="flex justify-end gap-4">

                              <button className="px-6 py-3 rounded-xl border">
                                  Cancel
                              </button>

                              <button className="px-6 py-3 rounded-xl bg-blue-600 text-white">
                                  Post Question
                              </button>

                          </div>

                      </div>

                  </div>
              </form>
            }

          </div>

        </div>


      </div>
    </div>
  );
}

