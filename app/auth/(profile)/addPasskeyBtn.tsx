"use client"

import { deletePollAction } from "@/src/actions/deletePollAction";
import { DeleteBtn } from "@/src/components/DeleteBtn";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/src/components/ui/alert-dialog";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { authClient } from "@/src/lib/auth-client";
import { Passkey } from "better-auth/plugins/passkey";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";


type DeletePasskeyBtnProps = {
    pass: Passkey
}
export function DeletePasskeyBtn(
    props: DeletePasskeyBtnProps
) {
    const router = useRouter();

    async function deletePasskeyHandler(id: string) {
        await authClient.passkey.deletePasskey({
            id: id, // required
        });
        router.refresh()
    }
    return <DeleteBtn
        warningLabel="This will permanently delete this Passkey."
        deleteAction={async () => await deletePasskeyHandler(props.pass.id)} />
}



export function AddPasskeyBtn() {

    const router = useRouter();

    // TODO: ask "cross-platform" / mobile    or    "platform"
    const [name, setName] = useState<string>("example-passkey-name_next");

    async function addPasskeyHandler() {
        await authClient.passkey.addPasskey({
            name: name ?? "example-passkey-name_next",
            authenticatorAttachment: "cross-platform",
        })
            .then((data) => {
                console.log(data);
                if (data?.error) {
                    toast(data?.error.message)
                    console.log(data?.error);
                } else {
                    router.refresh();
                }
            })

    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    size={"icon"}
                    variant="ghost">
                    <Plus size={5} />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Select a name for this key</AlertDialogTitle>
                    <AlertDialogDescription>
                        <Input
                            type="text"
                            value={name}
                            placeholder="example-passkey-name_next"
                            onChange={e => setName(e.target.value)}
                        />
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={addPasskeyHandler}
                        className="bg-primary text-white">
                        Register
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}