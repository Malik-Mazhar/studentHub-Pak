import { NextResponse } from "next/server";

export async function GET() {
  try {
    const playlistId = "PLGjplNEQ1it8-0CmoljS5yeV-GlKSUEt0";

    // Playlist Details
    const playlistRes = await fetch(
        `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${process.env.YOUTUBE_API_KEY}`
    );

    // Playlist Videos
    const videosRes = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${process.env.YOUTUBE_API_KEY}`
    );

    if (!playlistRes.ok) {
      throw new Error("YouTube API request failed");
    }

    const playlistData = await playlistRes.json();
    const videosData = await videosRes.json();

    const videoIds = videosData.items
    .map((item: any) => item.snippet.resourceId.videoId)
    .join(",");

    

    const durationRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoIds}&key=${process.env.YOUTUBE_API_KEY}`
    );

    const durationData = await durationRes.json();

      const videos = videosData.items.map((video: any, index: number) => ({
        ...video,
        duration: durationData.items[index].contentDetails.duration,
    }));

      return NextResponse.json({
        playlist: playlistData,
        duration: durationRes,
        videos
    });

  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
};