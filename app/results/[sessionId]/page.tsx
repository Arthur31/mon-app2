import { notFound } from "next/navigation";

export default async function ResultPage(props: { 
    params: { sessionId: string } 
}) {
    const params = await props.params

    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // notFound();
    // throw new Error("Error in ResultPage");
  return (
    <div>Result Poll {params.sessionId}</div>
  );
}