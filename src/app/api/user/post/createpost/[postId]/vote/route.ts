import { authOptions } from '@/src/app/api/auth/[...nextauth]/options';
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/src/lib/dbConnect";
import UserPostModel from "@/src/models/post";
import PollVote from "@/src/models/PollVote.model";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
    try {
        await dbConnect();

        const session = await getServerSession(authOptions);

        // Authentication check
        if (!session?.user?._id) {
            return NextResponse.json(
            {
                success: false,
                message: "You must be logged in to vote",
            },
            { status: 401 }
            );
        }

        const { postId } = await params;

        const { option } = await req.json();

        // Option validation
        if (!option) {
            return NextResponse.json(
            {
                success: false,
                message: "Please select an option",
            },
            { status: 400 }
            );
        }

        // Poll check
        const post = await UserPostModel.findById(postId);

        if (!post) {
            return NextResponse.json(
            {
                success: false,
                message: "Poll not found",
            },
            { status: 404 }
            );
        }

        // Check post type
        if (post.postType !== "poll") {
            return NextResponse.json(
            {
                success: false,
                message: "This post is not a poll",
            },
            { status: 400 }
            );
        }

        // Check option is actually part of poll
        if (!post.pollOptions || !post.pollOptions.includes(option)) {
            return NextResponse.json(
            {
                success: false,
                message: "Invalid poll option",
            },
            { status: 400 }
            );
        }

        // Create vote if it doesn't exist,
        // otherwise update the existing vote
        const vote = await PollVote.findOneAndUpdate(
            { postId, userId: session.user._id, },

            { $set: { option, }, },
            
            { upsert: true, new: true, }
        );

        return NextResponse.json(
            {
            success: true,
            message: "Vote submitted successfully",
            data: vote,
            },
            { status: 200 }
        );
    } catch (error: any) {
    // Duplicate vote protection
    if (error?.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: "You have already voted in this poll",
        },
        { status: 409 }
      );
    }

    console.error("Poll vote error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}