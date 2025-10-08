import { Card, CardTitle } from "@src/components/ui/card";
import { prisma } from "@src/lib/prisma";
import Link from "next/link";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

export default async function ResultsListPage() {
  
  // const polls = await fetch('http://localhost:3000/api/results')
  //   .then(res => res.json());
  //   console.log(polls);
    
  const polls = await prisma.poll.findMany();
    
  return (
    <>
      {polls.map((poll: { id: Key | null | undefined; question: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
        <Link key={poll.id} href={`/results/${poll.id}`}>
          <Card key={poll.id} className="p-4">
            <CardTitle>{poll.question}</CardTitle>
          </Card>
        </Link>
      ))}
    </>
  );
}