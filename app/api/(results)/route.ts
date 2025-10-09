import { prisma } from '@src/lib/prisma';
import data from '@src/data/data.json'

// export async function GET() {
//   return Response.json(data);
// }

export async function GET() {
  const data = await prisma.poll.findMany();
  return Response.json(data);
}

export function POST() {
  return new Response("Auth POST");
}