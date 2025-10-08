import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { prisma } from "@/src/lib/prisma";
import { redirect, RedirectType } from "next/navigation";


export default async function Page(props: {
    params: { pollId: string }
}) {
    const params = await props.params;
    const pollId = await params.pollId;

    async function voteAction(formData: FormData) {
        'use server'; // cette fonction s'exécute côté serveur

        const currentPoll = await prisma.poll.findUnique({
            where: { id: pollId } // Remplacez par l'ID du sondage actuel
        });

        console.log(currentPoll);

        const vote = formData.get('vote')?.toString();
        console.log('Côté serveur:', vote); // Terminal côté serveur

        if (vote != null) {
            const create = await prisma.response.create({
                data: {
                    user: "user1",
                    answer: vote?.toString(),
                    pollId: pollId
                }
            });
            console.log(create);

            await prisma.response.update({
                where: { id: "## id ##" },
                data: { answer: "new Answer" }
            });
        }
        redirect(`/results/${pollId}`, RedirectType.push)
    }


    return (
        <Card className="p-4">
            <CardTitle>Vote</CardTitle>
            <CardContent >
                <form action={voteAction} className="flex flex-col gap-4">
                    <div className="flex flex-row gap-2 items-center">
                        <input type="radio" name="vote" value="yes" />
                        <label htmlFor="yes">Yes</label>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <input type="radio" name="vote" value="no" defaultChecked />
                        <label htmlFor="no">No</label>
                    </div>
                    <Button type="submit">Voter</Button>
                </form>
            </CardContent>
        </Card>
    );
}