import dbConnect from "@/src/lib/dbConnect";
import UserModel from "@/src/models/user";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const {username, code} = await request.json();

        const decodedUsername = decodeURIComponent(username);
        const user = await UserModel.findOne({username: decodedUsername});

        if (!user){
            return Response.json({
            success: false,
            message: "User not found"
            }, { status: 500 })
        };

        // Check if the code is correct and not expired
        const isCodeValid = user.verifyCode === code;
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

        if(isCodeValid && isCodeNotExpired) {
             // Update the user's verification status
            user.isverifyed = true;
            await user.save()

            return Response.json({
            success: true,
            message: "Account verified successfully"
            }, { status: 200 })
        }else if(!isCodeNotExpired){
            // code has expired
            return Response.json({
            success: false,
            message: "Verification code has expired, please sign-up again to get a new code"
            }, { status: 400 })
        }else {
            // Code is Incrrect
            return Response.json({
            success: false,
            message: "Incorrect verication code"
            }, { status: 400 })
        };

    } catch (error) {
    console.log("Error verifing user", error)
    Response.json({
        success: false,
        message: "Error verifing user"
    }, { status: 500 })
    }
}