"use client"
import { SubmitButton } from "@/src/components/submitButton";
import { Card, CardTitle, CardContent } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import PollOptionsInput from "./poll-options-input";
import { Poll } from "@/src/generated/prisma";
import { Link, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { DeleteBtn } from "../DeleteBtn";
import { deletePollAction } from "@/src/actions/deletePollAction";

type PollFormProps = {
    action: ((formData: FormData) => void | Promise<void>)
    title: string,
    poll?: Poll
}
export default function PollForm(
    props: PollFormProps
) {
    return (
        <Card className="p-4">
            <CardTitle className="flex items-center w-full">
                <p>{props.title}</p>
                <div className="flex-1"></div>
                {props.poll && <DeleteBtn warningLabel="This will permanently delete this poll." deleteAction={async () => await deletePollAction(props.poll!.id)}/>}
            </CardTitle>
            <CardContent >
                <form action={props.action} className="flex flex-col gap-4">
                    <input type="hidden" name="pollId" value={props.poll?.id} />
                    <Input type="text" placeholder="Question" name="question" defaultValue={props.poll?.question} />
                    <PollOptionsInput pollOptions={props.poll?.options} />
                    <SubmitButton label="Enregistrer" />
                </form>
            </CardContent>
        </Card>
    )
}