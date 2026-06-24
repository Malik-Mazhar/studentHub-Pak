import {z} from "zod"

export const verifySchema = z.object({
   otp: z.string().length(6, "verification code must be a 6 digits")
});