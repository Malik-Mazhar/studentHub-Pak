import dbConnect from "@/src/lib/dbConnect";
import UserModel from "@/src/models/user";
import { authOptions } from "../../../auth/[...nextauth]/options";
import { useSession } from 'next-auth/react';
import { getServerSession } from "next-auth";
import { uploadImageHandler } from "@/src/middlewares/uploads";
import { ApiError } from "@/src/lib/apiError";
import { asyncHandler } from "@/src/lib/asyncandler";
import { ApiResponse } from "@/src/lib/apiResponse";
import { v2 as cloudinary } from "cloudinary";

export const POST = asyncHandler( async (req: Request) => {
    await dbConnect();

    const data = await req.formData();

    const profileImg = data.get("profileImg");
    const coverImg = data.get("coverImg");

    let profileImgData = null;
    let coverImgData = null;

    if (profileImg instanceof File && profileImg.size > 0) {
      profileImgData = await uploadImageHandler(profileImg, "user-profile");

      if (!profileImgData) {
        throw new ApiError(500, "Service problem");
      }
    };

    if (coverImg instanceof File && coverImg.size > 0) {
      coverImgData = await uploadImageHandler(coverImg, "user-coverImg");

      if (!coverImgData) {
        throw new ApiError(500, "Service problem");
      }
    };

    const session = await getServerSession(authOptions);
    const userId = session?.user._id;

    if (!userId) {
       throw new ApiError(403, "Unauthorized")
    };

    const currentUser = await UserModel.findById(userId);

    if(profileImgData){
      const oldProfileImgPublicId = currentUser?.userProfile.profileImgPublicId
      if(oldProfileImgPublicId) {
         await cloudinary.uploader.destroy(oldProfileImgPublicId)
      }
    };

    if(coverImgData){
      const oldCoverImgPublicId = currentUser?.userProfile.coverImgPublicId
      if(oldCoverImgPublicId) {
         await cloudinary.uploader.destroy(oldCoverImgPublicId)
      }
    };


    const updateData: any = {
    "userProfile.profileName": data.get("profileName"),
    "userProfile.bio": data.get("Bio"),
    "userProfile.pinnedDetail": data.get("pinnedDetail"),
    "userProfile.location": data.get("location"),
    "userProfile.birthday": data.get("birthday"),
    "userProfile.gender": data.get("gender"),
  };

  if (profileImgData) {
    updateData["userProfile.profileImgUrl"] = profileImgData.secure_url;
    updateData["userProfile.profileImgPublicId"] = profileImgData.publicId;
  }; 
  
  if (coverImgData) {
    updateData["userProfile.coverImageUrl"] = coverImgData.secure_url;
    updateData["userProfile.profileImgPublicId"] = coverImgData.publicId;
  };



  const updatedUser = await UserModel.findByIdAndUpdate(
    userId, 
    { $set: updateData },
    { new: true }
  );

  return Response
  .json(
    new ApiResponse(200, updatedUser, "your profile is updated now")
  );

});



export const GET = asyncHandler( async (req: Request) => {
      await dbConnect();

      const session = await getServerSession(authOptions);
      const userId = session?.user?._id;

      const updatedUser = await UserModel.findById(userId);

      return Response
      .json(new ApiResponse(200, updatedUser, "profileData"))
});