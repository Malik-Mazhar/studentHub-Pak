import { asyncHandler } from "@/src/lib/asyncandler";
import dbConnect from "@/src/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";
import { ApiError } from "@/src/lib/apiError";
import UserPostModel from "@/src/models/post";
import { ApiResponse } from "@/src/lib/apiResponse";
import PlaylistModel from "@/src/models/playlist.model";

export const GET = asyncHandler( async (req:Request) => {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const playlistId = searchParams.get("playlistId");

    const session = await getServerSession(authOptions);
    const userId = session?.user._id;

    if (!userId) {
        throw new ApiError(401, "User Unauthorized");
    }

    if (!playlistId) {
        throw new ApiError(400, "Playlist Id is required");
    }

    const playlist = await PlaylistModel.findById(playlistId);

    if (!playlist) {
        throw new ApiError(404, "Playlist not found");
    }

    const youtubePlaylistId = playlist.youtubePlaylistId;

    // Fetch Playlist Details & Playlist Videos
    const [playlistRes, videosRes] = await Promise.all([
        fetch(
            `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${youtubePlaylistId}&key=${process.env.YOUTUBE_API_KEY}`
        ),
        fetch(
            `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${youtubePlaylistId}&maxResults=50&key=${process.env.YOUTUBE_API_KEY}`
        ),
    ]);


    if (!playlistRes.ok || !videosRes.ok) {
        throw new ApiError(500, "Failed to fetch data from YouTube API");
    }

    const playlistData = await playlistRes.json();
    const videosData = await videosRes.json();

    // Get all Video IDs
    const videoIds = videosData.items
        .map((item: any) => item.snippet.resourceId.videoId)
        .join(",");

    // Fetch Video Durations
    const durationRes = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoIds}&key=${process.env.YOUTUBE_API_KEY}`
    );

    if (!durationRes.ok) {
        throw new ApiError(500, "Failed to fetch video durations");
    }

    const durationData = await durationRes.json();

    // Merge Duration with Videos
    const videos = videosData.items.map((video: any, index: number) => ({
        ...video,
        duration: durationData.items[index]?.contentDetails?.duration || null,
    }));



    return Response
    .json(
        new ApiResponse(
            200, 
            {
                post: playlist,
                playlist: playlistData,
                duration: durationRes,
                videos
            }, 
            "fatchig post by post Id!"
        )
    );

});

            // {
            //     post: playlist,
            //     playlist: playlistData.items[0],
            //     videos,
            // },