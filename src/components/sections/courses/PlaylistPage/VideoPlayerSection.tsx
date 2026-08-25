interface VideoPlayerSectionProps {
    selectedVideo: any;
}

const VideoPlayerSection = ({
    selectedVideo,
}: VideoPlayerSectionProps) => {

    return (
        <div className="w-full lg:w-[68%] min-w-0">

            <button className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6">
                ← Back to Playlists
            </button>

            {selectedVideo && (
                <>
                    <iframe
                        className="w-full aspect-video bg-black rounded-lg"
                        src={`https://www.youtube.com/embed/${selectedVideo.snippet.resourceId.videoId}`}
                        title={selectedVideo.snippet.title}
                        allowFullScreen
                    />

                    <h1 className="text-lg sm:text-xl text-gray-900 dark:text-white font-bold mt-4">
                        {selectedVideo.snippet.title}
                    </h1>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {selectedVideo.snippet.channelTitle}
                    </p>

                    <div className="mt-3">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {selectedVideo.title}
                        </h2>
                    </div>
                </>
            )}

        </div>
    );
};

export default VideoPlayerSection;