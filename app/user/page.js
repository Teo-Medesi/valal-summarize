"use client"
import { useAuth0 } from "@auth0/auth0-react";

export default function Settings() {
  const { user, logout } = useAuth0();

  return (
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
  )
}