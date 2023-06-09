"use client"
import { useAuth0 } from "@auth0/auth0-react"
import Restricted from "../components/Restricted";
import Link from "next/link";

export default function UserLayout({ children }) {
  const { user, isAuthenticated, logout } = useAuth0();

  if (!user || !isAuthenticated) return <Restricted />
  return (
    <section className="flex py-10 px-4">
      <nav className="flex basis-1/4">
        <ul className="w-full flex flex-col gap-4 items-center">
          <li className="text-xl p-4 px-8 border border-black3 hover:border-green-700 cursor-pointer text-center w-1/2 rounded"><Link href={"/user"}>Settings</Link></li>
          <li className="text-xl p-4 px-8 border border-black3 hover:border-green-700 cursor-pointer text-center w-1/2 rounded"><Link href={"/user/api"}>API</Link></li>
          <li className="text-xl p-4 px-8 border border-black3 hover:border-green-700 cursor-pointer text-center w-1/2 rounded"><Link href={"/user/subscription"}>Subscription</Link></li>
        </ul>
      </nav>
      <div className="basis-1/2">{children}</div>
      <div className="basis-1/4"></div>
    </section>
  )
}