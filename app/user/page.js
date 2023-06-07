"use client"
import { useAuth0 } from "@auth0/auth0-react"
import Restricted from "../components/Restricted";
import Link from "next/link";

export default function User() {
  const { user, isAuthenticated, logout } = useAuth0();

  if (!user || !isAuthenticated) return <Restricted />
  return (
    <div className="flex py-10 px-4">
      <nav className="flex basis-1/4">
        <ul className="w-full flex flex-col gap-4 items-center">
          <li className="text-xl p-4 px-8 border border-black3 hover:border-green-700 cursor-pointer text-center w-1/2 rounded"><Link href={"/user"}>Settings</Link></li>
          <li className="text-xl p-4 px-8 border border-black3 hover:border-green-700 cursor-pointer text-center w-1/2 rounded"><Link href={"/user/api"}>API</Link></li>
          <li className="text-xl p-4 px-8 border border-black3 hover:border-green-700 cursor-pointer text-center w-1/2 rounded"><Link href={"/user/subscription"}>Subscription</Link></li>
        </ul>
      </nav>
      <article className="flex flex-col gap-8 basis-1/2 py-5">
        <h1>Account Settings</h1>

        <div className="flex items-center">
          <label htmlFor="username" className="text-xl basis-1/3 ">Profile Picture: </label>
          <div className="w-full"><img src={user.picture} className="w-24 h-24 rounded-full" alt="profile picture" /></div>
        </div>


        <div className="flex items-center">
          <label htmlFor="username" className="text-xl basis-1/3 ">username: </label>
          <input type="text" className="p-4 rounded bg-black3 w-full" defaultValue={user.name} />
        </div>

        <div className="flex items-center">
          <label htmlFor="username" className="text-xl  basis-1/3">email: </label>
          <input type="text" className="p-4 rounded bg-black3 w-full" />
        </div>

        <div className="flex items-center">
          <label htmlFor="username" className="text-xl  basis-1/3">password: </label>
          <input type="text" className="p-4 rounded bg-black3 w-full" />
        </div>

        <div className="flex items-center">
          <label htmlFor="username" className="text-xl  basis-1/3">theme: </label>
          <select className="p-4 rounded bg-black3 w-full" defaultValue={"dark mode"} >
            <option value="dark mode">dark mode</option>
            <option value="light mode mode">light mode</option>
          </select>
        </div>


        <div className="w-full mt-8 flex justify-center"><button className="text-xl p-4 px-8 bg-red-600 w-max rounded" onClick={logout}>Sign Out</button></div>

      </article>
      <div className="basis-1/4"></div>
    </div>
  )
}