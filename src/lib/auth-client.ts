import { createAuthClient } from "better-auth/react"
import { adminClient, passkeyClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    plugins: [
        adminClient(),
        passkeyClient()
    ]
})

export const { useSession, signIn, signUp, signOut } = authClient