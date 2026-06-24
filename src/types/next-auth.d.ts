import 'next-auth';
import { DefaultSession } from './../../node_modules/next-auth/core/types.d';
import "next-auth/jwt";

declare module "next-auth" {
    interface User {
        _id?: string;
        isverifyed?: boolean;
        isAcceptMessage?: boolean;
        username?: string
    }

    interface Session {
        user: {
            _id?: string;
            isverifyed?: boolean;
            isAcceptMessage?: boolean;
            username?: string
        } & DefaultSession['user']
    }
};

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    isverifyed?: boolean;
    isAcceptMessage?: boolean;
    username?: string;
  }
}