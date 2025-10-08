"use client";

import { Button } from "@/src/components/ui/button";
import { useState } from "react";

export const Counter = () => {
  const [count, setCount] = useState(0);

  return <Button className="flex flex-1" onClick={() => setCount(count + 1)}>{count}</Button>;
}