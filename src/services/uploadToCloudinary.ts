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
  const isPdf = file.type === "application/pdf";
  const isDoc =
  file.type === "application/msword" ||
  file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

  const isDocument = isPdf || isDoc;

  if (!isImage && !isVideo && !isDocument) {
    throw new Error("Only image and video files are allowed");
  }

  // Size validation
  if (isImage && file.size > 2 * 1024 * 1024) {
    throw new Error("Image size must be less than 2MB");
  }

  if (isVideo && file.size > 100 * 1024 * 1024) {
    throw new Error("Video size must be less than 100MB");
  }

  if (isDocument && file.size > 20 * 1024 * 1024) {
    throw new Error("Document size must be less than 20MB");
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

export const deleteImageHandler = async (publicId: string) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);

    return result;
  } catch (error) {
    console.log("Delete Image Error:", error);
    return null;
  }
};