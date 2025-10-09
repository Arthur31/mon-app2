'use client'
import Link from 'next/link';
import { useParams } from 'next/navigation'
import { Button } from './ui/button';
import { authClient } from '../lib/auth-client';

export function VoteButton() {
  const params = useParams()
  const sessionId = params.sessionId

  const { data } = authClient.useSession()
  if (data?.user == null) {
    return null
  }

  if (sessionId) {
    return (
      <Link href={`/vote/${sessionId}`} className="flex-none bg-red-50" >
        <Button>Voter</Button>
      </Link>
    )
  } else {
    return null
  }
}