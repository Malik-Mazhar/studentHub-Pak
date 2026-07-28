
"use client"
// import SearchBar from "@/src/components/sections/notes/SearchBar";
// import FilterTabs from "@/src/components/sections/notes/FilterTabs";
// import HeroBanner from "@/src/components/sections/notes/HeroBanner";
// import RecentNotes from "@/src/components/sections/notes/RecentNotes";
// import SubjectsSection from "@/src/components/sections/notes/SubjectsSection";
// import TopNotesSection from "@/src/components/sections/notes/TopNotesSection";
// import Newsletter from "@/src/components/sections/notes/Newsletter";
// import Footer from "@/src/components/sections/notes/Footer";
// import { FaDownload, FaRegBookmark, FaStar } from "react-icons/fa6";
// import NotesCard from "@/src/components/sections/notes/SubjectsNotes/NotesCard";

// import axios from "axios";
// import { useEffect, useState } from "react";

// function CoursePlayer() {
//   const playlistId = "PLGjplNEQ1it8-0CmoljS5yeV-GlKSUEt0";
// const [video, setVideo] = useState<any[]>([]);

// const getYoutubeVideos = async () => {
//   try {
//     const res = await fetch(
//       "http://localhost:3000/api/services/youtube"
//     );

//     const data = await res.json();

//     setVideo(data.items);

//     console.log("youtube response", data);

//   } catch (error) {
//     console.log("Youtube Error", error);
//   }
// };
// useEffect(() => {
  
//   getYoutubeVideos();
// }, [])
//   return (
// //     <iframe
// //   src="https://www.youtube.com/embed/videoseries?list=PLGjplNEQ1it8-0CmoljS5yeV-GlKSUEt0"
// //   title="YouTube Playlist"
// //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
// // />
// <div>
//   <h1>Youtube response</h1>

//   {video.map((video: any) => (
//   <div key={video.id.videoId}>
//     {/* <img 
//       src={video.snippet.thumbnails.medium.url}
//       alt={video.snippet.title}
//     /> */}

//     {/* <h2>{video.snippet.title}</h2>

//     <p>{video.snippet.channelTitle}</p> */}

//     <iframe
//       src={`https://www.youtube.com/embed/${video.id.videoId}`}
//       width="100%"
//       height="500"
//       allowFullScreen
//       title={video.snippet.title}
//     />
//   </div>
// ))}
// </div>
//   );
// };

// export default CoursePlayer




// "use client";

import { useEffect, useState } from "react";

export default function CoursePlayer() {

  const [videos, setVideos] = useState<any[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [playlist, setPlaylist] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);


  const getYoutubeVideos = async () => {
    const res = await fetch("/api/services/youtube");
    const data = await res.json();
    console.log("response deta", data)
      
    setPlaylist(data.playlist.items[0]);
    setVideos(data.videos);
    setSelectedVideo(data.videos[0]);
    console.log("youtube Deta",data)
  };

  const formatDuration = (duration: string) => {
    const match = duration.match(
      /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/
    );

    if (!match) return "0:00";

    const hours = parseInt(match[1] || "0");
    const minutes = parseInt(match[2] || "0");
    const seconds = parseInt(match[3] || "0");

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    }

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };


  useEffect(() => {
    getYoutubeVideos();
  }, []);


  return (
    <div className="flex gap-5 p-5 bg-[#0F0F0F]">

      {/* Left Video Player */}
      <div className="w-[70%]">

        {selectedVideo && (
          <>
            <iframe
              className="w-full h-125 rounded-lg"
              src={`https://www.youtube.com/embed/${selectedVideo.snippet.resourceId.videoId}`}
              title={selectedVideo.snippet.title}
              allowFullScreen
            />

            <h1 className="text-xl text-[#FFFFFF] font-bold mt-4">
              {selectedVideo.snippet.title}
            </h1>

            <p className="text-[#AAAAAA]">
              {selectedVideo.snippet.channelTitle}
            </p>
          </>
        )}

      </div>

          <div className="w-[30%] bg-[#212121] rounded-xl overflow-hidden border border-zinc-700">

            {/* Header */}
            <div className="p-4 border-b border-zinc-700">

              <div className="flex justify-between items-start">

                <div>
                  <h2 className="text-[#FFFFFF] text-xl font-bold ">
                    {
                        playlist?.snippet.title.length > 20
                        ? playlist.snippet.title.slice(0, 20) + "..."
                        : playlist?.snippet.title
                    }
                  </h2>

                  <p className="text-sm text-gray-100">
                    {playlist?.snippet.channelTitle} • {currentIndex + 1} / {videos.length}
                  </p>
                </div>

                <div className="flex gap-3 text-white text-xl">
                  ✕
                </div>

              </div>

            </div>

            {/* Videos */}
            <div className="max-h-120 overflow-y-auto">

              {videos.map((video, index) => (

                <div
                  key={video.snippet.resourceId.videoId}
                  onClick={()=>{
                    setSelectedVideo(video);
                    setCurrentIndex(index);
                  }}
                  className={`flex gap-2 p-2 cursor-pointer hover:bg-[#303030]
                    ${
                      selectedVideo?.snippet?.resourceId?.videoId ===
                      video.snippet.resourceId.videoId
                        ? "bg-[#3a3a3a]"
                        : ""
                    }`}
                >

                  <div className="w-3 text-gray-400 text-sm mt-8">
                    {index + 1}
                  </div>

                  <div className="relative">

                    <img
                      src={video.snippet.thumbnails.medium.url}
                      className="w-32 h-16 rounded object-cover"
                    />

                    <span className="absolute bottom-1 right-1 bg-black/90 text-white text-xs px-1 rounded">
                      {formatDuration(video.duration)}
                    </span>

                  </div>

                  <div className="flex-1">

                    <h3 className="text-white text-sm font-medium line-clamp-2">
                      {video.snippet.title}
                    </h3>

                    <p className="text-xs text-gray-400 mt-1">
                      {video.snippet.channelTitle}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>


    </div>
  );

}