"use client";

import { Button } from "@src/components/ui/button";
import Link from "next/link";

export default function ErrorPage(props: { message?: string }) {
  return <div className="flex flex-col gap-4 justify-center items-center h-full w-full">
    <p>
      {props.message ?? "Unable to retrive the Poll"}
    </p>
    <Button className="flex flex-1 w-full"><Link href={"/results"}>Back</Link></Button>
  </div>;
}