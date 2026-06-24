import dbConnect from "@/src/lib/dbConnect";
import UserPostModel from "@/src/models/post";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    await dbConnect();
   try {
    const { title, content, postImageUrl, postImgPublicId } = await req.json();

    const session = await getServerSession(authOptions);

    if (!session?.user?._id) {
        return NextResponse.json(
            { message: "user Unauthorized" },
            { status: 401 }
        );
    };

     const userPost = new UserPostModel({
        title,
        content,
        postImageUrl,
        postImgPublicId,

        author: session.user._id
    });

    await userPost.save();

    return NextResponse.json({
        success: true,
        message: "Post created successfully",
        userPost
    }, { status: 201 })

   } catch (error) {
    console.log("creating post Error", error)

    return NextResponse.json({
        success: false,
        message: "creating post Error",
    }, { status: 500 })
   }
}