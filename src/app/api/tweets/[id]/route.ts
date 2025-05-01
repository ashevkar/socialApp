import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma"; // or your db client

type SessionUserWithId = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const tweet = await prisma.tweet.findUnique({ where: { id } });
  if (!tweet) {
    return NextResponse.json({ error: "Tweet not found" }, { status: 404 });
  }

  if (
    !session.user ||
    tweet.authorId !== (session.user as SessionUserWithId).id
  ) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  // Delete all likes associated with the tweet before deleting the tweet
  await prisma.like.deleteMany({ where: { tweetId: id } });
  await prisma.tweet.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

