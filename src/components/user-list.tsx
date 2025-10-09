import { Card, CardTitle, CardContent } from "@src/components/ui/card";

export default async function UserList(params: { userList: string[] }) {
    // const users = await fetch("https://jsonplaceholder.typicode.com/users")
    //     .then(res => res.json());
    await new Promise((resolve) => setTimeout(resolve, 3000));

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