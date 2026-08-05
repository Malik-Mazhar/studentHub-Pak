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
import PlaylistModel from '@/src/models/playlist.model';

export const GET = asyncHandler( async (req:Request) => {
    await dbConnect();

    const session = await getServerSession(authOptions);
    const userId = session?.user._id;

    if (!userId) {
        throw new ApiError(401, "user Unauthorized" )
    };

    const userBookMarks = await UserModel.findById(userId).select("bookmarks");   
    
    if (!userBookMarks) {
        throw new ApiError(404, "User not found");
    }
    const [BookMarkPosts, BookMarkPlaylist] = await Promise.all([
        UserPostModel.find({
            _id: { $in: userBookMarks.bookmarks }
        }),

        PlaylistModel.find({
            _id: { $in: userBookMarks.bookmarks }
        }).lean()
    ]);

    const addTypeInBookmarksPlaylists = BookMarkPlaylist.map((playlist) => ({
        ...playlist,
        postType: "playlist",
    }))

    const allBookMarkPosts = [
        ...BookMarkPosts,
        ...addTypeInBookmarksPlaylists
    ];

    return Response
    .json(
        new ApiResponse(201,
             allBookMarkPosts,
            "fatchig all post successfully"
            )
    );

});