"use client"
import { useAuth0 } from "@auth0/auth0-react";

export default function Settings() {
  const { user, logout } = useAuth0();

  return (
    <article className="flex flex-col gap-8 md:py-5">
      <h1 className="hidden md:block">Account Info</h1>

      <div className="flex flex-col md:flex-row items-center gap-2">
        <label htmlFor="username" className="text-xl basis-1/3 hidden md:block">Profile Picture: </label>
        <div className="w-full flex justify-center md:justify-normal"><img src={user.picture} className="w-24 h-24 rounded-full" alt="profile picture" /></div>
      </div>


      <div className="flex flex-col md:flex-row md:items-center">
        <label htmlFor="username" className="text-xl basis-1/3 ">username: </label>
        <input type="text" className="p-4 rounded bg-black3 w-full" defaultValue={user.name} />
      </div>

      <div className="flex flex-col md:flex-row md:items-center">
        <label htmlFor="username" className="text-xl  basis-1/3">email: </label>
        <input type="text" className="p-4 rounded bg-black3 w-full" defaultValue={user.email}/>
      </div>

      <div className="flex flex-col md:flex-row md:items-center">
        <label htmlFor="username" className="text-xl  basis-1/3">password: </label>
        <input type="text" className="p-4 rounded bg-black3 w-full" />
      </div>


      <div className="w-full mt-8 flex justify-center"><button className="text-xl p-4 px-8 bg-red-600 w-max rounded" onClick={logout}>Sign Out</button></div>

    </article>
  )
}