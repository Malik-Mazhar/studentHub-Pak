"use client"
// import { Playlist } from "@/src/models/playlist.model";
// import axios from "axios";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function PlaylistPage() {
//   const[ playlistData, setPlaylistData ] = useState<Playlist | null>(null)
//   const { playlistId } = useParams();
// const [videos, setVideos] = useState<any[]>([]);
//   const [selectedVideo, setSelectedVideo] = useState<any>(null);
//   const [playlist, setPlaylist] = useState<any>(null);
//   const [currentIndex, setCurrentIndex] = useState(0);



//   const getYoutubeVideos = async () => {
//     const res = await axios.get(`/api/user/get/getPlaylistById?playlistId=${playlistId}`);
//     setPlaylistData(res.data.data)
      
//     const data = res.data.data;
//     setPlaylist(data.playlist.items[0]);
//     setVideos(data.videos);
//     setSelectedVideo(data.videos[0]);
//     console.log("youtube Deta",data)
//   };
  
//           console.log("playlistData", playlistData?.youtubePlaylistId)

//     useEffect(() => {
  
//     getYoutubeVideos();
//   }, []);

//     const formatDuration = (duration: string) => {
//         const match = duration.match(
//         /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/
//         );

//         if (!match) return "0:00";

//         const hours = parseInt(match[1] || "0");
//         const minutes = parseInt(match[2] || "0");
//         const seconds = parseInt(match[3] || "0");

//         if (hours > 0) {
//         return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
//             .toString()
//             .padStart(2, "0")}`;
//         }

//         return `${minutes}:${seconds.toString().padStart(2, "0")}`;
//   };


//     return (

//     <div className="flex gap-5 p-5 bg-[#0F0F0F]">

//         {/* Left Video Player */}
//         <div className="w-[70%]">

//             {selectedVideo && (
//             <>
//                 <iframe
//                 className="w-full h-125 rounded-lg"
//                 src={`https://www.youtube.com/embed/${selectedVideo.snippet.resourceId.videoId}`}
//                 title={selectedVideo.snippet.title}
//                 allowFullScreen
//                 />

//                 <h1 className="text-xl text-[#FFFFFF] font-bold mt-4">
//                 {selectedVideo.snippet.title}
//                 </h1>

//                 <p className="text-[#AAAAAA]">
//                 {selectedVideo.snippet.channelTitle}
//                 </p>
//             </>
//             )}

//         </div>

//         <div className="w-[30%] bg-[#212121] rounded-xl overflow-hidden border border-zinc-700">

//         {/* Header */}
//         <div className="p-4 border-b border-zinc-700">

//             <div className="flex justify-between items-start">

//             <div>
//                 <h2 className="text-[#FFFFFF] text-xl font-bold ">
//                 {
//                     playlist?.snippet.title.length > 20
//                     ? playlist.snippet.title.slice(0, 20) + "..."
//                     : playlist?.snippet.title
//                 }
//                 </h2>

//                 <p className="text-sm text-gray-100">
//                 {playlist?.snippet.channelTitle} • {currentIndex + 1} / {videos.length}
//                 </p>
//             </div>

//             <div className="flex gap-3 text-white text-xl">
//                 ✕
//             </div>

//             </div>

//         </div>

//         {/* Videos */}
//         <div className="max-h-120 overflow-y-auto">

//             {videos.map((video, index) => (

//             <div
//                 key={video.snippet.resourceId.videoId}
//                 onClick={()=>{
//                 setSelectedVideo(video);
//                 setCurrentIndex(index);
//                 }}
//                 className={`flex gap-2 p-2 cursor-pointer hover:bg-[#303030]
//                 ${
//                     selectedVideo?.snippet?.resourceId?.videoId ===
//                     video.snippet.resourceId.videoId
//                     ? "bg-[#3a3a3a]"
//                     : ""
//                 }`}
//             >

//                 <div className="w-3 text-gray-400 text-sm mt-8">
//                 {index + 1}
//                 </div>

//                 <div className="relative">

//                 <img
//                     src={video.snippet.thumbnails.medium.url}
//                     className="w-32 h-16 rounded object-cover"
//                 />

//                 <span className="absolute bottom-1 right-1 bg-black/90 text-white text-xs px-1 rounded">
//                     {formatDuration(video.duration)}
//                 </span>

//                 </div>

//                 <div className="flex-1">

//                 <h3 className="text-white text-sm font-medium line-clamp-2">
//                     {video.snippet.title}
//                 </h3>

//                 <p className="text-xs text-gray-400 mt-1">
//                     {video.snippet.channelTitle}
//                 </p>

//                 </div>

//             </div>

//             ))}

//         </div>

//         </div>


//     </div>
//     );
// }





import { useState } from "react";
import {
  ThumbsUp,
  ThumbsDown,
  Share2,
  Bookmark,
  MoreHorizontal,
  CheckCircle,
  Clock3,
  Folder,
  Globe,
} from "lucide-react";

