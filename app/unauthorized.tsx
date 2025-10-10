import { Card, CardTitle } from "@/src/components/ui/card";

export default function UnauthorizedPage() {
    return (
        <div className="flex flex-col gap-4 p-4 max-w-md mx-auto min-h-full border-2 border-x">
            <Card>
                <CardTitle className="px-4 text-center">You are not logged in. <br /> Please log in to vote</CardTitle>
            </Card>
        </div>
    );
}