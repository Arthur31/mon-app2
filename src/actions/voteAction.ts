import { prisma } from "@/src/lib/prisma";
import { redirect, RedirectType } from "next/navigation";

export async function voteAction(formData: FormData) {
    'use server';

    const vote = formData.get('vote')?.toString();
    const pollId = formData.get('pollId')?.toString();
    console.log('Côté serveur:', vote, pollId);

    if (!pollId) {
        console.warn('No pollId provided to voteAction');
        return;
    }

    if (vote != null) {
        const create = await prisma.response.create({
            data: {
                user: "user1",
                answer: vote,
                pollId: pollId
            }
        });
        console.log(create);
    }

    redirect(`/results/${pollId}`, RedirectType.push);
}