export default function PlaylistPage() {
  const [selectedVideo, setSelectedVideo] = useState({
    id: 1,
    title: "01. Introduction to Python",
    duration: "25:48",
    thumbnail:
      "https://i.ytimg.com/vi/rfscVS0vtbw/maxresdefault.jpg",
    videoId: "rfscVS0vtbw",
    description:
      "Welcome to the Python for Beginners course! In this video we'll learn what Python is and why it is used.",
  });

  const playlist = [
    {
      id: 1,
      title: "01. Introduction to Python",
      duration: "25:48",
      thumbnail:
        "https://i.ytimg.com/vi/rfscVS0vtbw/mqdefault.jpg",
      videoId: "rfscVS0vtbw",
    description: "This is introduction video.",
    },
    {
      id: 2,
      title: "02. Installing Python",
      duration: "18:12",
      thumbnail:
        "https://i.ytimg.com/vi/kqtD5dpn9C8/mqdefault.jpg",
      videoId: "kqtD5dpn9C8",
    description: "This is introduction video.",
    },
    {
      id: 3,
      title: "03. Variables",
      duration: "22:36",
      thumbnail:
        "https://i.ytimg.com/vi/Z1Yd7upQsXY/mqdefault.jpg",
      videoId: "Z1Yd7upQsXY",
    description: "This is introduction video.",
    },
  ];

  return (
    <div className="bg-[#0b1120] min-h-screen text-white">

      <div className="max-w-425 mx-auto px-8 py-8">

        <div className="grid lg:grid-cols-[1fr_420px] gap-8">

          {/* LEFT */}

          <div>

            <button className="text-gray-400 hover:text-white mb-6">
              ← Back to Playlists
            </button>

            <h1 className="text-4xl font-bold">
              Python for Beginners — Full Course
            </h1>

            <p className="text-gray-400 mt-3">
              Learn Python from scratch. Perfect for beginners.
            </p>

            {/* Video */}

            <div className="mt-8 rounded-xl overflow-hidden border border-gray-800">

              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.videoId}`}
                allowFullScreen
                className="w-full aspect-video"
              />

            </div>

            {/* Title */}

            <div className="mt-6">

              <h2 className="text-3xl font-semibold">
                {selectedVideo.title}
              </h2>

            </div>

            {/* Channel */}

            <div className="flex items-center justify-between mt-5">

              <div className="flex items-center gap-4">

                <img
                  src="https://i.pravatar.cc/100"
                  className="w-14 h-14 rounded-full"
                />

                <div>

                  <div className="flex items-center gap-2">

                    <p className="font-semibold text-lg">
                      Sir Usman Ali
                    </p>

                    <CheckCircle
                      size={18}
                      className="text-blue-500"
                    />

                  </div>

                  <p className="text-gray-400">
                    Computer Science Instructor
                  </p>

                </div>

                <button className="bg-white text-black rounded-full px-6 py-2 font-semibold">
                  Subscribe
                </button>

              </div>

              {/* Actions */}

              <div className="flex gap-3">

                <button className="bg-[#182232] rounded-full px-5 py-3 flex items-center gap-2">
                  <ThumbsUp size={18} />
                  2.3K
                </button>

                <button className="bg-[#182232] rounded-full p-3">
                  <ThumbsDown size={18} />
                </button>

                <button className="bg-[#182232] rounded-full px-5 py-3 flex items-center gap-2">
                  <Share2 size={18} />
                  Share
                </button>

                <button className="bg-[#182232] rounded-full px-5 py-3 flex items-center gap-2">
                  <Bookmark size={18} />
                  Save
                </button>

                <button className="bg-[#182232] rounded-full p-3">
                  <MoreHorizontal size={18} />
                </button>

              </div>

            </div>

            {/* Description */}

            <div className="mt-8 bg-[#101827] rounded-xl p-6 border border-gray-800">

              <p className="leading-8 text-gray-300">
                {selectedVideo.description}
              </p>

            </div>

            {/* About */}

            <div className="mt-8 bg-[#101827] rounded-xl p-6 border border-gray-800">

              <h3 className="text-2xl font-semibold mb-8">
                About this course
              </h3>

              <div className="grid md:grid-cols-4 gap-6">

                <div className="flex items-center gap-4">

                  <Clock3 className="text-orange-400" />

                  <div>

                    <p className="text-gray-400">
                      Duration
                    </p>

                    <p>6h 12m</p>

                  </div>

                </div>

                <div className="flex items-center gap-4">

                  <Folder className="text-purple-400" />

                  <div>

                    <p className="text-gray-400">
                      Category
                    </p>

                    <p>Programming</p>

                  </div>

                </div>

                <div className="flex items-center gap-4">

                  <Globe className="text-blue-400" />

                  <div>

                    <p className="text-gray-400">
                      Language
                    </p>

                    <p>English</p>

                  </div>

                </div>

                <div className="flex items-center gap-4">

                  <CheckCircle className="text-green-400" />

                  <div>

                    <p className="text-gray-400">
                      Level
                    </p>

                    <p>Beginner</p>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="bg-[#101827] rounded-xl border border-gray-800 overflow-hidden">

            <div className="p-6 border-b border-gray-800">

              <div className="flex justify-between">

                <h2 className="text-2xl font-semibold">
                  Playlist
                </h2>

                <span className="text-gray-400">
                  {playlist.length} videos
                </span>

              </div>

            </div>

            <div className="h-225 overflow-y-auto">

              {playlist.map((video, index) => (

                <div
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className={`flex gap-4 p-4 cursor-pointer transition
                  ${
                    selectedVideo.id === video.id
                      ? "bg-blue-600/20"
                      : "hover:bg-[#1a2332]"
                  }`}
                >

                  <div className="text-gray-400 mt-6">
                    {index + 1}
                  </div>

                  <img
                    src={video.thumbnail}
                    className="w-40 rounded-lg"
                  />

                  <div>

                    <h4 className="font-medium">
                      {video.title}
                    </h4>

                    <p className="text-gray-400 text-sm mt-2">
                      Sir Usman Ali
                    </p>

                    <p className="text-xs text-gray-500 mt-2">
                      {video.duration}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}