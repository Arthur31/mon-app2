import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import { SignUpForm } from "./signup-form";
import Link from "next/link";

export default function SignUpPage() {
    return <Card>
        <CardHeader>
            <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
            <SignUpForm />
        </CardContent>
        <CardFooter>
            <p className="text-sm text-muted-foreground">
                Already have an account? 
                <Link href="/auth/signin" className="text-primary hover:underline"> Sign in</Link></p>
        </CardFooter>
    </Card>
}