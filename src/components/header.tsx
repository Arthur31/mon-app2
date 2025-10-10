import { get } from "http";
import Link from "next/link";
import { getUser } from "../lib/auth-server";
import { Button, buttonVariants } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";
import { BadgeCheckIcon, LogOut, Plus, User2, UserCog } from "lucide-react";
import { auth } from "../lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Badge } from "./ui/badge";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "./ui/navigation-menu";


export default function Header() {
    // return (
    //     <header className="flex items-center gap-4 px-4 py-2 border-b max-w-md mx-auto border-x">
    //         <Link href="/" className="text-2xl font-bold">App</Link>
    //         <div className="flex-1"></div>
    //         <Suspense fallback={<Skeleton className="h-10 w-20" />}>
    //             <AuthButton />
    //         </Suspense>
    //     </header>
    // );

    const components: { title: string; href: string; description: string }[] = [
        {
            title: "Result",
            href: "/results/",
            description:
                "View and analyze the results of all polls, including votes and statistics.",
        },
        {
            title: "Poll",
            href: "/poll/",
            description:
                "Create and reply to polls, allowing users to participate and share their opinions."
        },
        {
            title: "Recettes",
            href: "/recettes/",
            description:
                "Why not"
        },
    ]

    return (
        <header className="flex">

            <NavigationMenu viewport={true}>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link href="/">
                            <NavigationMenuTrigger>
                                App
                            </NavigationMenuTrigger>
                        </Link>
                        <NavigationMenuContent>
                            <ul className="grid w-[200px] gap-4">
                                <li>
                                    <NavigationMenuLink asChild>
                                        <Link href="/results">Result</Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link href="/poll">Poll</Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link href="/recettes">Recettes</Link>
                                    </NavigationMenuLink>
                                </li>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <Link href="/poll">Poll</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <div className="flex-1"></div>
            <Suspense fallback={<Skeleton className="h-10 w-20" />}>
                <AuthButton />
            </Suspense>
        </header>
    )
}

function ListItem({
    title,
    children,
    href,
    ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link href={href}>
                    <div className="text-sm leading-none font-medium">{title}</div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
}



export const AuthButton = async () => {
    const user = await getUser();

    if (!user) {
        return <Link href="/auth/signin"
            className={buttonVariants({ size: "sm", variant: "outline" })}>Sign in</Link>;
    }

    console.log(user.role);

    const isAdmin = user.role?.includes("admin")
    const adminClass = isAdmin ? "ring-blue-500 ring-2" : "";

    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant={"outline"} size={"sm"}>
                <div className="relative inline-block">
                    <Avatar className={`size-6 ${adminClass}`}>
                        <AvatarFallback>{user.name?.[0]?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    {/* <BadgeCheckIcon size={2} className="absolute bottom-3 left-4 ring-2"/> */}
                </div>
                <p>{user.name}</p>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem asChild>
                <Link href="/poll/create" className="flex items-center gap-2">
                    <Plus size={16} />
                    Create a poll
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link href="/auth" className="flex items-center gap-2">
                    <User2 className="size-3" />
                    Account
                </Link>
            </DropdownMenuItem>
            {isAdmin && (
                <DropdownMenuItem asChild>
                    <Link href="/admin/users" className="flex items-center gap-2">
                        <UserCog className="size-3" />
                        Users
                    </Link>
                </DropdownMenuItem>
            )}
            <DropdownMenuItem asChild>
                <form>
                    <button
                        className="flex items-center gap-2 w-full"
                        formAction={async () => {
                            "use server"
                            await auth.api.signOut({
                                headers: await headers()
                            })
                            redirect("/auth/signin")
                        }}>
                        <LogOut className="size-4 mr-2" />
                        Logout
                    </button>
                </form>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>;
}