
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { notFound } from "next/navigation";
import { PieChartComponent } from "@/src/components/pieChart";
import Link from "next/link";
import { Counter } from "@/src/components/counter";
import UserList from "@/src/components/user-list";
import { prisma } from "@/src/lib/prisma";
import { ChartConfig } from "@/src/components/ui/chart";
import { Button } from "@/src/components/ui/button";
import { Suspense } from "react";

// Extend ChartConfig to allow dynamic string keys
type MutableChartConfig = ChartConfig & {
  [key: string]: {
    label: string;
    color?: string;
  };
};

export default async function ResultPage(props: {
  params: { sessionId: string }
}) {
  const params = await props.params

  const currentPoll = await prisma.poll.findUniqueOrThrow({
    where: { id: params.sessionId }
  });

  const response = await prisma.response.findMany({
    where: { pollId: params.sessionId }
  });

  const userList = response.map((resp) => resp.user).reduce((acc: string[], user) => {
    if (!acc.includes(user)) {
      acc.push(user);
    }
    return acc;
  }, []);
  
  const answerCounts = response.reduce<Record<string, number>>((acc, curr) => {
    acc[curr.answer] = (acc[curr.answer] || 0) + 1;
    return acc;
  }, {});

  var chartConfig: MutableChartConfig = {
    visitors: {
      label: "Vote",
    },
  }

  var chartData = new Array();
  var colorIndex = 1;
  Object.entries(answerCounts).map(([answer, count]) => {
    chartData.push({ answer: answer, count: count, fill: `var(--chart-${colorIndex})` })
    
    chartConfig[answer] = {
      label: answer,
      color: `var(--chart-${colorIndex})`,
    };
    colorIndex++;
  })

  await new Promise((resolve) => setTimeout(resolve, 500));
  // notFound();
  // throw new Error("Error in ResultPage");
  return (
    <div className="flex flex-col gap-4">
      <Card className="p-4">
        <CardTitle>{currentPoll?.question}</CardTitle>
        <CardContent className="flex-1 pb-0">
          <PieChartComponent chartData={chartData} chartConfig={chartConfig} />
        </CardContent>
        <CardFooter className="flex justify-between gap-4">
          <Button className="flex flex-1"><Link href={"/results"}>Back</Link></Button>
          <Counter />
        </CardFooter>
      </Card>
      <Suspense fallback={<Card className="p-4"><CardContent>Loading users...</CardContent></Card>}>
        <UserList userList={userList}/>
      </Suspense>
    </div>
  );
}