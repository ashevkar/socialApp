import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// Use explicit route handlers with direct function exports instead of using the handler variable
export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions); 