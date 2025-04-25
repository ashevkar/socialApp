import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'PUT':
      try {
        const { title, completed } = req.body;
        const todo = await prisma.todo.update({
          where: { id: id as string },
          data: {
            title,
            completed,
          },
        });
        res.status(200).json(todo);
      } catch (error) {
        res.status(500).json({ error: 'Failed to update todo' });
      }
      break;

    case 'DELETE':
      try {
        await prisma.todo.delete({
          where: { id: id as string },
        });
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete todo' });
      }
      break;

    default:
      res.setHeader('Allow', ['PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
} 