import dbConnect from "@/src/lib/dbConnect";
import UserPostModel from "@/src/models/post";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import { asyncHandler } from "@/src/lib/asyncandler";
import { ApiError } from "next/dist/server/api-utils";
import { ApiResponse } from "@/src/lib/apiResponse";
import PlaylistModel from "@/src/models/playlist.model";

export const GET = asyncHandler(async (req: Request) => {
  await dbConnect();

  const session = await getServerSession(authOptions);

  if (!session?.user?._id) {
    throw new ApiError(401, "User Unauthorized");
  }

  const getCurrentUserAllPosts = await UserPostModel
    .find({ author: session.user._id })
    .sort({ createdAt: -1 });

  const getCurrentUserAllPlaylist = await PlaylistModel
    .find({ author: session.user._id })
    .sort({ createdAt: -1 }).lean();

  const addPlaylistType = getCurrentUserAllPlaylist.map((playlist) => ({
        ...playlist,
        postType: "playlist",
  }))

  const allUserContent = [
    ...getCurrentUserAllPosts,
    ...addPlaylistType,
  ].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
  );

  return Response.json(
    new ApiResponse(
      200,
      allUserContent,
      "Fetched current user's content successfully"
    )
  );
});