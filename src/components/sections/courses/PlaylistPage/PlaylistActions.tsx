import { Bookmark, CheckCircle, Share2 } from "lucide-react";

interface PlaylistActionsProps {
    playlistPostData: any;
    savedPlaylist: any;
    onShare: () => void;
    onBookmark: () => void;
}

function PlaylistActions({
    playlistPostData,
    savedPlaylist,
    onShare,
    onBookmark,
}: PlaylistActionsProps) {

    return (
        <div className="w-full lg:w-[66%] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 m-0 lg:m-5 px-3 sm:px-0">

            {/* Author */}
            <div className="flex items-center gap-2 min-w-0">

                <img
                    src={
                        playlistPostData?.author.userProfile?.profileImgUrl ||
                        "/img/defaultProfile.jfif"
                    }
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover shrink-0"
                />

                <div className="min-w-0">

                    <div className="flex items-center gap-2">

                        <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                            {playlistPostData?.author.userProfile?.profileName}
                        </p>

                        <CheckCircle
                            size={18}
                            className="text-blue-500 shrink-0"
                        />

                    </div>

                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
                        add this playlist for learning purpose
                    </p>

                </div>

            </div>

            {/* Actions */}
            <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">

                {/* Share */}
                <button
                    onClick={onShare}
                    className="flex-1 sm:flex-none bg-gray-100 hover:bg-gray-200 dark:bg-[#182232] dark:hover:bg-slate-700 text-gray-800 dark:text-[#FBFCFE] rounded-full px-4 sm:px-5 py-2.5 sm:py-3 flex items-center justify-center gap-2 cursor-pointer transition"
                >
                    <Share2 size={18} />
                    Share
                </button>

                {/* Save */}
                {playlistPostData?._id && (
                    <button
                        onClick={onBookmark}
                        className="flex-1 sm:flex-none bg-gray-100 hover:bg-gray-200 dark:bg-[#182232] dark:hover:bg-slate-700 text-gray-800 dark:text-[#FBFCFE] rounded-full px-4 sm:px-5 py-2.5 sm:py-3 flex items-center justify-center gap-2 cursor-pointer transition"
                    >
                        <Bookmark
                            size={18}
                            fill={
                                savedPlaylist?.isBookmarked
                                    ? "currentColor"
                                    : "none"
                            }
                            className={
                                savedPlaylist?.isBookmarked
                                    ? "text-blue-600 dark:text-blue-400"
                                    : ""
                            }
                        />
                        Save
                    </button>
                )}

            </div>

        </div>
    );
}

export default PlaylistActions;