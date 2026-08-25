"use client"
import axios, { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ThumbsUp, ThumbsDown, Share2, Bookmark, CheckCircle, ChevronDown, ChevronUp, } from "lucide-react";
import { PlaylistType } from "@/src/types/dataTaype";
import { useForm } from "react-hook-form";
import z from "zod";
import { commentSchema } from "@/src/zod-Schemas/commentSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import EmojiPicker, { Theme }  from "emoji-picker-react";
import { Smile } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/src/store/useSelecterhook";
import { addComment, setComments, setLoading } from "@/src/store/commmentSlice";
import { ApiResponse } from "@/src/lib/apiResponse";
import { toast } from "sonner";
import { handleLikesAndComments } from "@/src/services/ApiServices/handleLikesAndComments";
import { useSession } from "next-auth/react";
import { handleBookMark } from "@/src/services/ApiServices/handleBookMark";
import { sharePost } from "@/src/services/ApiServices/Share";
import { setPlaylists } from "@/src/store/playlistSlice";
import VideoPlayerSection from "@/src/components/sections/courses/PlaylistPage/VideoPlayerSection";
import PlaylistSidebar from "@/src/components/sections/courses/PlaylistPage/PlaylistSidebar";
import PlaylistActions from "@/src/components/sections/courses/PlaylistPage/PlaylistActions";
import CommentInput from "@/src/components/sections/courses/PlaylistPage/PlaylistComments/CommentInput";
import CommentItem from "@/src/components/sections/courses/PlaylistPage/PlaylistComments/CommentItem/Replies";

