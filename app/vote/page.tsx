import { Card, CardTitle } from "@/src/components/ui/card";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";

export default async function ResultsListPage() {
  const polls = await prisma.poll.findMany();
  return (
    <>
      {polls.map(poll => (
        <Link key={poll.id} href={`/vote/${poll.id}`}>
          <Card key={poll.id} className="p-4">
            <CardTitle>{poll.question}</CardTitle>
          </Card>
        </Link>
      ))}
    </>
  );
}