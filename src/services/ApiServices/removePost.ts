import { deletePost } from "@/src/store/postSlice";
import { AppDispatch } from "@/src/store/store";
import { useAppDispatch } from "@/src/store/useSelecterhook";
import axios from "axios";

type removePostProp = {
  postId: string;
  dispatch: AppDispatch;
};

export const removePost = async ({
  postId,
  dispatch,
  }:removePostProp) => {
  
  try {
    const response = await axios.delete(`/api/user/delete?postId=${postId}`);

    console.log(response.data);

    dispatch(deletePost(response.data.data));
  } catch (error) {
    console.log(error);
  }
};
