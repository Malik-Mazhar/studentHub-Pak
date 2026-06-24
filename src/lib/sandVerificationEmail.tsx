import  verifycationEmail  from '@/emails/verifycationEmail'
import { resend } from '../services/resand';

export default async function sandVerificationEmail(username:string, email:string, genrateVerificationCode:string) {
    
console.log("api key is this",process.env.RESEND_API_KEY)
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Hello world',
      react: verifycationEmail({ username, otp:genrateVerificationCode}),
    });

    return {
        success: true,
        message: "Verification email sand Succesfully."
    }
  } catch (error) {
            console.log("Error Sending verification email!", error)
        return {
          success: false,
          message: "Faile to send verification Email!"
        }
  }
};