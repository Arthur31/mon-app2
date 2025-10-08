import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

async function voteAction(formData: FormData) {
    'use server'; // cette fonction s'exécute côté serveur

    const nom = formData.get('vote');
    console.log('Côté serveur:', nom); // Terminal côté serveur
}

export default function Page() {
    return (
        <form action={voteAction}>
            <RadioGroup defaultValue="option-one">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-one" id="option-one" />
                    <Label htmlFor="option-one">Option One</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-two" id="option-two" />
                    <Label htmlFor="option-two">Option Two</Label>
                </div>
            </RadioGroup>
            <Button type="submit">Voter</Button>
        </form>
    );
}