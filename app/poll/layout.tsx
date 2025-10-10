import { Button } from "@/src/components/ui/button";
import { auth } from "@/src/lib/auth";
import { Card, CardTitle } from "@src/components/ui/card";
import { Plus } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect, unauthorized } from "next/navigation";

export default async function ResultsLayout(
  props: { children: React.ReactNode }
) {

  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (!session) {
    // redirect("/")
    unauthorized()
  }

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