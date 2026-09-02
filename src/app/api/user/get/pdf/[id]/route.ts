import { NextRequest } from "next/server";
import UserPostModel from "@/src/models/post";
import dbConnect from "@/src/lib/dbConnect";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log("postId", id)

    await dbConnect();
    
    if (!id) {
      return new Response("PostId is required", {
        status: 404,
      });
    }

    const post = await UserPostModel.findById(id).select("postDocumentUrl");

    if (!post) {
      return new Response("Post not found", {
        status: 404,
      });
    }

    if (!post.postDocumentUrl) {
      return new Response("PDF not found", {
        status: 404,
      });
    }

    // Cloudinary se PDF fetch
    const response = await fetch(post.postDocumentUrl);

    if (!response.ok) {
      return new Response("Unable to fetch PDF", {
        status: 500,
      });
    }

    const buffer = await response.arrayBuffer();

    // Check: view ya download?
    const download =
      request.nextUrl.searchParams.get("download") === "true";

    return new Response(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": download
          ? "attachment; filename=document.pdf"
          : "inline",
      },
    });
  } catch (error) {
    console.error("PDF API Error:", error);

    return new Response("Something went wrong", {
      status: 500,
    });
  }
}