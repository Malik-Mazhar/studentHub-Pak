import { NextResponse } from "next/server";
import { NextRequest } from 'next/server'

export function middleware(request: NextRequest){
    const token = request.cookies.get("sessionToken");

    if(!token && request.nextUrl.pathname.startsWith("/dashboard")){
        return NextResponse.redirect(new URL("/login", request.url))
    };

   return NextResponse.next();
};

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/dashboard/:path*',
};