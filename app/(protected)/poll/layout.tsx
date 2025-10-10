import { Button } from "@/src/components/ui/button";
import { Card, CardTitle } from "@src/components/ui/card";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function ResultsLayout(
  props: { children: React.ReactNode }
) {

  return (
    <>
      <Card className="p-4 py-0">
        <CardTitle className="flex flex-row p-0 items-center" >
          <Link href={"/"} className="flex-none">🏠</Link>
          <p className="inline py-4 w-max flex-auto" > • <Link href={"/poll"}>Voter</Link></p>
          <Link href={"/poll/create"}>
            <Button variant="ghost" className="flex-none">
              <Plus size={16} />
            </Button>
          </Link>
        </CardTitle>
      </Card>
      {props.children}
    </>
  );
}