import { Card, CardTitle } from "@/src/components/ui/card";

export default function UnauthorizedPage() {
    return (
        <Card>
            <CardTitle className="px-4 text-center">
                You are not logged in. <br />
                Please log in to view your profile.</CardTitle>
        </Card>
    );
}