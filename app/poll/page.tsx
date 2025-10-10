import { Button } from "@/src/components/ui/button";
import { getSession } from "@/src/lib/auth-server";
import { Card, CardTitle } from "@src/components/ui/card";
import { prisma } from "@src/lib/prisma";
import { Pen, Plus } from "lucide-react";
import Link from "next/link";
import EditBtn from "./EditBtn";

export default async function ResultsListPage() {
  const polls = await prisma.poll.findMany();
  const session = await getSession();

  return (
    <>
      {polls.map(poll => (
        <Link key={poll.id} href={`/poll/${poll.id}`}>
          <Card key={poll.id} className="p-4">
            {/* <CardTitle>{poll.question}</CardTitle> */}
            <CardTitle className="flex flex-row items-center w-full">
              <p>{poll.question}</p>
              <div className="flex-1"></div>
              <EditBtn
                shouldVisible={poll.userId == session?.user.id}
                url={`/poll/${poll.id}?edit`} />
            </CardTitle>
          </Card>
        </Link>
      ))}
    </>
  );
}