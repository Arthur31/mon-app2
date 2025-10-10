import { Card, CardTitle } from "@src/components/ui/card";
import { VoteButton } from "@src/components/voteButton";
import Link from "next/link";

export default function ResultsLayout({ children }: { children: React.ReactNode }) {

  return (
    <>
      <Card className="p-4 py-0">
        <CardTitle className="flex flex-row p-0 items-center" >
          <Link href={"/"} className="flex-none">🏠</Link>
          <p className="inline py-4 w-max flex-auto" > • <Link href={"/results"}>Recettes</Link></p>
        </CardTitle>
      </Card>
      {children}
    </>
  );
}