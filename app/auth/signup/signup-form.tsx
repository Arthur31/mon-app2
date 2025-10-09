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
import { signUp } from "@src/lib/auth-client"
import { useRouter } from "next/navigation"


const SignUpFormSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
})
 
export function SignUpForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const router = useRouter();
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignUpFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    await signUp.email({
        email: values.email,
        name: values.name,
        password: values.password,
    }, {
        onSuccess: () => {
            router.push("/auth");
            router.refresh();
        },
        onError: () => {
            console.log("Error signing up");
            
        }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="" type="email" {...field} />
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
                <Input placeholder="" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Submit</Button>
      </form>
    </Form>
  ) 
}