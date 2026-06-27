import sendVerificationEmail from "@/src/lib/sandVerificationEmail";
import dbConnect from "@/src/lib/dbConnect";
import UserModel from "@/src/models/user";
import bcrypt from "bcryptjs";

export async function POST(req: Request){
  await dbConnect();

  try {

    const {username, email, password} = await req.json();

    const exsitingUserVerifiedByUsername = await UserModel.findOne({username, isverifyed: true});
    if(exsitingUserVerifiedByUsername){
      return Response.json({
        success: false,
        message: "Username is already taken"
      }, {status: 400})
    };

    const existUserByEmail = await UserModel.findOne({email});

    const genrateVerificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    if(existUserByEmail){
      if(existUserByEmail.isverifyed){
        return Response.json({
          success: false,
          message: "User already exist with this email"
        }, { status: 403})
      }else{
        const hashedPassword = await bcrypt.hash(password, 10);
        existUserByEmail.password = hashedPassword;
        existUserByEmail.verifyCode = genrateVerificationCode;
        existUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);

        await existUserByEmail.save()
      }
    }else{
      const hashedPassword = await bcrypt.hash(password, 10);

      const verificationCodeExpiry = new Date(Date.now() + 60 * 60 * 1000);

      const newUser = new UserModel({
        username: username,
        email: email,
        password: hashedPassword,
        verifyCode: genrateVerificationCode,
        verifyCodeExpiry: verificationCodeExpiry,
        isverifyed: false,
        isAcceptMessage: true,
      });

        await newUser.save()
    };

    // email verification

    const emailResponse = await sendVerificationEmail(username, email, genrateVerificationCode)
    console.log("Email Responsse :", emailResponse)

      if(!emailResponse.success){
         return Response.json({
          success: false,
          message: emailResponse.message,
        }, {status: 500}
       )
      };

      return Response.json({
        success: true,
        message: "User Register successfully. Please verify your email.",
        username,
      },{ status: 201});
      
  } catch (error) {
          console.error("Error Registring user!", error);
         return Response.json(
          {
            success: false,
            message: "user Registering throw error!"
          },
          {
            status: 500
          }
      )
  }
  
};