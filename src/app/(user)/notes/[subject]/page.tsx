"use client";

import NotesCard from "@/src/components/sections/notes/SubjectsNotes/NotesCard";
import axios, { AxiosError } from "axios";
import { deletePost, setPosts, toggleBookmark } from "@/src/store/postSlice";
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/src/store/useSelecterhook";
import { useParams } from "next/navigation";


export default function SubjectNotes() {
    const dispatch = useAppDispatch();
    const notesData = useAppSelector((state) => state.postData.posts)
    const params = useParams()
    const useParam = params.subject as string

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
    <main className="mx-auto p-6">

      {/* Hero/Search */}
      <section className="mb-10">

        <h1 className="text-4xl font-bold">
          Find Study Notes
        </h1>

        <input
          type="text"
          placeholder="Search Notes..."
          className="mt-5 w-full rounded-xl border p-3"
        />

      </section>

      {/* Latest Notes */}
      <section>

        <h2 className="mb-6 text-3xl font-semibold">
          {notesData.filter((noteType) => noteType.notesCategory === useParam.charAt(0).toLocaleUpperCase() + useParam.slice(1)).length >0? "Latest Notes" : `No ${useParam} notes available yet. Be the first to upload and help other students!`}
        </h2>

        <div className="space-y-5">
            {notesData.filter((noteType) => noteType.notesCategory === useParam.charAt(0).toLocaleUpperCase() + useParam.slice(1)).map((note) => (
                <NotesCard 
                    key={note._id}
                    notesPostId={note._id}
                    title="Integration Complete Notes"
                    thumbnail="/img/math.jpg"
                    authorName={note?.author.userProfile?.profileName || "Fatima Noor"}
                    authorImg={note?.author.userProfile?.profileImgUrl || "/img/defaultProfile.jfif"}
                    subject={ note && note.notesCategory}
                    className={note && note.className || "10th"}
                    fileUrl= {note && note.postDocumentUrl}
                    isBookmarked = {note.isBookmarked}
                    CountsLikes = {note.postLikesCount}
                    isLiked = {note.isLiked}
                    owner = {note?.author._id}
                    params = {useParam}
                />
            ))}

        </div>

      </section>

    </main>
  );
}