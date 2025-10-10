import { Card, CardTitle, CardContent } from "@src/components/ui/card";

export default async function UserList(params: { userList: string[] }) {
    if (process.env.DELAY === "true") {
        await new Promise((resolve) => setTimeout(resolve, 2000));
    }
    if (!params.userList || params.userList.length === 0) {
        return null
    }
    return (
        <Card className="p-4">
            <CardTitle>Users :</CardTitle>
            <CardContent className="flex-1 pb-0">
                <ul>
                    {params.userList.map((user: any) => (
                        <li key={user}>{user}</li>
                    ))
                    }
                </ul>
            </CardContent>
        </Card>
    );
}