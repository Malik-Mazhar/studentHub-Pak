import UserModel from "@/src/models/user";

export async function POST(req: Request) {
  const { email } = await req.json();

  await UserModel.deleteOne({ email });

  return Response.json({ success: true });
}