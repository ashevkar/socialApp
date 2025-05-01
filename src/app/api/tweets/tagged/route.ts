import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");
  if (!username) {
    return NextResponse.json({ error: "Username required" }, { status: 400 });
  }

  // Find tweets where content includes @username (case-insensitive)
  const tweets = await prisma.tweet.findMany({
    where: {
      content: {
        contains: `@${username}`,
        mode: "insensitive",
      },
    },
    include: {
      author: true,
      likes: true,
      comments: { include: { user: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(tweets);
}
