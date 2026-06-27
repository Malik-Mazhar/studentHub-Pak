import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/src/lib/dbConnect";
import UserModel from "@/src/models/user";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Missing Google OAuth env variables");
};

export const authOptions: NextAuthOptions = {
    providers: [
    CredentialsProvider({
            id: "credentials",
            name: "credentials",
            
        credentials: {
            email: { label: "Email", type: "email"},
            password: { label: "Password", type: "password" }
        },

        async authorize (credentials:any): Promise<any> {
            await dbConnect();

            try {
                const user = await UserModel.findOne({
                    $or: [
                        {email: credentials.identifier},
                        {username: credentials.identifier}
                    ]
                })

                if(!user){
                    throw new Error("No user found with this email")
                };

                if(!user.isverifyed){
                    throw new Error("Please verify your account before login")
                };

                const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
                if(isPasswordCorrect){
                    return user;
                }else {
                    throw new Error("Incorrect Password")
                };

            } catch (err: any) {
                throw new Error(err) 
            }
        }
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
    ],

    callbacks: {
        async signIn({ user }) {
                if (!user?.email) return false;

                return true;
        },

        async jwt({ token, user, account }) {

        if(user){
            let dbUser = null
            
            if(account?.provider === "google"){
                await dbConnect();

                dbUser = await UserModel.findOne({
                   email: user.email,
                });

            }

            token._id = dbUser?._id?.toString() || user?._id?.toString();
            token.isverifyed = dbUser?.isverifyed || user?.isverifyed;
            token.isAcceptMessage = dbUser?.isAcceptMessage || user?.isAcceptMessage;
            token.username = dbUser?.username || user?.username
        };
        
        return token
        },

        async session({ session, token }) {

        if(token){
            session.user._id = token._id;
            session.user.isverifyed = token.isverifyed;
            session.user.isAcceptMessage = token.isAcceptMessage;
            session.user.username = token.username
        }

        return session
    },

    },

    events: {
        async signIn({ user, account }) {

            if (account?.provider !== "google") return;

            try {
                await dbConnect();

                if (!user?.email) return;

                const existingUser = await UserModel.findOne({
                    email: user.email,
                });

                if (!existingUser) {
                    await UserModel.create({
                        username: user?.name ||  user.email?.split("@")[0], // ❗ NOT user.username
                        email: user.email,
                        verifyCodeExpiry: new Date(Date.now() + 60 * 60 * 1000),
                        isverifyed: true,
                    });
                }

            } catch (error) {
                console.error(error);
            }
        },
    },

    pages: {
    signIn: '/sign-in',
    },

    session: {
    strategy: "jwt"
    },

    secret: process.env.NEXTAUTH_SECRET
};