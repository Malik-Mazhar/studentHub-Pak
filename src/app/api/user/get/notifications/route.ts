import { authOptions } from './../../../auth/[...nextauth]/options';
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/src/lib/dbConnect";
import Notification from "@/src/models/Notification.model";

export async function GET() {
  try {
    // Check authentication
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

    // Connect database
    await dbConnect();

    // Get user's notifications
    const notifications = await Notification.find({
      recipient: session.user._id,
    })
      .populate("sender", "userProfile")
      .populate("postId", "title content postType")
      .sort({ createdAt: -1 })
      .lean();

    // Unread notifications count
    const unreadCount = await Notification.countDocuments({
      recipient: session.user._id,
      isRead: false,
    });

    return NextResponse.json(
      {
        success: true,
        notifications,
        unreadCount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get notifications error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch notifications.",
      },
      { status: 500 }
    );
  }
}