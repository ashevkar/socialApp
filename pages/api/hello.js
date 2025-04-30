import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();

  const { username } = req.query;
  if (!username) return res.status(400).json({ error: 'Username required' });

  try {
    const user = await prisma.user.findUnique({
      where: { username: String(username) },
      select: {
        id: true,
        name: true,
        username: true,
        bio: true,
        profileImage: true,
        coverImage: true,
        createdAt: true,
        followers: { select: { followerId: true } },
        following: { select: { followingId: true } },
      },
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function getUserProfile(username) {
  return prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      name: true,
      username: true,
      bio: true,
      profileImage: true,
      coverImage: true,
      createdAt: true,
      followers: { select: { followerId: true } },
      following: { select: { followingId: true } },
    },
  });
}