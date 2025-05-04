import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Add proper types for NextAuth session
type SessionUserWithId = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export async function POST(
  req: NextRequest, 
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const tweetId = id;

    // Check if the tweet exists
    const tweet = await prisma.tweet.findUnique({
      where: { id: tweetId },
    });

    if (!tweet) {
      return NextResponse.json(
        { error: 'Tweet not found' },
        { status: 404 }
      );
    }

    // Check if the user has already liked the tweet
    const existingLike = await prisma.like.findFirst({
      where: {
        userId: (session.user as SessionUserWithId).id,
        tweetId,
      },
    });

    if (existingLike) {
      // Unlike the tweet
      await prisma.like.delete({
        where: { id: existingLike.id },
      });
    } else {
      // Like the tweet
      await prisma.like.create({
        data: {
          userId: (session.user as SessionUserWithId).id,
          tweetId,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error toggling like:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 