import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";
import {  unauthorized } from "next/navigation";

export default async function ProtectedLayout(
  props: { children: React.ReactNode }
) {

  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (!session) {
    unauthorized()
  }

  return props.children

}