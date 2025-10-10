'use server'

import { Role } from "better-auth/plugins/access";
import { auth } from "../lib/auth";
import { headers } from "next/headers";

enum Roles {
    Admin = "admin",
    user = "user",
}


export async function setRoleAction(userId: string, role: Roles) {
    const data = await auth.api.setRole({
        body: {
            userId: userId,
            role: role, // required
        },
        // This endpoint requires session cookies.
        headers: await headers(),
    });
}
