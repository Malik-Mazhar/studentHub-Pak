import { asyncHandler } from "@/src/lib/asyncandler";
import dbConnect from "@/src/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../auth/[...nextauth]/options";
import { ApiError } from "@/src/lib/apiError";
import UserPostModel from "@/src/models/post";
import { Comment } from "@/src/models/comment.model";
import { ApiResponse } from "@/src/lib/apiResponse";
import { Types } from "mongoose";

export const POST = asyncHandler( async (req:Request) => {
    await dbConnect();

    const formData = await req.formData();
    const commentId = formData.get("commentId");
    const PostId = formData.get("postId");

    
    const session = await getServerSession(authOptions);
    const userId = session?.user._id as string;

    if (!userId) {
        throw new ApiError(401, "user Unauthorized" )
    };

    const getComment = await Comment.findById(commentId);
    const getPostById = await UserPostModel.findById(PostId);
    console.log("alreadyLikedPost",getPostById)

    if (!getComment && !getPostById) {
        throw new ApiError(404, "Comment not found");
    };

    if(getPostById){
        const alreadyLikedPost = getPostById.likes.some((_id: Types.ObjectId) => _id.toString() === userId.toString());
          
        if(alreadyLikedPost){
            getPostById.likes = getPostById.likes.filter((id) => id.toString() !== userId)
        }else {
            // Like
            getPostById.likes.push(new Types.ObjectId(userId))   
        };

        await getPostById.save();

            return Response
                .json(
                    new ApiResponse(
                    201,
                    {
                        isLiked: true,
                        likesCount: getPostById && getPostById.likes.length
                    },
                    "Post created successfully")
                );

    }else {
        const alreadyLiked = getComment.likes.some(
            (_id: Types.ObjectId) => _id.toString() === userId.toString()
        );

        if (alreadyLiked) {
            // Unlike
            getComment.likes.pull(userId);
        } else {
            // Like
            getComment.likes.push(userId)   
        };
     await getComment.save();

    }

    const updatedComment = await Comment.findById(commentId)
    .populate({
    path: "author",
    select: "userProfile",
    populate: {
        path: "userProfile",
        select: "profileName profileImgUrl -_id"
    }
    });

    return Response
    .json(
        new ApiResponse(
            201, updatedComment, "Post created successfully")
    );

} );