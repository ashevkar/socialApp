import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Find the current user
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true }
  });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Find likes on tweets authored by the current user, excluding self-likes
  const likes = await prisma.like.findMany({
    where: {
      tweet: { authorId: user.id },
      NOT: { userId: user.id }
    },
    include: {
      tweet: {
        include: { author: true }
      },
      user: true // the user who liked
    },
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json(likes);
}
