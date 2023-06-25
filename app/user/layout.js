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
    <section className="flex h-full w-full py-10 px-4">
      <nav className="flex basis-1/4">
        <ul className="w-full flex flex-col gap-4 items-center">
          <Link className="text-xl p-4 px-8 border border-black3 hover:border-green-700 cursor-pointer text-center w-1/2 rounded" href={"/user"}>Info</Link>
          <Link className="text-xl p-4 px-8 border border-black3 hover:border-green-700 cursor-pointer text-center w-1/2 rounded" href={"/user/api"}>API</Link>
        </ul>
      </nav>
      <div className="basis-1/2">{children}</div>
      <div className="basis-1/4"></div>
    </section>
  )
}