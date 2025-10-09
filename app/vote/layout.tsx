import { auth } from "@/src/lib/auth";
import { Card, CardTitle } from "@src/components/ui/card";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ResultsLayout(
  props: { children: React.ReactNode }
) {

  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (!session) {
    redirect("/")
  }

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