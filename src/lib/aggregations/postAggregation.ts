import { Types } from "mongoose";

// export const postAggregation = (
//   userId: string,
//   sort: Record<string, 1 | -1>,
//   bookmarkIds: Types.ObjectId[],
//   postType?: string | null
// ) => [
//         {
//             $sort: sort
//         },
//         {
//             $lookup: {
//                 from: "comments",
//                 foreignField: "post",
//                 localField: "_id",
//                 as: "comments"
//             },
//         },
//         {     
//             $lookup: {
//                 from: "users",
//                 foreignField: "_id",
//                 localField: "author",
//                 as: "author"
//             }
//         },
//         {
//             $addFields: {
//                 commentsCount: {
//                     $size: "$comments",
//                 },
//                 postLikesCount: {
//                     $size: {
//                         $ifNull: ["$likes", []]
//                     },
//                 },

//                 isLiked: {
//                     $in: [
//                             new Types.ObjectId(userId),
//                         {
//                             $ifNull: ["$likes", []]
//                         }
//                     ]
//                 },

//                 isBookmarked: {
//                     $in: ["$_id", bookmarkIds]
//                 }
//             }
//         },
//         {
//             $unwind: "$author"
//         },
//         {
//             $unset: "comments"
//         },
//         {
//             $project: {
//                 commentsCount: 1,
//                 postLikesCount: 1,
//                 isLiked: 1,
//                 isBookmarked: 1,

//                 _id: 1,
//                 title: 1,
//                 postType: 1,
//                 content: 1,
//                 category: 1,
//                 tags: 1,
//                 resourceLink: 1,
//                 postImageUrl: 1,
//                 postDocumentUrl: 1,
//                 postDocumentPublicId: 1,
//                 postImgPublicId: 1,
//                 videoLink: 1,
//                 pollQuestion: 1,
//                 pollOptions: 1,
//                 pollDuration: 1,
//                 visibility: 1,
//                 likes: 1,

//                 "author.userProfile.profileName": 1,
//                 "author.userProfile.profileImgUrl": 1,
//             }
//         }
//     ]


export const postAggregation = (
  userId: string,
  sort: Record<string, 1 | -1>,
  bookmarkIds: Types.ObjectId[],
  postType?: string | null
) => {
  const pipeline: any[] = [];

  // 👇 Agar postType mila hai to filter laga do
  if (postType) {
    pipeline.push({
      $match: {
        postType: postType.toLowerCase(),
      },
    });
  }

  pipeline.push(
    {
      $sort: sort,
    },
    {
      $lookup: {
        from: "comments",
        foreignField: "post",
        localField: "_id",
        as: "comments",
      },
    },
    {
      $lookup: {
        from: "users",
        foreignField: "_id",
        localField: "author",
        as: "author",
      },
    },
    {
      $addFields: {
        commentsCount: {
          $size: "$comments",
        },
        postLikesCount: {
          $size: {
            $ifNull: ["$likes", []],
          },
        },
        isLiked: {
          $in: [
            new Types.ObjectId(userId),
            {
              $ifNull: ["$likes", []],
            },
          ],
        },
        isBookmarked: {
          $in: ["$_id", bookmarkIds],
        },
      },
    },
    {
      $unwind: "$author",
    },
    {
      $unset: "comments",
    },
    {
      $project: {
        commentsCount: 1,
        postLikesCount: 1,
        isLiked: 1,
        isBookmarked: 1,
        notesCategory: 1,

        _id: 1,
        title: 1,
        postType: 1,
        content: 1,
        category: 1,
        className: 1,
        tags: 1,
        resourceLink: 1,
        postImageUrl: 1,
        postDocumentUrl: 1,
        postDocumentPublicId: 1,
        postImgPublicId: 1,
        videoLink: 1,
        pollQuestion: 1,
        pollOptions: 1,
        pollDuration: 1,
        visibility: 1,
        likes: 1,

        "author._id": 1,
        "author.userProfile.profileName": 1,
        "author.userProfile.profileImgUrl": 1,
      },
    }
  );

  return pipeline;
};