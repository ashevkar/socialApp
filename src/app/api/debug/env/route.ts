import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    nodeEnv: process.env.NODE_ENV,
    databaseConfigured: !!process.env.DATABASE_URL,
    nextAuthConfigured: !!process.env.NEXTAUTH_SECRET && !!process.env.NEXTAUTH_URL,
    vercelEnvironment: process.env.VERCEL_ENV || 'not set',
  });
} 