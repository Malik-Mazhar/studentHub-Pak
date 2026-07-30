import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { getServerSession } from "next-auth";

import dbConnect from "@/src/lib/dbConnect";
import { asyncHandler } from "@/src/lib/asyncandler";

import { ApiError } from "@/src/lib/apiError";
import { ApiResponse } from "@/src/lib/apiResponse";

import PlaylistModel from "@/src/models/playlist.model";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/options";

export const POST = asyncHandler(async (req: Request) => {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session?.user) {
        throw new ApiError(401, "Unauthorized");
    }

    const { youtubePlaylistLink, visibility = "Everyone", } = await req.json();

    if (!youtubePlaylistLink) {
        throw new ApiError(400, "Playlist URL is required.");
    }

    // Extract Playlist ID
    let playlistId = "";

    try {
        playlistId = new URL(youtubePlaylistLink).searchParams.get("list") || "";

        if (!playlistId) {
            throw new ApiError(400, "Invalid YouTube playlist URL");
        }
    } catch {
        throw new ApiError(400, "Invalid YouTube Playlist URL.");
    }

    // Duplicate Check
    const existingPlaylist = await PlaylistModel.findOne({
        youtubePlaylistId: playlistId,
    });

    if (existingPlaylist) {
        throw new ApiError(409, "This playlist has already been shared." );
    }

    // Fetch Playlist Info

    const response = await fetch(`https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&id=${playlistId}&key=${process.env.YOUTUBE_API_KEY}`);

    if (!response.ok) {
        throw new ApiError(500, "Failed to fetch playlist.");
    }

    const data = await response.json();
    console.log("data", data)

    if (!data.items || data.items.length === 0) {
        throw new ApiError(404, "Playlist not found.");
    }

    const playlist = data.items[0];

    const title = playlist.snippet.title;

    const thumbnail =
        playlist.snippet.thumbnails?.high?.url ||
        playlist.snippet.thumbnails?.medium?.url ||
        playlist.snippet.thumbnails?.default?.url;

    const videoCount = playlist.contentDetails.itemCount;

    // Duration calculate baad me karenge
    const playlistDuration = "Unknown";

    // Save

    const newPlaylist = await PlaylistModel.create({
        author: new Types.ObjectId(session.user._id),

        youtubePlaylistId: playlistId,

        title,
        thumbnail,
        videoCount,
        playlistDuration,

        visibility,
    });

    return NextResponse.json(
        new ApiResponse(
            201,
            newPlaylist,
            "Playlist shared successfully."
        )
    );
});

export const GET = asyncHandler( async (req:Request) => {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session?.user?._id) {
        throw new ApiError(401, "user Unauthorized" )
    };

    const getCurrentUserAllPosts = await PlaylistModel.findById({
        author: session.user._id
    });                      //if first latest post .sort({ createdAt: -1 });

    if(!getCurrentUserAllPosts){
        throw new ApiError(400, "cannection Error")
    }

    return Response
    .json(
        new ApiResponse(201, getCurrentUserAllPosts, "fatch current user post successfully")
    );

});