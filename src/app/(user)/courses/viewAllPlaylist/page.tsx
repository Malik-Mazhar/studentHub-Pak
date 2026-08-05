"use client";

import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from "@/src/store/useSelecterhook";
import axios from 'axios';
import PlaylistCard from '@/src/components/shared/playlist/PlaylistCard';
import { useRouter } from 'next/navigation';
import { setPlaylists } from '@/src/store/playlistSlice';

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
    const playlistData = useAppSelector((state) => state.playlist.playlists)
    const router = useRouter();
      
    const getAllPlaylist = async () => {
    try {
      const playlistResponse = await axios.get("/api/user/get/getPlaylistData");

      dispatch(setPlaylists(playlistResponse.data.data));

    } catch (error) {
        console.log("getAllPosts api Error please check the community page api :", error);

    };
    };

    
    useEffect(() => {
    getAllPlaylist();
    }, []);
    return (
        <section className="pt-10 mx-6">

            <h1 className="text-2xl font-bold">
                Featured Courses
            </h1>

            <p className="text-gray-500">
                Explore community-shared YouTube playlists and start learning today.
            </p>


            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 pt-5 gap-6">

                {playlistData.map((playlist) => (
                    <PlaylistCard
                        key={playlist._id}
                        thumbnail={playlist.thumbnail}
                        createdAt={playlist.createdAt}
                        title={playlist.title}
                        category={playlist.category}
                        videoCount={playlist.videoCount}
                        duration={playlist.duration}
                        fullname={playlist.author.userProfile.profileName}
                        profileImage={playlist.author.userProfile?.profileImage}
                        description={playlist.description}
                        onClick={() => router.push(`/courses/${playlist._id}`)}
                    />
                    ))}
            </div>
        
        </section>
    );



}

export default page
