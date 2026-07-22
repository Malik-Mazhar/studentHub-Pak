import { toggleLikePost } from "@/src/store/postSlice";
import { AppDispatch } from "@/src/store/store";
import axios from "axios";

    
    
export const handleLikesAndComments = async (
    postId: string, 
    dispatch: AppDispatch 
   ) => {
    
    try {
        const formData = new FormData();

        formData.append("postId", postId);
            
        const response = await axios.post("/api/user/post/comment/like", formData);

        dispatch(toggleLikePost({postId, ...response.data.data}))

    } catch (error) {
        console.log(error);
    }
};