import { Card, CardTitle } from "@src/components/ui/card";
import { prisma } from "@src/lib/prisma";
import Link from "next/link";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

export default async function ResultsListPage() {

  // A ne pas faire ❌
  // const polls = await fetch('http://localhost:3000/api/results')
  //   .then(res => res.json());
  //   console.log(polls);

  // A faire ✅
  const polls = await prisma.poll.findMany({
    include: {
      responses: true
    }
  });

  return (
    <>
      {polls.map((poll) => (
        <Link key={poll.id} href={`/results/${poll.id}`}>
          <Card key={poll.id} className="p-4">
            <CardTitle className="flex flex-row">
              {poll.question}
              <div className="flex-1"></div>
              {poll.responses.length}
            </CardTitle>
          </Card>
        </Link>
      ))}
    </>
  );
}