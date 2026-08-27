import { Types } from "mongoose";

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

    // Comments
    {
      $lookup: {
        from: "comments",
        foreignField: "targetId",
        localField: "_id",
        as: "comments",
      },
    },

    // Author
    {
      $lookup: {
        from: "users",
        foreignField: "_id",
        localField: "author",
        as: "author",
      },
    },

    // Current user's vote
    {
      $lookup: {
        from: "pollvotes",
        let: { postId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$postId", "$$postId"] },
                  {
                    $eq: [
                      "$userId",
                      new Types.ObjectId(userId),
                    ],
                  },
                ],
              },
            },
          },
          {
            $project: {
              _id: 0,
              option: 1,
            },
          },
        ],
        as: "userVote",
      },
    },

    // Poll vote statistics
    {
      $lookup: {
        from: "pollvotes",
        let: { postId: "$_id" },

        pipeline: [
          // Get all votes of this poll
          {
            $match: {
              $expr: {
                $eq: ["$postId", "$$postId"],
              },
            },
          },

          // Count votes for each option
          {
            $group: {
              _id: "$option",
              votes: {
                $sum: 1,
              },
            },
          },
        ],

        as: "pollVoteStats",
      },
    },

    // Basic calculated fields
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

        hasVoted: {
          $gt: [
            {
              $size: "$userVote",
            },
            0,
          ],
        },

        votedOption: {
          $ifNull: [
            {
              $arrayElemAt: [
                "$userVote.option",
                0,
              ],
            },
            null,
          ],
        },

        // Total votes
        totalVotes: {
          $sum: "$pollVoteStats.votes",
        },
      },
    },

    // Create poll results
    {
      $addFields: {
        pollResults: {
          $map: {
            input: "$pollOptions",
            as: "option",

            in: {
              option: "$$option",

              // Find votes for this option
              votes: {
                $let: {
                  vars: {
                    matchedVote: {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: "$pollVoteStats",
                            as: "vote",

                            cond: {
                              $eq: [
                                "$$vote._id",
                                "$$option",
                              ],
                            },
                          },
                        },
                        0,
                      ],
                    },
                  },

                  in: {
                    $ifNull: [
                      "$$matchedVote.votes",
                      0,
                    ],
                  },
                },
              },
            },
          },
        },
      },
    },

    // Calculate percentage
    {
      $addFields: {
        pollResults: {
          $map: {
            input: "$pollResults",
            as: "result",

            in: {
              option: "$$result.option",

              votes: "$$result.votes",

              percentage: {
                $cond: [
                  {
                    $gt: [
                      "$totalVotes",
                      0,
                    ],
                  },

                  {
                    $round: [
                      {
                        $multiply: [
                          {
                            $divide: [
                              "$$result.votes",
                              "$totalVotes",
                            ],
                          },
                          100,
                        ],
                      },
                      0,
                    ],
                  },

                  0,
                ],
              },
            },
          },
        },
      },
    },

    // Author
    {
      $unwind: "$author",
    },

    // Remove unnecessary fields
    {
      $unset: [
        "comments",
        "userVote",
        "pollVoteStats",
      ],
    },

    // Final response
    {
      $project: {
        commentsCount: 1,
        postLikesCount: 1,
        isLiked: 1,
        isBookmarked: 1,

        // Poll user information
        hasVoted: 1,
        votedOption: 1,

        // Poll statistics
        totalVotes: 1,
        pollResults: 1,

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
        postVideoUrl: 1,
        postDocumentUrl: 1,

        postImgPublicId: 1,
        postVideoPublicId: 1,
        postDocumentPublicId: 1,

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


  // pipeline.push(
  //   { 
  //     $sort: sort,
  //   },
  //   {
  //     $lookup: {
  //       from: "comments",
  //       foreignField: "targetId",
  //       localField: "_id",
  //       as: "comments",
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "users",
  //       foreignField: "_id",
  //       localField: "author",
  //       as: "author",
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "pollvotes",
  //       let: { postId: "$_id" },
  //       pipeline: [
  //         {
  //           $match: {
  //             $expr: {
  //               $and: [
  //                 { $eq: ["$postId", "$$postId"] },
  //                 { $eq: ["$userId", new Types.ObjectId(userId)] },
  //               ],
  //             },
  //           },
  //         },
  //         {
  //           $project: {
  //             _id: 0,
  //             option: 1,
  //           },
  //         },
  //       ],
  //       as: "userVote",
  //     },
  //   },
  //   {
  //     $addFields: {

  //       commentsCount: {
  //         $size: "$comments",
  //       },

  //       postLikesCount: {
  //         $size: {
  //           $ifNull: ["$likes", []],
  //         },
  //       },

  //       isLiked: {
  //         $in: [
  //           new Types.ObjectId(userId),
  //           {
  //             $ifNull: ["$likes", []],
  //           },
  //         ],
  //       },

  //       isBookmarked: {
  //         $in: ["$_id", bookmarkIds],
  //       },

  //       hasVoted: {
  //         $gt: [{ $size: "$userVote" }, 0],
  //       },

  //       votedOption: {
  //         $ifNull: [
  //           { $arrayElemAt: ["$userVote.option", 0] },
  //           null,
  //         ],
  //       },

  //     },
  //   },
  //   {
  //     $unwind: "$author",
  //   },
  //   {
  //     $unset: "comments",
  //   },
  //   {
  //     $project: {
  //       commentsCount: 1,
  //       postLikesCount: 1,
  //       isLiked: 1,
  //       isBookmarked: 1,
  //       notesCategory: 1,
  //       hasVoted: 1,
  //       votedOption: 1,

  //       _id: 1,
  //       title: 1,
  //       postType: 1,
  //       content: 1,
  //       category: 1,
  //       className: 1,
  //       tags: 1,
  //       resourceLink: 1,

  //       postImageUrl: 1,
  //       postVideoUrl: 1,
  //       postDocumentUrl: 1,
  //       postImgPublicId: 1,
  //       postVideoPublicId: 1,
  //       postDocumentPublicId: 1,

  //       videoLink: 1,
  //       pollQuestion: 1,
  //       pollOptions: 1,
  //       pollDuration: 1,
  //       visibility: 1,
  //       likes: 1,

  //       "author._id": 1,
  //       "author.userProfile.profileName": 1,
  //       "author.userProfile.profileImgUrl": 1,
  //     },
  //   }
  // );