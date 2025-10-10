import { prisma } from "@src/lib/prisma";
import { redirect, RedirectType } from "next/navigation";
import { auth } from "@src/lib/auth";
import { headers } from "next/headers";

export async function voteAction(formData: FormData) {
    'use server';

    const vote = formData.get('vote')?.toString();
    const pollId = formData.get('pollId')?.toString();
    console.log('Côté serveur:', vote, pollId);

    if (!pollId) {
        console.warn('No pollId provided to voteAction');
        return;
    }

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        throw new Error("Not authenticated");
    }

    if (vote != null) {
        const previousVote = await prisma.response.findFirst({
            where: {
                userId: session.user.id,
                pollId: pollId
            }
        });
        if (previousVote) {
            await prisma.response.update({
                where: { id: previousVote.id },
                data: { answer: vote }
            });
        } else {
            await prisma.response.create({
                data: {
                    userId: session.user.id,
                    answer: vote,
                    pollId: pollId
                }
            });
        }
    }

    redirect(`/results/${pollId}`, RedirectType.push);
}
