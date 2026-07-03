import dbConnect from "@/src/lib/dbConnect";
import UserPostModel from "@/src/models/post";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import { asyncHandler } from "@/src/lib/asyncandler";
import { ApiError } from "next/dist/server/api-utils";
import { ApiResponse } from "@/src/lib/apiResponse";
import { uploadImageHandler } from "@/src/middlewares/uploads";

export const POST = asyncHandler( async (req:Request) => {
    await dbConnect();

    const formData = await req.formData();
    
    const data = Object.fromEntries(formData.entries()) as any;
    console.log("Form Deta", formData)
    const files = (formData.getAll("postImage") as File[]) || [];
    const videoFile = formData.get("postVideo") as File | null;

    const { postType, title, content, category, tags, resourceLink, videoLink, pollQuestion, pollOptions, pollDuration, visibility,} = data;

    
    const session = await getServerSession(authOptions);

    let userImageFileDeta: any[] = [];
    let userVideoFileDeta = null;

    if (files && files.length > 0) {

        for (const file of files) {
            const uploaded = await uploadImageHandler( file, `users/${session?.user._id}/posts`);

            if (!uploaded) {
            throw new ApiError(500, "Service problem");
            }

            userImageFileDeta.push(uploaded);
        }
    };

    if(videoFile instanceof File){
       userVideoFileDeta = uploadImageHandler( videoFile, `users/${session?.user._id}/posts`)

        if (!userVideoFileDeta) {
        throw new ApiError(500, "Service problem");
        }
    }

    const postImageUrlDetect = userImageFileDeta.map(file => file.secure_url);

    if (!title || !postType) {
        throw new ApiError(400, "Title and postType are required");
    }

    if (!session?.user?._id) {
        throw new ApiError(401, "user Unauthorized" )
    };

     const userPost = new UserPostModel({
        postType,
        title,
        content,
        category,
        tags,
        resourceLink,
        videoLink,
        pollQuestion,
        pollOptions,
        pollDuration,
        postImageUrl: postImageUrlDetect,
        visibility,

        author: session.user._id
    });

    await userPost.save();

    return Response
    .json(
        new ApiResponse(201, userPost, "Post created successfully")
    );

} );


export const GET = asyncHandler( async (req:Request) => {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session?.user?._id) {
        throw new ApiError(401, "user Unauthorized" )
    };

    const getCurrentUserAllPosts = await UserPostModel.findById({
        author: session.user._id
    });                      //if first latest post .sort({ createdAt: -1 });

    if(!getCurrentUserAllPosts){
        throw new ApiError(400, "cannection Error")
    }

    return Response
    .json(
        new ApiResponse(201, getCurrentUserAllPosts, "fatch current user post successfully")
    );

});

