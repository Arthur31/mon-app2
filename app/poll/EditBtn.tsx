"use client"

import { Button } from "@/src/components/ui/button"
import { Pen } from "lucide-react";
import { useRouter } from "next/navigation";

type EditBtnProps = {
    shouldVisible: boolean,
    url: string
}
export default function EditBtn(
    props: EditBtnProps
) {
    const router = useRouter();

    if (!props.shouldVisible) {
        return null
    }

    return (
        <Button
            variant="ghost"
            className="flex-none"
            onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                router.push(props.url)
            }}>
            <Pen size={15} />
        </Button>
    )
}