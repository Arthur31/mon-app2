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
        const create = await prisma.response.create({
            data: {
                user: session.user.name,
                answer: vote,
                pollId: pollId
            }
        });
        console.log(create);
    }

    redirect(`/results/${pollId}`, RedirectType.push);
}
