import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import dbConnect from "@/src/lib/dbConnect";
import History from "@/src/models/history.model";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?._id) {
      return NextResponse.json(
        {
          success: false,
          message: "Please login first.",
        },
        { status: 401 }
      );
    }

    const { page, resourceId } = await req.json();

    if (!page) {
      return NextResponse.json(
        {
          success: false,
          message: "Page is required.",
        },
        { status: 400 }
      );
    }

    await dbConnect();

    const history = await History.findOneAndUpdate(
      {
        userId: session.user._id,
        page,
        resourceId: resourceId || null,
      },
      {
        $set: {
          visitedAt: new Date(),
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    return NextResponse.json(
      {
        success: true,
        message: "History updated successfully.",
        data: history,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("CREATE HISTORY ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}


export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?._id) {
      return NextResponse.json(
        {
          success: false,
          message: "Please login first.",
        },
        { status: 401 }
      );
    }

    await dbConnect();

    const { searchParams } = new URL(req.url);

    const page = Math.max(
      Number(searchParams.get("page")) || 1,
      1
    );

    const limit = Math.min(
      Math.max(Number(searchParams.get("limit")) || 20, 1),
      50
    );

    const skip = (page - 1) * limit;

    const filter = {
      userId: session.user._id,
    };

    const [history, total] = await Promise.all([
      History.find(filter)
        .sort({ visitedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      History.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,
      data: history,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: skip + history.length < total,
      },
    });
  } catch (error) {
    console.error("GET HISTORY ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}