import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// DELETE user by ID
export async function DELETE(request: Request) {
  try {
    // Extract id from URL
    const url = new URL(request.url);
    const pathSegments = url.pathname.split('/');
    const id = pathSegments[pathSegments.length - 1];

    if (!id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id }
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Delete all related records in a transaction
    await prisma.$transaction(async (tx) => {
      // Delete likes by the user
      await tx.like.deleteMany({
        where: { userId: id }
      });

      // Delete comments by the user
      await tx.comment.deleteMany({
        where: { userId: id }
      });

      // Delete follow relationships where user is following or being followed
      await tx.follow.deleteMany({
        where: {
          OR: [
            { followerId: id },
            { followingId: id }
          ]
        }
      });

      // Delete tweets by the user (which will cascade delete related likes and comments)
      await tx.tweet.deleteMany({
        where: { authorId: id }
      });

      // Finally delete the user
      await tx.user.delete({
        where: { id }
      });
    });

    return NextResponse.json(
      { message: 'User deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete user error:', error);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
} 