import { authOptions } from "../../../auth/[...nextauth]/options";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from '@/src/lib/dbConnect';
import Follow from "@/src/models/follow.model";
import Notification from '@/src/models/Notification.model';


export async function PATCH(req: NextRequest) {
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

    // Get request body
    const { notificationId, markAll } = await req.json();
    console.log("notificationId",notificationId)

    // Connect database
    await dbConnect();

    // Mark all notifications as read
    if (markAll) {
      await Notification.updateMany(
        {
          recipient: session.user._id,
          isRead: false,
        },
        {
          $set: {
            isRead: true,
          },
        }
      );

      return NextResponse.json(
        {
          success: true,
          message: "All notifications marked as read.",
        },
        { status: 200 }
      );
    }

    // Notification ID required for single notification
    if (!notificationId) {
      return NextResponse.json(
        {
          success: false,
          message: "Notification ID is required.",
        },
        { status: 400 }
      );
    }

    // Mark single notification as read
    const notification = await Notification.findOneAndUpdate(
      {
        _id: notificationId,
        recipient: session.user._id,
      },
      {
        $set: {
          isRead: true,
        },
      },
      {
        new: true,
      }
    );

    // Notification not found
    if (!notification) {
      return NextResponse.json(
        {
          success: false,
          message: "Notification not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Notification marked as read.",
        notification,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Mark notification as read error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to mark notification as read.",
      },
      { status: 500 }
    );
  }
}