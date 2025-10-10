'use client';

import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';
export function SubmitButton(props: { label?: string, pendingLabel?: string }) {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>{pending ?
            props.pendingLabel ?? 'Envoi...' :
            props.label ?? 'Vote'
        }</Button>
    );
}