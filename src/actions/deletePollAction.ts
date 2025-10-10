'use server'

import { prisma } from "@src/lib/prisma";
import { redirect, RedirectType } from "next/navigation";
import { auth } from "@src/lib/auth";
import { headers } from "next/headers";

export async function deletePollAction(deleteId: string) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        throw new Error("Not authenticated");
    }

    await prisma.poll.delete({
        where: { id: deleteId }
    })

    redirect(`/poll/`, RedirectType.replace);
}
