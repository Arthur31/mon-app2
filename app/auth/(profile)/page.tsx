import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { auth } from "@/src/lib/auth";
import { authClient } from "@/src/lib/auth-client";
import { getUser } from "@src/lib/auth-server";
import { Check, Plus } from "lucide-react";
import { headers } from "next/headers";
import { unauthorized } from "next/navigation";
import { AddPasskeyBtn, DeletePasskeyBtn } from "./addPasskeyBtn";
import { DeleteBtn } from "@/src/components/DeleteBtn";

export default async function AuthPage() {
    const user = await getUser();

    if (!user) {
        return unauthorized();
    }

    const passkeys = await auth.api.listPasskeys({
        // This endpoint requires session cookies.
        headers: await headers(),
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>User Profile</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-2">
                    <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Name</span>
                        <span>{user?.name}</span>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-muted-foreground">Email</span>
                            {user.emailVerified ? <Check size={10} /> : null}
                        </div>
                        <span>{user?.email}</span>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex flex-row justify-between items-center w-full">
                            <p>Passkeys</p>
                            <AddPasskeyBtn />
                        </div>
                        {passkeys.length == 0 && (
                            <span className="text-sm text-muted-foreground">No Passkeys</span>
                        )}
                        {passkeys.map(pass => (
                            <div key={pass.id} className="flex flex-row justify-between w-full">

                                <p>{pass.name}</p>
                                <div className="flex-1"></div>
                                <DeletePasskeyBtn
                                    pass={pass} />
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}