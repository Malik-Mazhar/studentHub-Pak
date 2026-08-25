import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { getServerSession } from "next-auth";

import dbConnect from "@/src/lib/dbConnect";
import { asyncHandler } from "@/src/lib/asyncandler";

import { ApiError } from "@/src/lib/apiError";
import { ApiResponse } from "@/src/lib/apiResponse";

import PlaylistModel from "@/src/models/playlist.model";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/options";
import UserModel from "@/src/models/user";

export const GET = asyncHandler( async (req:Request) => {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session?.user?._id) {
        throw new ApiError(401, "user Unauthorized" )
    };

        // Current user
    const user = await UserModel.findById(session.user._id).select("bookmarks");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const getAllPlaylist = await PlaylistModel.find().populate("author", "userProfile profileName profileImgUrl");                      //if first latest post .sort({ createdAt: -1 });

    if(!getAllPlaylist){
        throw new ApiError(400, "cannection Error")
    };

        // Add bookmark status to every playlist
    const playlistsWithBookmarkStatus = getAllPlaylist.map((playlist) => ({
        ...playlist.toObject(),

        isBookmarked: user.bookmarks.some(
            (id: any) => id.toString() === playlist._id.toString()
        ),
    }));

    return Response
    .json(
        new ApiResponse(201, playlistsWithBookmarkStatus, "fatch All Playlist successfully")
    );

});