"use client";

import { useEffect, useState } from 'react'
import { Download, Eye, File, Star } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/src/store/useSelecterhook";
import { setPosts } from "@/src/store/postSlice";
import Image from "next/image";
import axios from 'axios';
import { handleLikesAndComments } from '@/src/services/ApiServices/handleLikesAndComments';


function page() {
      const [selectedImage, setSelectedImage] = useState<string | null>(null);
      const dispatch = useAppDispatch();
      const notesData = useAppSelector((state) => state.postData.posts)
      console.log("notesData", notesData)
      
      const getAllNotes = async () => {
        try {
          const response = await axios.get("/api/user/get/getallposts?type=notes");
    
          dispatch(setPosts(response.data.data))
    
        } catch (error) {
          console.log("getAllPosts api Error please check the community page api :", error);
    
        };
      };
    
        
      useEffect(() => {
        getAllNotes();
      }, []);
    return (
      <section className="mt-30 lg:mt-20 sm:mt-10 mx-3 sm:mx-6">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">

          {notesData.map((note) => (

            <div
              key={note._id}
              className="
                w-full
                bg-white dark:bg-[#101827]
                rounded-2xl
                overflow-hidden
                shadow-sm dark:shadow-none
                border border-gray-200 dark:border-gray-800
                hover:shadow-lg
                dark:hover:border-gray-700
                duration-300
              "
            >

              {/* Image */}
              <div className="relative h-36 sm:h-40 w-full">

                <Image
                  src={
                    note.postImageUrl?.length
                      ? note.postImageUrl[0]
                      : "/img/FileImg.png"
                  }
                  alt={note.title}
                  title="Click and open notes"
                  fill
                  className="object-cover cursor-pointer"
                  onClick={() =>
                    setSelectedImage(
                      note.postImageUrl?.[0] || ""
                    )
                  }
                />

                {/* Category */}
                <span
                  className="
                    absolute top-3 left-3
                    bg-green-500
                    text-white
                    text-xs
                    px-2 py-1
                    rounded
                  "
                >
                  {note.notesCategory}
                </span>

              </div>


              {/* Image Preview */}
              {selectedImage && (

                <div
                  className="
                    fixed inset-0 z-50
                    bg-black/40
                    backdrop-blur-sm
                    flex items-center justify-center
                    p-3 sm:p-5
                  "
                  onClick={() => setSelectedImage(null)}
                >

                  <Image
                    src={selectedImage}
                    alt="Preview"
                    width={1200}
                    height={800}
                    className="
                      max-w-[95vw]
                      max-h-[90vh]
                      object-contain
                      rounded-lg
                    "
                  />

                </div>

              )}


              {/* Content */}
              <div className="p-3 sm:p-4">

                <h3
                  className="
                    font-semibold
                    line-clamp-2
                    text-sm sm:text-base
                    text-gray-900 dark:text-white
                  "
                >
                  {note.title}
                </h3>


                <p
                  className="
                    text-xs sm:text-sm
                    text-gray-500 dark:text-gray-400
                    mt-2
                    truncate
                  "
                >
                  {note.author.userProfile?.profileName}
                </p>


                {/* Actions */}
                <div
                  className="
                    flex items-center justify-between
                    mt-4
                    text-gray-500 dark:text-gray-400
                    text-xs sm:text-sm
                  "
                >

                  <div className="flex items-center gap-1">

                    <Download size={15} />

                    <span>76</span>

                  </div>


                  <div className="flex items-center gap-1">

                    <Eye size={15} />

                    <span>100</span>

                  </div>


                  <button
                    onClick={() =>
                      handleLikesAndComments({
                        dispatch,
                        postId: note._id,
                      })
                    }
                    className={`
                      flex items-center gap-1
                      cursor-pointer
                      transition
                      ${
                        note.isLiked
                          ? "text-yellow-500"
                          : "text-gray-500 dark:text-gray-400"
                      }
                    `}
                  >

                    <Star
                      size={15}
                      fill="currentColor"
                    />

                    <span>ii</span>

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>
  );



}

export default page
