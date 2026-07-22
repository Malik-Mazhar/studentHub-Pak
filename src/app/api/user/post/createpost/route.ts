import dbConnect from "@/src/lib/dbConnect";
import UserPostModel from "@/src/models/post";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import { asyncHandler } from "@/src/lib/asyncandler";
import { ApiError } from "next/dist/server/api-utils";
import { ApiResponse } from "@/src/lib/apiResponse";
import { uploadImageHandler } from "@/src/middlewares/uploads";
import { Types } from "mongoose";
import { deleteImageHandler } from "@/src/services/uploadToCloudinary";

export const POST = asyncHandler( async (req:Request) => {
    await dbConnect();

    const formData = await req.formData();
    
    const data = Object.fromEntries(formData.entries()) as any;
    

    const tags = (formData.get("tags") as string).split(",").map(tag => tag.trim());

    const files = (formData.getAll("postImage") as File[]) || [];
    const videoFile = formData.get("postVideo") as File | null;
    const documentFile = formData.get("document") as File | null;

    const { postType, title, content, notesCategory, category, resourceLink, videoLink, pollQuestion, pollOptions, pollDuration, visibility,} = data;

    
    const session = await getServerSession(authOptions);

    let userImageFileDeta: any[] = [];
    let userVideoFileDeta = null;
    let userdocumentFileDeta = null;

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
       userVideoFileDeta = await uploadImageHandler( videoFile, `users/${session?.user._id}/posts`)

        if (!userVideoFileDeta) {
        throw new ApiError(500, "Service problem");
        }
    };

    if(documentFile instanceof File){
       userdocumentFileDeta = await uploadImageHandler( documentFile, `users/${session?.user._id}/posts`)
    console.log("userdocumentFileDeta", userdocumentFileDeta)

        if (!userdocumentFileDeta) {
        throw new ApiError(500, "Service problem");
        }
    }

    const postImageUrlDetect = userImageFileDeta.map(file => file.secure_url);
    const postImagePublicId = userImageFileDeta.map(file => file.publicId);

    if (!title || !postType || (postType === "Notes" && !notesCategory)) {
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
        notesCategory,
        tags,
        resourceLink,
        videoLink,
        pollQuestion,
        pollOptions,
        pollDuration,
        postImageUrl: postImageUrlDetect,
        postDocumentUrl: userdocumentFileDeta?.secure_url,
        postImgPublicId: postImagePublicId,
        postDocumentPublicId: userdocumentFileDeta?.publicId,
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

export const PATCH = asyncHandler( async (req:Request) => {
    await dbConnect();

    const formData = await req.formData();
    
    const data = Object.fromEntries(formData.entries()) as any;
    

    const tags = (formData.get("tags") as string).split(",").map(tag => tag.trim());

    const files = (formData.getAll("postImage") as File[]) || [];
    const videoFile = formData.get("postVideo") as File | null;
    const documentFile = formData.get("document") as File | null;

    const { postType, title, content, notesCategory, category, resourceLink, videoLink, pollQuestion, pollOptions, pollDuration, visibility,} = data;


    const { searchParams } = new URL(req.url);
    const PostId = searchParams.get("postId");

    if (!PostId) {
        throw new ApiError(401, "post Id is required to get post" )
    };
    
    const session = await getServerSession(authOptions);
    const userId = session?.user._id;

    if (!userId) {
        throw new ApiError(401, "user Unauthorized" )
    };

    const Post = await UserPostModel.findById(PostId);

    if (!Post) {
    throw new ApiError(404, "Post not found");
    }

    let userImageFileDeta: any[] = [];
    let userVideoFileDeta = null;
    let userdocumentFileDeta = null;

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
       userVideoFileDeta = await uploadImageHandler( videoFile, `users/${session?.user._id}/posts`)

        if (!userVideoFileDeta) {
        throw new ApiError(500, "Service problem");
        }
    };

    if(documentFile instanceof File){
       userdocumentFileDeta = await uploadImageHandler( documentFile, `users/${session?.user._id}/posts`)
    console.log("userdocumentFileDeta", userdocumentFileDeta)

        if (!userdocumentFileDeta) {
        throw new ApiError(500, "Service problem");
        }
    }

    
    const postImageUrlDetect = userImageFileDeta.map(file => file.secure_url);

    if (postImageUrlDetect.length > 0) {

        // Delete Old Images

        if (Post.postImgPublicId && Post.postImgPublicId.length > 0) {

            for (const publicId of Post.postImgPublicId) {
                await deleteImageHandler(publicId);
            }

        }

        Post.postImageUrl = userImageFileDeta.map(
            img => img.secure_url
        );

        Post.postImgPublicId = userImageFileDeta.map(
            img => img.publicId
        );
    };



    if (userdocumentFileDeta) {

        if (Post.postDocumentPublicId) {
            await deleteImageHandler(Post.postDocumentPublicId);
        }

        Post.postDocumentUrl = userdocumentFileDeta.secure_url!;
        Post.postDocumentPublicId = userdocumentFileDeta.publicId!;
    }

        Post.postType = postType;
        Post.title = title;
        Post.content = content;
        Post.category = category;
        Post.notesCategory = notesCategory;
        Post.tags = tags;
        Post.resourceLink = resourceLink;
        Post.videoLink = videoLink;
        Post.pollQuestion = pollQuestion;
        Post.pollOptions = pollOptions;
        Post.pollDuration = pollDuration;
        Post.visibility = visibility;

        Post.author = new Types.ObjectId(userId) 

        if (userdocumentFileDeta) {
            Post.postDocumentUrl = userdocumentFileDeta.secure_url!;
            Post.postDocumentPublicId = userdocumentFileDeta.publicId!;
        }

        await Post.save();

        return Response.json(
            new ApiResponse(
                200,
                Post,
                "Post updated successfully"
            )
        );

})



export const DELETE = asyncHandler(async (req: Request) => { 

  await dbConnect();

  const { searchParams } = new URL(req.url)
  const postId = searchParams.get("postId");

  const session = await getServerSession(authOptions);

  if (!session?.user?._id) {
    throw new ApiError(401, "Unauthorized");
  }

  const post = await UserPostModel.findById(postId);

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  // Sirf owner apni post delete kar sakta hai
  if (post.author.toString() !== session.user._id.toString()) {
    throw new ApiError(403, "You are not allowed to delete this post");
  }

  await UserPostModel.findByIdAndDelete(postId);

  return Response.json(
    new ApiResponse(200, null, "Post deleted successfully")
  );
});













    // if (userVideoFileDeta) {

    //     if (Post.postVideoPublicId) {
    //         await deleteImageHandler(Post.postVideoPublicId);
    //     }

    //     Post.postVideoUrl = userVideoFileDeta.secure_url;
    //     Post.postVideoPublicId = userVideoFileDeta.publicId;
    // }