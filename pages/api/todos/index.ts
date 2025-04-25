import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const todos = await prisma.todo.findMany();
        res.status(200).json(todos);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch todos' });
      }
      break;

    case 'POST':
      try {
        const { title, userId } = req.body;
        const todo = await prisma.todo.create({
          data: {
            title,
            userId,
          },
        });
        res.status(201).json(todo);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create todo' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
} 