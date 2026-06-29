import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryUploadResult {
  success: boolean;
  message: string;
  publicId: string;
  secure_url: string;
}

export const uploadMediaHandler = async (
  file: File,
  folder: string
): Promise<CloudinaryUploadResult> => {

  if (!file) {
    throw new Error("File Not Found");
  }

  // Allowed types
  const isImage = file.type.startsWith("image/");
  const isVideo = file.type.startsWith("video/");

  if (!isImage && !isVideo) {
    throw new Error("Only image and video files are allowed");
  }

  // Size validation
  if (isImage && file.size > 2 * 1024 * 1024) {
    throw new Error("Image size must be less than 2MB");
  }

  if (isVideo && file.size > 100 * 1024 * 1024) {
    throw new Error("Video size must be less than 100MB");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const result = await new Promise<CloudinaryUploadResult>(
    (resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: isVideo ? "video" : "image",
        },
        (error, result) => {
          if (error) {
            reject(error);
          }

          resolve({
            success: true,
            message: `${isVideo ? "Video" : "Image"} uploaded successfully`,
            publicId: result!.public_id,
            secure_url: result!.secure_url,
          });
        }
      );

      uploadStream.end(buffer);
    }
  );

  return result;
};


//   interface cloudinaryUploadResult {
//     public_id: string,
//     [key: string]: any
//   }


// export async function uploadToCloudinary( file: File, folder: string) {
//   try {

//     if (!file) {
//       throw new Error("File not found");
//     }

//     if (!file.type.startsWith("image/")) {
//       throw new Error("Only images are allowed");
//     }

//     if (file.size > 2 * 1024 * 1024) {
//       throw new Error("File too large");
//     }

//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     const result = await new Promise<cloudinaryUploadResult>(
//       (resolve, reject) => {
//         const uploadStream = cloudinary.uploader.upload_stream(
//           { folder },
//           (error, result) => {
//             if (error) reject(error);
//             else resolve(result as cloudinaryUploadResult);
//           }
//         );

//         uploadStream.end(buffer);
//       }
//     );
    
//     return {
//       publicId: result.public_id,
//       secure_url: result.secure_url,
//     };

//   } catch (error) {
//     console.log("Upload image failed", error);

//     throw error;
//   }
// }