export default function PlaylistPage() {
    const[ playlistPostData, setPlaylistPostData ] = useState<PlaylistType | null>(null)
    const { playlistId } = useParams();
    const [videos, setVideos] = useState<any[]>([]);
    const [selectedVideo, setSelectedVideo] = useState<any>(null);
    const [playlist, setPlaylist] = useState<any>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false); 
    const [emojiPickerFor, setEmojiPickerFor] = useState<string | null>(null);
    const [replyCommentId, setReplyCommentId] = useState<string | null>(null);
    const [isSubmiting, setIsSubmitting] = useState(false);
    const dispatch = useAppDispatch();
    const [viewReplyComments, setViewReplyComments] = useState(false);
    const { data: session } = useSession();
    const commentsData = useAppSelector((state) => state.commentsData.comments);
    const playlistReduxData = useAppSelector((state) => state.playlist)
    console.log("playlistReduxData", playlistReduxData)


      const {
        register,
        handleSubmit,
        setValue,
        watch
      } = useForm<z.infer <typeof commentSchema>>({
        resolver: zodResolver(commentSchema),
        defaultValues: {    
            commentContent: "",
            replyContent: "",
        },
      });
    const commentContent = watch("commentContent");
    const replyContent = watch("replyContent");



  const getYoutubeVideos = async () => {
    const res = await axios.get(`/api/user/get/getPlaylistById?playlistId=${playlistId}`);
      
    const data = res.data.data;

    setPlaylist(data.playlist);
    setPlaylistPostData(data.post)
    setVideos(data.videos);
    setSelectedVideo(data.videos[0]);
  };

    useEffect(() => {
  
    getYoutubeVideos();
  }, []);

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

    const onSubmit = async (data: z.infer<typeof commentSchema>) => {
        setIsSubmitting(true);

        try {
            const formDeta = new FormData();
            formDeta.append("commentContent", data.commentContent);
            formDeta.append("replyContent", data.replyContent);
            formDeta.append("postId", playlistId as string);

            if(replyCommentId){
                formDeta.append("parentComment", replyCommentId);
            }

            if(data.targetModel){
                formDeta.append("targetModel", data.targetModel);
            }

            const result = await axios.post("/api/user/post/comment", formDeta);

            dispatch(addComment(result.data.data))

            
            if (replyCommentId) {
                setValue("replyContent", "");
                setReplyCommentId(null);
            } else {
                setValue("commentContent", "");
            };

            setIsSubmitting(false);

        } catch (err) {
            console.log("Error creating post please checking comment page",err)
            
            const axiosError = err as AxiosError<ApiResponse>;

            toast('post created Failed', {
            position: "top-right",
            description: <span className="text-black">{axiosError.response?.data?.message}</span>,
            action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                },
            });

            setIsSubmitting(false);
        }
        
    };

    const getPlaylistComments = async () => {
        dispatch(setLoading(true));

        try {
            const response = await axios.get(`/api/user/post/comment?postId=${playlistId}`);
            const playlistResponse = await axios.get("/api/user/get/getPlaylistData");

            dispatch(setComments(response?.data?.data));
            dispatch(setPlaylists(playlistResponse.data.data));
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;

            console.error(
                "Failed to fetch comments:",
                axiosError.response?.data?.message || axiosError.message
            );

        } finally {
            dispatch(setLoading(false));
        }
    };

    const savedPlaylist = playlistReduxData.playlists.find( (playlist) => playlist.youtubePlaylistId === playlistPostData?.youtubePlaylistId);
    console.log("Saved playlist:", savedPlaylist);
    useEffect(() => {
        getPlaylistComments();
    }, [])

  return (
    <div className="bg-[#FBFCFE] dark:bg-[#0F172A] dark:text-[#FBFCFE] min-h-screen text-gray-900">

        <div className="bg-white pt-23 md:pt-15 dark:bg-[#0F172A] dark:text-[#FBFCFE] text-gray-900">

            <div className="flex flex-col lg:flex-row w-full px-3 sm:px-5 gap-5 py-3">

                {/* Video */}
                <VideoPlayerSection
                    selectedVideo={selectedVideo}
                />

                {/* Desktop Sidebar */}
                <PlaylistSidebar
                    playlist={playlist}
                    videos={videos}
                    selectedVideo={selectedVideo}
                    currentIndex={currentIndex}
                    setSelectedVideo={setSelectedVideo}
                    setCurrentIndex={setCurrentIndex}
                    formatDuration={formatDuration}
                />

            </div>

        </div>

        <PlaylistActions
            playlistPostData={playlistPostData}
            savedPlaylist={savedPlaylist}
            onShare={() =>
                sharePost({
                    pagePath: "courses",
                    postId: playlistId as string,
                })
            }
            onBookmark={() =>
                handleBookMark({
                    dispatch,
                    postId: playlistPostData!._id,
                    postType: "playlist",
                })
            }
        />

        <div className="w-full lg:w-[67%] px-3 sm:px-5 lg:px-0 mx-8">

            <form onSubmit={handleSubmit(onSubmit)}>

                <h1 className="text-xl sm:text-2xl font-bold pb-5 sm:pb-8 text-gray-900 dark:text-[#FBFCFE]">
                    Comments
                </h1>

                <input type="hidden" value="Playlist" {...register("targetModel")} />

                    <CommentInput
                        register={register}
                        setValue={setValue}
                        commentContent={commentContent}
                        emojiPickerFor={emojiPickerFor}
                        setEmojiPickerFor={setEmojiPickerFor}
                        profileImage={playlistPostData?.author.userProfile?.profileImgUrl}
                    />


                {/* Comments */}

                <div className="flex-1 overflow-y-auto px-1 sm:px-4 lg:px-7 py-5 sm:py-7 pb-24">

                    {commentsData && commentsData.filter((comment) => !comment.parentComment).map((comment) => (


                            <CommentItem
                                key={comment._id}
                                comment={comment}
                                commentsData={commentsData}
                                session={session}
                                dispatch={dispatch}
                                replyCommentId={replyCommentId}
                                setReplyCommentId={setReplyCommentId}
                                viewReplyComments={viewReplyComments}
                                setViewReplyComments={setViewReplyComments}
                                emojiPickerFor={emojiPickerFor}
                                setEmojiPickerFor={setEmojiPickerFor}
                                register={register}
                                setValue={setValue}
                                replyContent={replyContent}
                                handleLikesAndComments={handleLikesAndComments}
                            />

                    ))}

                </div>

            </form>

        </div>

    </div>
  );
}




