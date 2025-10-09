import { Card, CardTitle } from "@src/components/ui/card";
import { VoteButton } from "@src/components/voteButton";
import Link from "next/link";

export default function ResultsLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="flex flex-col gap-4 p-4 max-w-md mx-auto min-h-full border-2 border-x">
      <Card className="p-4 py-0">
        <CardTitle className="flex flex-row p-0 items-center" >
          <Link href={"/"} className="flex-none">🏠</Link>
          <p className="inline py-4 w-max flex-auto" > • <Link href={"/results"}>Results</Link></p>
          <VoteButton></VoteButton>
        </CardTitle>
      </Card>
      {children}
    </div>
  );
}