"use client";

import { useEffect } from 'react'
import { Download, Eye, File, Star } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/src/store/useSelecterhook";
import { setPosts } from "@/src/store/postSlice";
import Image from "next/image";
import axios from 'axios';

const notes = [
  {
    image: "/img/math.jpg",
    subject: "Math",
    title: "Full Chapter Notes",
    author: "Ali Khan",
    downloads: "1.2k",
    views: "5k",
    rating: 4.8,
  },
    {
    image: "/img/math.jpg",
    subject: "Mathmm",
    title: "Full Chapter Notes",
    author: "Ali Khan",
    downloads: "1.2k",
    views: "5k",
    rating: 4.8,
  },
    {
    image: "/img/math.jpg",
    subject: "Matmmh",
    title: "Full Chapter Notes",
    author: "Ali Khan",
    downloads: "1.2k",
    views: "5k",
    rating: 4.8,
  },
  {
    image: "/img/phisics.jpg",
    subject: "Physics",
    title: "Numerical Notes",
    author: "Usman",
    downloads: "980",
    views: "4.2k",
    rating: 4.9,
  },
  {
    image: "/img/Biology.jfif",
    subject: "Chemistry",
    title: "Organic Chemistry",
    author: "Ahmed",
    downloads: "850",
    views: "3.5k",
    rating: 4.7,
  },
  {
    image: "/img/math.jpg",
    subject: "Biology",
    title: "Complete Chapter",
    author: "Fatima",
    downloads: "730",
    views: "2.9k",
    rating: 4.8,
  },
  
];

function page() {
  
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
        <section className="mt-10 mx-6">

          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 space-y-5">
            
            {notes.map((note) => (
                <div key={note.subject} className="min-w-60 bg-white rounded-2xl overflow-hidden shadow-sm border hover:shadow-lg duration-300">
              
                  <div>
                      <div className="relative h-36 w-full">

                        <Image
                        src={note.image}
                        alt={note.title}
                        fill
                        className="object-cover"
                        /> 

                        <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded">
                          {note.subject}
                        </span>

                    </div>

                    <div className="p-4">

                        <h3 className="font-semibold line-clamp-2">
                          {note.title}
                        </h3>

                        <p className="text-sm text-gray-500 mt-2">
                        {note.author}
                        </p>

                        <div className="flex items-center justify-between mt-4 text-gray-500 text-sm">

                        <div className="flex items-center gap-1">
                            <Download size={15} />
                            76
                        </div>

                        <div className="flex items-center gap-1">
                            <Eye size={15} />
                            100
                        </div>

                        <div  className={`flex items-center gap-1 cursor-pointer "text-yellow-500"`}>
                            <Star size={15} fill="currentColor" />
                            ii
                        </div>

                        </div>

                    </div>
                  </div>
                </div>

            ))}

          </div>
        </section>
  );



}

export default page
