import { ListVideo, X } from "lucide-react";
import { useState } from "react";

interface Video {
    duration: string;
    snippet: {
        title: string;
        channelTitle: string;
        resourceId: {
            videoId: string;
        };
        thumbnails: {
            medium: {
                url: string;
            };
        };
    };
}

interface Playlist {
    snippet: {
        title: string;
        channelTitle: string;
    };
}

interface PlaylistSidebarProps {
    playlist: Playlist | null;
    videos: Video[];
    selectedVideo: Video | null;
    currentIndex: number;
    setSelectedVideo: (video: any) => void;
    setCurrentIndex: (index: number) => void;
    formatDuration: (duration: string) => string;
}

const PlaylistSidebar = ({
    playlist,
    videos,
    selectedVideo,
    setSelectedVideo,
    currentIndex,
    setCurrentIndex,
    formatDuration,
}: PlaylistSidebarProps) => {

    const [showPlaylist, setShowPlaylist] = useState(false);

    const playlistTitle = playlist?.snippet?.title || "Playlist";

    const handleVideoClick = (video: any, index: number) => {
        setSelectedVideo(video);
        setCurrentIndex(index);

        // Mobile par video select hone ke baad close
        setShowPlaylist(false);
    };

    return (
        <>
                {/* DESKTOP */}

            <div className="hidden lg:block w-full lg:w-[32%] min-w-0 lg:max-h-110 bg-white dark:bg-[#101827] rounded-xl border border-gray-200 dark:border-gray-800 max-h-110 lg:mt-[5%] overflow-hidden shadow-sm dark:shadow-none">

                {/* Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-800">

                    <div className="flex justify-between items-start gap-3">

                        <div className="min-w-0">

                            <h2 className="text-gray-900 dark:text-white text-lg font-bold truncate">
                                {playlistTitle.length > 20
                                    ? playlistTitle.slice(0, 20) + "..."
                                    : playlistTitle
                                }
                            </h2>

                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                {playlist?.snippet?.channelTitle} •{" "}
                                {currentIndex + 1} / {videos.length}
                            </p>

                        </div>

                    </div>

                </div>

                {/* Videos */}
                <div className="max-h-120 overflow-y-auto">

                    {videos.map((video, index) => (

                        <div
                            key={video.snippet.resourceId.videoId}
                            onClick={() => handleVideoClick(video, index)}
                            className={`
                                flex gap-2 p-2 cursor-pointer
                                hover:bg-gray-100 dark:hover:bg-slate-800
                                ${
                                    selectedVideo?.snippet?.resourceId?.videoId ===
                                    video.snippet.resourceId.videoId
                                        ? "bg-gray-100 dark:bg-slate-800"
                                        : ""
                                }
                            `}
                        >

                            {/* Number */}
                            <div className="w-3 shrink-0 text-gray-400 text-sm mt-8">
                                {index + 1}
                            </div>

                            {/* Thumbnail */}
                            <div className="relative shrink-0">

                                <img
                                    src={video.snippet.thumbnails.medium.url}
                                    className="w-24 sm:w-32 h-16 rounded object-cover"
                                    alt=""
                                />

                                <span className="absolute bottom-1 right-1 bg-black/90 text-white text-xs px-1 rounded">
                                    {formatDuration(video.duration)}
                                </span>

                            </div>

                            {/* Information */}
                            <div className="flex-1 min-w-0">

                                <h3 className="text-gray-900 dark:text-white text-sm font-medium line-clamp-2">
                                    {video.snippet.title}
                                </h3>

                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {video.snippet.channelTitle}
                                </p>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

                {/* MOBILE PLAYLIST BUTTON */}
            <div className="lg:hidden mt-4">
                <button
                    onClick={() => setShowPlaylist(true)}
                    className="
                        w-full
                        flex items-center justify-between
                        px-4 py-3
                        rounded-xl
                        bg-white dark:bg-[#101827]
                        border border-gray-200 dark:border-gray-800
                        shadow-sm
                        cursor-pointer
                    "
                >
                    <div className="flex items-center gap-3">
                        <ListVideo
                            size={20}
                            className="text-gray-700 dark:text-gray-300"
                        />

                        <div className="text-left">
                            <p className="font-semibold text-gray-900 dark:text-white">
                                Playlist
                            </p>

                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {currentIndex + 1} / {videos.length} videos
                            </p>
                        </div>
                    </div>

                    <span className="text-gray-400">
                        →
                    </span>
                </button>
            </div>


                {/* // MOBILE BOTTOM SHEET */}

            {showPlaylist && (

                <div className="lg:hidden fixed inset-0 z-50">

                    {/* Overlay */}
                    <div
                        onClick={() => setShowPlaylist(false)}
                        className="absolute inset-0 bg-black/50"
                    />

                    {/* Bottom Sheet */}
                    <div
                        className="
                            absolute
                            bottom-0
                            left-0
                            right-0
                            max-h-[85vh]
                            bg-white dark:bg-[#101827]
                            rounded-t-2xl
                            overflow-hidden
                            shadow-2xl
                        "
                    >

                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">

                            <div className="min-w-0">

                                <h2 className="text-lg font-bold text-gray-900 dark:text-white truncate">

                                    {playlistTitle.length > 30
                                        ? playlistTitle.slice(0, 30) + "..."
                                        : playlistTitle
                                    }

                                </h2>

                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    {playlist?.snippet?.channelTitle} •{" "}
                                    {currentIndex + 1} / {videos.length}
                                </p>

                            </div>

                            <button
                                onClick={() => setShowPlaylist(false)}
                                className="
                                    shrink-0
                                    p-2
                                    rounded-full
                                    text-gray-500
                                    dark:text-gray-400
                                    hover:bg-gray-100
                                    dark:hover:bg-slate-800
                                    cursor-pointer
                                "
                            >
                                <X size={20} />
                            </button>

                        </div>


                        {/* Videos */}
                        <div className="overflow-y-auto max-h-[70vh]">

                            {videos.map((video, index) => (

                                <div
                                    key={video.snippet.resourceId.videoId}
                                    onClick={() => handleVideoClick(video, index)}
                                    className={`
                                        flex gap-2
                                        p-3
                                        cursor-pointer
                                        border-b border-gray-100
                                        dark:border-gray-800
                                        hover:bg-gray-100
                                        dark:hover:bg-slate-800
                                        ${
                                            selectedVideo?.snippet?.resourceId?.videoId ===
                                            video.snippet.resourceId.videoId
                                                ? "bg-gray-100 dark:bg-slate-800"
                                                : ""
                                        }
                                    `}
                                >

                                    {/* Number */}
                                    <div className="w-4 shrink-0 text-gray-400 text-sm mt-7">
                                        {index + 1}
                                    </div>

                                    {/* Thumbnail */}
                                    <div className="relative shrink-0">

                                        <img
                                            src={video.snippet.thumbnails.medium.url}
                                            className="w-28 h-16 rounded object-cover"
                                            alt=""
                                        />

                                        <span className="absolute bottom-1 right-1 bg-black/90 text-white text-xs px-1 rounded">
                                            {formatDuration(video.duration)}
                                        </span>

                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">

                                        <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
                                            {video.snippet.title}
                                        </h3>

                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            {video.snippet.channelTitle}
                                        </p>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

            )}

        </>
    );
};

export default PlaylistSidebar;