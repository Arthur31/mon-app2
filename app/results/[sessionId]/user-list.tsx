import { Card, CardTitle, CardContent } from "@/components/ui/card";

export default async function UserList() {
    const users = await fetch("https://jsonplaceholder.typicode.com/users")
        .then(res => res.json());
    return (
        <Card className="p-4">
            <CardTitle>Users :</CardTitle>
            <CardContent className="flex-1 pb-0">
                <ul>
                    {users.map((user: any) => (
                        <li key={user.id}>{user.name}</li>
                    ))
                    }
                </ul>
            </CardContent>
        </Card>
    );
}