import { asyncHandler } from "@/src/lib/asyncandler";
import dbConnect from "@/src/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";
import { ApiError } from "@/src/lib/apiError";
import UserPostModel from "@/src/models/post";
import { ApiResponse } from "@/src/lib/apiResponse";
import { Types } from "mongoose";

export const GET = asyncHandler( async (req:Request) => {
    await dbConnect();

    const session = await getServerSession(authOptions);
    const userId = session?.user._id;

    if (!userId) {
        throw new ApiError(401, "user Unauthorized" )
    };

    // const posts = await UserPostModel.find();       //if first latest post .sort({ createdAt: -1 });

    const getAllPosts = await UserPostModel.aggregate([
        {
            $sort: {
                createdAt: -1
            }
        },
        {
            $lookup: {
                from: "comments",
                foreignField: "post",
                localField: "_id",
                as: "comments"
            },
        },
        {     
            $lookup: {
                from: "users",
                foreignField: "_id",
                localField: "author",
                as: "author"
            }
        },
        {
            $addFields: {
                commentsCount: {
                    $size: "$comments",
                },
                postLikesCount: {
                    $size: {
                        $ifNull: ["$likes", []]
                    },
                },

                isLiked: {
                    $in: [
                            new Types.ObjectId(userId),
                        {
                            $ifNull: ["$likes", []]
                        }
                    ]
                }
            }
        },
        {
            $unwind: "$author"
        },
        {
            $unset: "comments"
        },
        {
            $project: {
                commentsCount: 1,
                postLikesCount: 1,
                isLiked: 1,

                _id: 1,
                title: 1,
                postType: 1,
                content: 1,
                category: 1,
                tags: 1,
                resourceLink: 1,
                postImageUrl: 1,
                postImgPublicId: 1,
                videoLink: 1,
                pollQuestion: 1,
                pollOptions: 1,
                pollDuration: 1,
                visibility: 1,
                likes: 1,

                "author.userProfile.profileName": 1,
                "author.userProfile.profileImgUrl": 1,
            }
        }
    ]);

    // console.log("getAllPosts", posts)

    if(!getAllPosts){
        throw new ApiError(400, "cannection Error")
    }

    return Response
    .json(
        new ApiResponse(201, getAllPosts, "fatchig all post successfully")
    );

});