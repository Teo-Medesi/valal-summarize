import logo from "../../../public/logo/logo-dark.svg";
import Image from "next/image";
import { useAuth0 } from "@auth0/auth0-react";
import Link from "next/link";

const DesktopNavbar = ({className}) => {
  const { loginWithRedirect, user, isAuthenticated } = useAuth0();

  return (
    <nav className={"hidden border-b border-b-black3 md:flex text-xl bg-black px-16 items-center min-w-screen justify-between " + className}>
      <div className="flex gap-8 items-center">
        <Image src={logo} alt="Valal logo" className="h-24 w-24" />
        <ul className="flex gap-8">
          <li className="hover:text-green-500 underline-after hover:after:w-full">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-green-500 underline-after hover:after:w-full">
            <Link href="https://teo-medesi.vercel.app">Portfolio</Link>
          </li>
          <li className="hover:text-green-500 underline-after hover:after:w-full">
            <Link href="/user/api">API</Link>
          </li>
        </ul>
      </div>
      <div className="flex gap-4">
        {isAuthenticated ?
          (
            <Link href={"/user"} className="flex gap-4 items-center">
              <img src={user.picture} className="w-14 cursor-pointer h-14 rounded-full" alt="user profile picture" />
            </Link>
          )
          :
          (
            <div className="flex gap-4">
              <button className="border-gray-400 text-gray-400 hover:border-white hover:text-white border rounded p-4">
                Feedback
              </button>
              <button onClick={loginWithRedirect} className="rounded hover:rounded-xl p-4 uppercase bg-green-700">
                Sign Up
              </button>
            </div>
          )
        }

      </div>
    </nav>
  )
}

export default DesktopNavbar;