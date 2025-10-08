"use client";

import { Button } from "@/src/components/ui/button";
import Link from "next/link";

export default function ErrorPage() {
  return <div className="flex flex-col gap-4 justify-center items-center h-full p-4">
      <p>
        Unable to retrive the Poll
      </p>
      <Button className="flex flex-1"><Link href={"/results"}>Back</Link></Button>
    </div>;
}