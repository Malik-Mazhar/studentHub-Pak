import dbConnect from "@/src/lib/dbConnect";
import UserPostModel, { UserPost } from "@/src/models/post";
import { getServerSession } from "next-auth";
import { asyncHandler } from "@/src/lib/asyncandler";
import { ApiError } from "next/dist/server/api-utils";
import { ApiResponse } from "@/src/lib/apiResponse";
import { authOptions } from "../../auth/[...nextauth]/options";

export const DELETE = asyncHandler(async (req: Request) => { 

  await dbConnect();

  const { searchParams } = new URL(req.url)
  const postId = searchParams.get("postId");

  const session = await getServerSession(authOptions);

  if (!session?.user?._id) {
    throw new ApiError(401, "Unauthorized");
  }

  const post = await UserPostModel.findById(postId);

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  // Sirf owner apni post delete kar sakta hai
  if (post.author.toString() !== session.user._id.toString()) {
    throw new ApiError(403, "You are not allowed to delete this post");
  }

  await UserPostModel.findByIdAndDelete(postId);

  return Response.json(
    new ApiResponse(200, null, "Post deleted successfully")
  );
});
