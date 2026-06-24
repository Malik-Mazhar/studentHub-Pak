import * as z from "zod"; 

export const userNameValidation = z
.string()
.trim()
.min(2, "Too short!")
.max(15, "Username must be no more then 15 characters")
.regex(/^[a-zA-Z0-9_]+$/ , "Username must not contain special charater")

export const signUpSchema  = z.object({
    username: userNameValidation,
    email: z.string().trim().email({message: "Invalid email address"}),
    password: z.string().min(8, {message: "password must be atleast 8 characters"})
});