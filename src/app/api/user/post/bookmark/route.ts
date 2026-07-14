import { asyncHandler } from "@/src/lib/asyncandler";
import dbConnect from "@/src/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";
import { ApiError } from "@/src/lib/apiError";
import UserModel from "@/src/models/user";
import { ApiResponse } from "@/src/lib/apiResponse";

export const POST = asyncHandler(async (req: Request) => {
  const { searchParams } = new URL(req.url);

  await dbConnect();

  const session = await getServerSession(authOptions);

  if (!session?.user?._id) {
    throw new ApiError(401, "Unauthorized");
  }

  const postId = searchParams.get("postId");

  if (!postId) {
    throw new ApiError(404, "Post ID is required");
  }

  const user = await UserModel.findById(session.user._id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isBookmarked = user.bookmarks.some(
    (id: any) => id.toString() === postId
  );

  if (isBookmarked) {
    await UserModel.findByIdAndUpdate(
      session.user._id,
      {
        $pull: {
          bookmarks: postId,
        },
      }
    );

    return Response.json(
      new ApiResponse(
        200,
        {
          postId,
          isBookmarked: false,
        },
        "Bookmark removed successfully"
      )
    );
  }

  await UserModel.findByIdAndUpdate(
    session.user._id,
    {
      $addToSet: {
        bookmarks: postId,
      },
    }
  );

  return Response.json(
    new ApiResponse(
      200,
      {
        postId,
        isBookmarked: true,
      },
      "Bookmark added successfully"
    )
  );
});