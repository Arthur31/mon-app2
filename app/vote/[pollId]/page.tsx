import { Card, CardTitle, CardContent } from "@src/components/ui/card";
import { Button } from "@src/components/ui/button";
import { prisma } from "@src/lib/prisma";
import { voteAction } from "@src/actions/voteAction";


export default async function Page(props: {
    params: { pollId: string }
}) {
    const params = await props.params;
    const pollId = await params.pollId;

    const currentPoll = await prisma.poll.findUnique({
        where: { id: pollId }
    });

    return (
        <Card className="p-4">
            <CardTitle>Vote</CardTitle>
            <CardContent >
                <form action={voteAction} className="flex flex-col gap-4">
                    <input type="hidden" name="pollId" value={pollId} />
                    {currentPoll?.options.split(",").map((option) => (
                        <div key={option} className="flex flex-row gap-2 items-center">
                            <input type="radio" name="vote" value={option} />
                            <label htmlFor={option}>{option}</label>
                        </div>
                    ))}
                    <Button type="submit">Voter</Button>
                </form>
            </CardContent>
        </Card>
    );
}