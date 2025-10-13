"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@src/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@src/components/ui/form"
import { Input } from "@src/components/ui/input"
import { authClient, signIn } from "@src/lib/auth-client"
import { useRouter } from "next/navigation"
import { Github } from "lucide-react"
import { toast } from "sonner"
import { SubmitButton } from "@/src/components/submitButton"
import { useEffect } from "react"


const SignInFormSchema = z.object({
  email: z.email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
})

type SocialProvider = keyof typeof signIn.social;

export function SignInForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const router = useRouter();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignInFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    await signIn.email({
      email: values.email,
      password: values.password,
    }, {
      onSuccess: () => {
        router.push("/auth");
        router.refresh();
      },
      onError: (e) => {
        toast(e.error.message)
      }
    })
  }

  async function signInWithProvider(provider: string) {
    signIn.social({
      provider: provider,
      callbackURL: "/auth",
    }, {
      onError: (e) => {
        toast(e.error.message)
      }
    })
  }

  function handlePasskey() {
    authClient.signIn.passkey({ autoFill: false })
      .then((data) => {
        console.log(data);
        if (data?.error) {
          toast(data?.error.message)
          console.log(data?.error);
        } else {
          router.push("/");
          router.refresh()
        }
      })
  }

  // useEffect(() => {
  //   if (!PublicKeyCredential.isConditionalMediationAvailable ||
  //     !PublicKeyCredential.isConditionalMediationAvailable()) {
  //     return;
  //   }
  //   handlePasskey()
  // }, [])

  return (
    <div className="flex flex-col items-center gap-8">
      <Form {...form}>
        <div className="flex flex-col gap-0 w-full">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6 w-full">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="email" {...field} autoComplete="email webauthn" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="password" {...field} autoComplete="current-password webauthn" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SubmitButton label="LogIn" />
          </form>
          <Button variant={"link"} onClick={handlePasskey}>Sign In with Passkey</Button>
        </div>
        <p className="text-sm text-muted-foreground">OR</p>
        <div className="flex w-full gap-4">
          <Button
            onClick={() => signInWithProvider("github")}
            className="flex-1" variant="outline">
            <Github className="mr-2" />
            Sign in with Github
          </Button>
        </div>
      </Form>
    </div>
  )
}