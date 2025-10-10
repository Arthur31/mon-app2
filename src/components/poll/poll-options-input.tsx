"use client";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Poll } from "@/src/generated/prisma";
import { useState } from "react";

type PollOptionsInputProps = {
    pollOptions?: string
}

export default function PollOptionsInput(
    props: PollOptionsInputProps
) {

    const givenOptions = JSON.parse(props.pollOptions ?? JSON.stringify(["", ""]));

    const [options, setOptions] = useState<string[]>(givenOptions);

    const handleOptionChange = (idx: number, value: string) => {
        const newOptions = [...options];
        newOptions[idx] = value;
        setOptions(newOptions);
    };

    const addOption = () => setOptions([...options, ""]);

    // On form submit, join options as "opt1,opt2,..."
    // So we use a hidden input to send the joined value
    return (
        <div className="flex flex-col gap-2">
            {options.map((opt, idx) => (
                <Input
                    key={idx}
                    type="text"
                    placeholder={`Option ${idx + 1}`}
                    value={opt}
                    onChange={e => handleOptionChange(idx, e.target.value)}
                    required
                />
            ))}
            <Button type="button" onClick={addOption} variant="secondary">
                Add Option
            </Button>
            <input
                type="hidden"
                name="options"
                value={JSON.stringify(options.filter(o => o.trim()))}
            />
        </div>
    );
}