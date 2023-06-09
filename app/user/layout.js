"use client"
import { useAuth0 } from "@auth0/auth0-react"
import Restricted from "../components/Restricted";
import Link from "next/link";
import Loading from "../components/Loading";

export default function UserLayout({ children }) {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <Loading />
  if (!user || !isAuthenticated) return <Restricted />
  return (
    <section className="flex h-full w-full justify-center">
      <div className="basis-full px-4 md:basis-1/2">{children}</div>
    </section>
  )
}