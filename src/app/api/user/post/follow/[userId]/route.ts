import { authOptions } from './../../../../auth/[...nextauth]/options';
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from '@/src/lib/dbConnect';
import Follow from "@/src/models/follow.model";
import Notification from '@/src/models/Notification.model';


export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?._id) {
      return NextResponse.json(
        { success: false, message: "Please log in first." },
        { status: 401 }
      );
    }

    const { userId } = await params;

    if (session.user._id === userId) {
      return NextResponse.json(
        {
          success: false,
          message: "You cannot follow yourself.",
        },
        { status: 400 }
      );
    }

    await dbConnect();

    const existingFollow = await Follow.findOne({
      follower: session.user._id,
      following: userId,
    });

    if (existingFollow) {
      return NextResponse.json(
        {
          success: false,
          message: "You are already following this user.",
        },
        { status: 409 }
      );
    }

    await Follow.create({
      follower: session.user._id,
      following: userId,
    });

    await Notification.create({
        recipient: userId,
        sender: session.user._id,
        type: "follow",
        message: "started following you",
    });

    return NextResponse.json(
      {
        success: true,
        message: "User followed successfully.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Follow error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      { status: 500 }
    );
  }
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?._id) {
      return NextResponse.json({
        success: true,
        isFollowing: false,
      });
    }

    const { userId } = await params;

    await dbConnect();

    const follow = await Follow.findOne({
      follower: session.user._id,
      following: userId,
    });
    console.log("follow", follow)
    return NextResponse.json({
      success: true,
      isFollowing: !!follow,
    });
  } catch (error) {
    console.error("Get follow status error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
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

    const { userId } = await params;

    await dbConnect();

    const deletedFollow = await Follow.findOneAndDelete({
      follower: session.user._id,
      following: userId,
    });

    if (!deletedFollow) {
      return NextResponse.json(
        {
          success: false,
          message: "You are not following this user.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "User unfollowed successfully.",
    });
  } catch (error) {
    console.error("Unfollow error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}