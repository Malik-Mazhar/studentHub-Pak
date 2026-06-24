import { account } from "./config";
import { ID } from "appwrite";

export const signUp = async (name: string, email: string, password: string) => {
    return await account.create(
        ID.unique(),  // 👈 correct
        email,        // 👈 correct position
        password,     // 👈 correct position
        name 
    )
};

export const verifyEmail = async () => {
    return await account.createVerification("http://localhost:3000/verify")
};

export const signIn  = async (email: string, password: string) => {
    return await account.createEmailPasswordSession(email, password)
};

export const logOut = async () => {
    return await account.deleteSession("current")
};

export const getCurrentUser = async () => {
    return await account.get()
};