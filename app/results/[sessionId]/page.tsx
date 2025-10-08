
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { notFound } from "next/navigation";
import { PieChartComponent } from "./pieChart";
import Link from "next/link";
import { Counter } from "./counter";
import UserList from "./user-list";

export default async function ResultPage(props: {
  params: { sessionId: string }
}) {
  const params = await props.params

  const chartData = [
    { browser: "no", visitors: 200, fill: "var(--chart-1)" },
    { browser: "yes", visitors: 275, fill: "var(--chart-2)" }
  ];

  await new Promise((resolve) => setTimeout(resolve, 500));
  // notFound();
  // throw new Error("Error in ResultPage");
  return (
    <div className="flex flex-col gap-4">
      <Card className="p-4">
        <CardTitle>Result Poll {params.sessionId}</CardTitle>
        <CardContent className="flex-1 pb-0">
          <PieChartComponent chartData={chartData} />
        </CardContent>
        <CardFooter className="flex justify-between gap-4">
          <Link href={"/results"}>Back</Link>
          <Counter/>
        </CardFooter>
      </Card>
      <UserList/>
    </div>

    // <div>Result Poll {params.sessionId}</div>
  );
}