import { NextRequest, NextResponse } from 'next/server';
import { uploadToCloudinary } from '@/src/services/uploadToCloudinary';

   
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({
        success: false,
        message: "File not found"
      }, { status: 400 });
    };

    const result = await uploadToCloudinary(file, "user-profile")
    
    return NextResponse.json({
      success: true,
      message: "Image uploaded successfully",
      publicId: result.publicId,
      secure_url: result.secure_url
    });

  } catch (error) {
    console.log("Upload image failed", error);

    return NextResponse.json({
      success: false,
      message: "Upload image failed"
    }, { status: 500 });
  }
}