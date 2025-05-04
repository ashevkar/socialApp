import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();
  const post = await prisma.tweet.create({
    data: { 
      content: body.content,
      authorId: body.authorId
    },
  });

  return NextResponse.json(post);
}
export async function GET() {
    const posts = await prisma.tweet.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(posts);
  }