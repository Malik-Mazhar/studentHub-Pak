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










// export async function POST(req:Request) {
//     await dbConnect();
//    try {
//     const { title, content, postImageUrl, postImgPublicId } = await req.json();

//     const session = await getServerSession(authOptions);

//     if (!session?.user?._id) {
//         return NextResponse.json(
//             { message: "user Unauthorized" },
//             { status: 401 }
//         );
//     };

//      const userPost = new UserPostModel({
//         title,
//         content,
//         postImageUrl,
//         postImgPublicId,

//         author: session.user._id
//     });

//     await userPost.save();

//     return NextResponse.json({
//         success: true,
//         message: "Post created successfully",
//         userPost
//     }, { status: 201 })

//    } catch (error) {
//     console.log("creating post Error", error)

//     return NextResponse.json({
//         success: false,
//         message: "creating post Error",
//     }, { status: 500 })
//    }
// };