import { createPollAction } from "@src/actions/createPollAction";
import PollForm from "@/src/components/poll/poll-form";

export default async function Page() {
    return (
        <PollForm
            action={createPollAction}
            title={"Create Poll"} />
    )
}