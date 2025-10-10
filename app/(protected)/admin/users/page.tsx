import { Badge } from "@/src/components/ui/badge";
import { Card, CardTitle } from "@/src/components/ui/card";
import { auth } from "@/src/lib/auth";
import { BadgeCheckIcon } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";

export default async function UserPage() {
    const users = await auth.api.listUsers({
        query: {
            limit: 100,
            sortBy: "name",
            sortDirection: "desc",
        },
        // This endpoint requires session cookies.
        headers: await headers(),
    });

    return (
        <>
            {users.users.map((user) => (
                <Link key={user.id} href={`/admin/users/${user.id}`}>
                    <Card key={user.id} className="p-4">
                        <CardTitle className="flex flex-row">
                            {user.name}
                            <div className="flex-1"></div>
                            {user.role && (
                                <Badge
                                    variant="secondary"
                                    className="bg-green-500 text-white dark:bg-green-600"
                                >
                                    <BadgeCheckIcon />
                                    {user.role}
                                </Badge>
                            )}
                        </CardTitle>
                    </Card>
                </Link>
            ))}
        </>
    );
}