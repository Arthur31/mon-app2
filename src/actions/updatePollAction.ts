import { prisma } from "@src/lib/prisma";
import { redirect, RedirectType } from "next/navigation";
import { auth } from "@src/lib/auth";
import { headers } from "next/headers";

export async function updatePollAction(formData: FormData) {
    'use server';

    console.log('Côté serveur:', formData);

    const pollId = formData.get('pollId')?.toString();

    if (!pollId) {
        console.warn('No pollId provided to voteAction');
        return;
    }

    const question = formData.get('question')?.toString();

    const options = JSON.parse(formData.get("options")?.toString() || "[]");

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        throw new Error("Not authenticated");
    }

    if (question && options.length >= 2) {

        const newPoll = await prisma.poll.update({
            where: { id: pollId },
            data: {
                question: question,
                options: JSON.stringify(options),
                userId: session.user.id
            }
        });
        console.log('New poll created:', newPoll);
        redirect(`/poll/${newPoll.id}`, RedirectType.push);
    }
}
