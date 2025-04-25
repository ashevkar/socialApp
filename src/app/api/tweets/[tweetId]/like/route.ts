import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(
  req: Request,
  { params }: { params: { tweetId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { tweetId } = params;

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
        userId: session.user.id,
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
          userId: session.user.id,
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