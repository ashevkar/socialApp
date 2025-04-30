import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

// GET: Fetch current user's profile
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      name: true,
      email: true,
      username: true,
      bio: true,
      profileImage: true,
    },
  });

  return NextResponse.json(user);
}

// PUT: Update current user's profile
export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const data = await req.json();
  const { name, username, bio, profileImage } = data;

  const user = await prisma.user.update({
    where: { email: session.user.email },
    data: { name, username, bio, profileImage },
    select: {
      name: true,
      email: true,
      username: true,
      bio: true,
      profileImage: true,
    },
  });

  return NextResponse.json(user);
}
