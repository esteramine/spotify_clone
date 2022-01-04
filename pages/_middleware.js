import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
    // token will exist when the user is logged in
    const token = await getToken({req, secret: process.env.JWT_SECRET});
    const { pathname } = req.nextUrl;

    // allow the request to pass through
    // if the token exists or it's a request for next-auth session & provider fetching
    if (pathname.includes('/api/auth') || token) {
        return NextResponse.next();
    }

    // redirect users to login if they don't have token AND are requesting a protected route
    if (!token && pathname !== '/login') {
        return NextResponse.redirect('/login');
    }
}