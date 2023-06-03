import { useAuth0 } from "@auth0/auth0-react"
import Image from "next/image";
import cat from "../../public/icons/cat.svg"
import Loading from "./Loading";
import { useEffect } from "react";

const Protected = ({ children }) => {
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  useEffect(() => {
    console.log("loading: ", isLoading);
    console.log("is auth?: ", isAuthenticated);
    console.log(user)
  }, [user])

  if (isAuthenticated || isLoading) return children;
  else {
    return (
      <div className="w-full h-full justify-center items-center flex flex-col gap-4">
        <Image src={cat} className="w-24 h-24" />
        <p>Oops! It seems like you're not signed in!</p>
        <button className="text-xl p-4 bg-green-700 rounded" onClick={loginWithRedirect}>Sign In</button>
      </div>
    )
  }
}

export default Protected