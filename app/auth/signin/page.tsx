import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import { SignInForm } from "./signin-form";
import Link from "next/link";

export default function SignUpPage() {
    return <Card>
        <CardHeader>
            <CardTitle>Sign In</CardTitle>
        </CardHeader>
        <CardContent>
            <SignInForm />
        </CardContent>
        <CardFooter>
            <p className="text-sm text-muted-foreground">
                Don't have an account?
                <Link href="/auth/signup" className="text-primary hover:underline"> Sign up</Link></p>
        </CardFooter>
    </Card>
} 