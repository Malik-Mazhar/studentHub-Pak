import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/options";
import dbConnect from "@/src/lib/dbConnect";
import Follow from "@/src/models/follow.model";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?._id) {
      return NextResponse.json(
        {
          success: false,
          message: "Please log in first.",
        },
        { status: 401 }
      );
    }

    await dbConnect();

    const following = await Follow.find({
      follower: session.user._id,
    })
      .populate(
        "following",
        "userProfile profileName profileImgUrl"
      )
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        data: following,
        count: following.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET FOLLOWING ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}