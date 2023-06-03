"use client"
import { useAuth0 } from "@auth0/auth0-react"
import Image from "next/image";
import Protected from "../components/Protected";

export default function User() {
  const { user, logout } = useAuth0();

  if (user) return (
    <Protected>
      <div className="flex py-10 px-4">
        <nav className="flex basis-1/4"></nav>
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
            <input type="text" className="p-4 rounded bg-black3 w-full" defaultValue={user.email} />
          </div>

        </article>
        <div className="basis-1/4"></div>
      </div>
    </Protected>
  )
}