import { NextRequest, NextResponse } from 'next/server';
import { uploadMediaHandler } from '@/src/services/uploadToCloudinary';

   
export async function uploadImageHandler(file: File, folder: string) {
  try {
    // const formData = await request.formData();
    // const file = formData.get("file");

    if (!(file instanceof File)) {
      return {
        success: false,
        message: "File not found or invalid"
      }
    }

    const result = await uploadMediaHandler(file, folder);

    if (!result?.secure_url) {
      return {
        success: false,
        message: "Upload failed"
      }
    }

    return {
      success: true,
      message: "Image uploaded successfully",
      publicId: result.publicId,
      secure_url: result.secure_url
    }

  } catch (error) {
    console.log("Upload image failed", error);

    return {
      success: false,
      message: "Upload image failed"
    };
  }
}