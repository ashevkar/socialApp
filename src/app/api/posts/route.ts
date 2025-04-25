import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();
  const post = await prisma.post.create({
    data: { title: body.title, content: body.content },
  });

  return NextResponse.json(post);
}
export async function GET() {
    const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(posts);
  }