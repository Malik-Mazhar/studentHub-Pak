import { postAggregation } from './../../../../../lib/aggregations/postAggregation';
import { asyncHandler } from "@/src/lib/asyncandler";
import dbConnect from "@/src/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";
import { ApiError } from "@/src/lib/apiError";
import UserPostModel from "@/src/models/post";
import { ApiResponse } from "@/src/lib/apiResponse";
import { Types } from "mongoose";
import UserModel from "@/src/models/user";

export const GET = asyncHandler( async (req:Request) => {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const sortType = searchParams.get("sort");
    const sort:Record<string, 1 | -1> = sortType === "popular" ? { postLikesCount: -1 } : { createdAt: -1 };

    const session = await getServerSession(authOptions);
    const userId = session?.user._id;

    if (!userId) {
        throw new ApiError(401, "user Unauthorized" )
    };

    const user = await UserModel.findById(userId).select("bookmarks");      //if first latest post .sort({ createdAt: -1 });
    const bookmarkIds = user?.bookmarks || [];

    const getAllPosts = await UserPostModel.aggregate(postAggregation(userId, sort, bookmarkIds))


    if(!getAllPosts){
        throw new ApiError(400, "cannection Error")
    }

    return Response
    .json(
        new ApiResponse(201, getAllPosts, "fatchig all post successfully")
    );

});