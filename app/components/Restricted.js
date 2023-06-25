"use client"
import { useAuth0 } from "@auth0/auth0-react"
import Image from "next/image";
import cat from "../../public/icons/cat.svg"

const Restricted = ({ className }) => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className={"w-full h-full justify-center items-center flex flex-col gap-4 " + className}>
      <Image src={cat} className="w-24 h-24" />
      <p>Oops! It seems like you're not signed in!</p>
      <button className="text-xl p-4 bg-green-700 rounded" onClick={loginWithRedirect}>Sign In</button>
    </div>
  )
}

export default Restricted