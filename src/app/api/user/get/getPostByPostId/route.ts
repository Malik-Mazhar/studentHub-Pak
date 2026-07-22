import { asyncHandler } from "@/src/lib/asyncandler";
import dbConnect from "@/src/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";
import { ApiError } from "@/src/lib/apiError";
import UserPostModel from "@/src/models/post";
import { ApiResponse } from "@/src/lib/apiResponse";

export const GET = asyncHandler( async (req:Request) => {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const PostId = searchParams.get("postId");

    const session = await getServerSession(authOptions);
    const userId = session?.user._id;

    if (!userId) {
        throw new ApiError(401, "user Unauthorized" )
    };

    const getPostByPostId = await UserPostModel.findById(PostId)

    if(!getPostByPostId){
        throw new ApiError(400, "cannection Error")
    }

    return Response
    .json(
        new ApiResponse(200, getPostByPostId, "fatchig post by post Id!")
    );

});



