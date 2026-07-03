import { asyncHandler } from "@/src/lib/asyncandler";
import dbConnect from "@/src/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { ApiError } from "@/src/lib/apiError";
import UserPostModel from "@/src/models/post";
import { ApiResponse } from "@/src/lib/apiResponse";

export const GET = asyncHandler( async (req:Request) => {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session?.user?._id) {
        throw new ApiError(401, "user Unauthorized" )
    };

    const getAllPosts = await UserPostModel.find();
                    //if first latest post .sort({ createdAt: -1 });

    if(!getAllPosts){
        throw new ApiError(400, "cannection Error")
    }

    return Response
    .json(
        new ApiResponse(201, getAllPosts, "fatchig all post successfully")
    );

});