import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { getServerSession } from "next-auth";

import dbConnect from "@/src/lib/dbConnect";
import { asyncHandler } from "@/src/lib/asyncandler";

import { ApiError } from "@/src/lib/apiError";
import { ApiResponse } from "@/src/lib/apiResponse";

import PlaylistModel from "@/src/models/playlist.model";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/options";

export const GET = asyncHandler( async (req:Request) => {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session?.user?._id) {
        throw new ApiError(401, "user Unauthorized" )
    };

    const getAllPlaylist = await PlaylistModel.find().populate("author", "userProfile profileName profileImgUrl");                      //if first latest post .sort({ createdAt: -1 });

    if(!getAllPlaylist){
        throw new ApiError(400, "cannection Error")
    }

    return Response
    .json(
        new ApiResponse(201, getAllPlaylist, "fatch All Playlist successfully")
    );

});