import { ApiResponse } from "@/src/lib/apiResponse";
import { toggleBookmarkPlaylist } from "@/src/store/playlistSlice";
import { toggleBookmark } from "@/src/store/postSlice";
import { AppDispatch } from "@/src/store/store";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

type HandleBookMarkProp = {
    dispatch: AppDispatch;
    postId: string;
    postType?: string;
};
        
        
export const handleBookMark = async ({
    dispatch,
    postId,
    postType
}: HandleBookMarkProp) => {
    
    try {
        const response = await axios.post(`/api/user/post/bookmark?postId=${postId}`);

        if(postType){

            dispatch(toggleBookmarkPlaylist(response.data.data))
        }else {
            dispatch(toggleBookmark(response.data.data))
        }


        toast("post saved successfully!", {
            position: "top-right",        
            description: response.data?.message ,
              style: {
                color: "#fff",
                background: "#182232",
            },
        });


    } catch (error) {
        console.log("Bookmarks Error check community page", error);

        const AxiosError = error as AxiosError<ApiResponse>;
        const message = AxiosError.response?.data?.message || "Something went wrong";

        toast("Video not found!", {
            position: "bottom-right",
            description: message ,
            style: {
                color: "#fff",
                background: "#182232",
            },
        });
    }
};