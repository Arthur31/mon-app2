
import { Card, CardContent, CardFooter, CardTitle } from "@src/components/ui/card";
import { PieChartComponent } from "@src/components/pieChart";
import Link from "next/link";
import { Counter } from "@src/components/counter";
import UserList from "@src/components/user-list";
import { prisma } from "@src/lib/prisma";
import { ChartConfig } from "@src/components/ui/chart";
import { Button } from "@src/components/ui/button";
import { Suspense } from "react";
import ErrorPage from "./error";
import { notFound } from "next/navigation";

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

  // Here, no need to verify if currentPoll is retrive 
  // because findUniqueOrThrow send a error if id is wrong
  // notFound();
  // throw new Error("Error in ResultPage");

  const response = await prisma.response.findMany({
    where: { pollId: params.sessionId },
    include: {
      user: true, // Return all fields
    },
  });

  const userList = response.map((resp) => resp.user.name).filter((name) => name !== null)

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

  JSON.parse(currentPoll.options).forEach((option: string) => {
    if (!answerCounts[option]) {
      answerCounts[option] = 0;
    }
  })

  Object.entries(answerCounts).map(([answer, count]) => {
    chartData.push({ answer: answer, count: count, fill: `var(--chart-${colorIndex})` })

    chartConfig[answer] = {
      label: answer,
      color: `var(--chart-${colorIndex})`,
    };
    colorIndex++;
  })

  if (process.env.DELAY === "true") {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-4">
        <CardTitle>{currentPoll?.question}</CardTitle>
        <CardContent className="flex-1 pb-0">
          {response.length === 0 ? (
            <ErrorPage message="No responses yet" />
          ) : (
            <PieChartComponent chartData={chartData} chartConfig={chartConfig} />
          )}
        </CardContent>
        <CardFooter className="flex justify-between gap-4">
          <Button className="flex flex-1"><Link href={"/results"}>Back</Link></Button>
          <Counter />
        </CardFooter>
      </Card>
      <Suspense fallback={<Card className="p-4"><CardContent>Loading users...</CardContent></Card>}>
        <UserList userList={userList} />
      </Suspense>
    </div>
  );
}