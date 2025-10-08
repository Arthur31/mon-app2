import { Card, CardTitle } from "@/src/components/ui/card";
import { Skeleton } from "@/src/components/ui/skeleton";

export default function Loading() {
  return (
    <Card className="p-4">
      <CardTitle><Skeleton className="h-[23px] w-[150px]" /> </CardTitle>
    </Card>
  );
}