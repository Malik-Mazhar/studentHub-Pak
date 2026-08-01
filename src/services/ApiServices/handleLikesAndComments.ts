import { toggleLike } from "@/src/store/commmentSlice";
import { toggleLikePost } from "@/src/store/postSlice";
import { AppDispatch } from "@/src/store/store";
import axios from "axios";

type HandleLikeParams = {
  dispatch: AppDispatch;
  postId?: string;
  commentId?: string;
};
    
    
export const handleLikesAndComments = async ({
    dispatch,
    postId,
    commentId,
}: HandleLikeParams) => {
    
    try {
        const formData = new FormData();
           
        if(postId){
            formData.append("postId", postId);
        };
        if(commentId){
            formData.append("commentId", commentId);
        }
            
        const response = await axios.post("/api/user/post/comment/like", formData);

        if(postId){
            dispatch(toggleLikePost({postId, ...response.data.data}))
        } else {
            dispatch(toggleLike(response.data.data))
        }


    } catch (error) {
        console.log(error);
    }
};