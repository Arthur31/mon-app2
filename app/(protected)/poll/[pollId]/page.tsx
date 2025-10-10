import { Card, CardTitle, CardContent } from "@src/components/ui/card";
import { Button } from "@src/components/ui/button";
import { prisma } from "@src/lib/prisma";
import { voteAction } from "@src/actions/voteAction";
import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";
import { updatePollAction } from "@/src/actions/updatePollAction";
import PollForm from "@/src/components/poll/poll-form";
import { Poll } from "@/src/generated/prisma";


export default async function Page({
    params,
    searchParams,
}: {
    params: Promise<{ pollId: string }>,
    searchParams: { edit?: string }
}) {
    const { edit } = await searchParams
    const { pollId } = await params

    const isEdit = edit !== undefined

    const currentPoll = await prisma.poll.findUnique({
        where: { id: pollId },
        include: {
            responses: true,
        },
    });

    const session = await auth.api.getSession({
        headers: await headers()
    })

    const prevResponses = currentPoll?.responses.find((resp) => resp.userId === session?.user.id)

    if (isEdit) {
        return (
            <PollForm
                action={updatePollAction}
                title={"Edit Poll"}
                poll={currentPoll as Poll} />
        )
    }
    return (
        <Card className="p-4">
            <CardTitle>{currentPoll?.question}</CardTitle>
            <CardContent >
                <form action={voteAction} className="flex flex-col gap-4">
                    <input type="hidden" name="pollId" value={pollId} />
                    {JSON.parse(currentPoll?.options || "[]").map((option: string) => (
                        <div key={option} className="flex flex-row gap-2 items-center">
                            <input type="radio" name="vote" value={option} defaultChecked={option == prevResponses?.answer} />
                            <label htmlFor={option}>{option}</label>
                        </div>
                    ))}
                    <Button type="submit">Voter</Button>
                </form>
            </CardContent>
        </Card>
    );
}