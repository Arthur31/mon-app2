import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { getUser } from "@src/lib/auth-server";
import { Check } from "lucide-react";
import { unauthorized } from "next/navigation";

export default async function AuthPage() {
    const user = await getUser();

    if (!user) {
        return unauthorized();
    }
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
                </div>
            </CardContent>
        </Card>
    )
}