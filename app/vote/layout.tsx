import { Button } from "@/src/components/ui/button";
import { Card, CardTitle } from "@/src/components/ui/card";
import Link from "next/link";

export default function ResultsLayout(
    props: { children: React.ReactNode }
) {
  return (
    <div className="flex flex-col gap-4 p-4 max-w-md mx-auto min-h-full border-2 border-x">
        <Card className="p-4 py-0">
            <CardTitle className="flex flex-row p-0 items-center" >
              <Link href={"/"} className="flex-none">🏠</Link>
              <p className="inline py-4 w-max flex-auto" > • <Link href={"/vote"}>Voter</Link></p>
            </CardTitle>
        </Card>
        {props.children}
    </div>
  );
}