import { asyncHandler } from "@/src/lib/asyncandler";
import dbConnect from "@/src/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";
import { ApiError } from "@/src/lib/apiError";
import { Comment } from "@/src/models/comment.model";
import { ApiResponse } from "@/src/lib/apiResponse";

export const POST = asyncHandler( async (req:Request) => {
    await dbConnect();

    const formData = await req.formData();

    const commentContent = formData.get("commentContent")  as string;
    const replyContent = formData.get("replyContent")  as string;
    const postId = formData.get("postId") as string;
    const parentComment = formData.get("parentComment") as string | null;

    const content = parentComment ? replyContent : commentContent;
    console.log("content", content)


    
    const session = await getServerSession(authOptions);
    const userId = session?.user._id as string;

    if ( !content || !postId) {
        throw new ApiError(400, `${content}  are required`);
    }

    if (!userId) {
        throw new ApiError(401, "user Unauthorized" )
    };

     const userPostComment = new Comment({
        content: content,
        author: userId,
        post: postId,
        parentComment: parentComment || null,
    });

    await userPostComment.save();

    const populatedComment = await Comment.findById(userPostComment._id)
    .populate({
        path: "author",
        populate: {
            path: "userProfile",
        },
    });

    return Response
    .json(
        new ApiResponse(201, populatedComment, "Post created successfully")
    );

} );


export const GET = asyncHandler( async (req:Request) => {
    await dbConnect();

    const { searchParams } = new URL(req.url)
      const postId = searchParams.get("postId");

    if (!postId) {
        throw new ApiError(400, "post not found");
    }

    const session = await getServerSession(authOptions);

    if (!session?.user?._id) {
        throw new ApiError(401, "user Unauthorized" )
    };

    const getAllComments = await Comment.find({
        post: postId
    }).populate("author");               //if first latest post .sort({ createdAt: -1 });

    if(!getAllComments){
        throw new ApiError(400, "cannection Error")
    }

    return Response
    .json(
        new ApiResponse(201, getAllComments, "All comment Succefully fatched!")
    );

});

