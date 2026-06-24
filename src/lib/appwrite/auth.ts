import { account } from "./config";

export const signUp = async (name: string, email: string, password: string) => {
    return await account.create("unique()", name, email, password)
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