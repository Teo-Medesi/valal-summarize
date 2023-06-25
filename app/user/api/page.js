"use client"
import Loading from "@/app/components/Loading";
import copyToClipboard from "@/app/utils/copyToClipboard";
import { useAuth0 } from "@auth0/auth0-react";
import { useAnimate, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function API() {
  const { user } = useAuth0();
  const [metadata, setMetadata] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (user) getUserMetadata();
  }, [user])

  const handleCopyToClipboard = async (text) => {
    await copyToClipboard(text);

    await animate(".banner", { opacity: 1 }, { duration: 0.5 });
    await animate(".banner", { opacity: 0 }, { delay: 1, duration: 2 })
  }

  const getUserMetadata = async () => {
    const response = await fetch(`/api/public/users/${user.sub}/metadata`)
    const metadata = await response.json();

    setMetadata(metadata.app_metadata);
    setIsLoading(false);
  }

  if (!isLoading) return (
    <article ref={scope} className="flex flex-col gap-8 basis-1/2 py-5">
      <h1>API</h1>

      <div className="w-full flex flex-col gap-4 items-center">
        <div className="w-screen h-screen  pointer-events-none fixed left-0 bottom-0 pb-8 flex justify-center items-end">
          <motion.p initial={{ opacity: 0 }} className="banner bg-green-700 w-1/2 text-center py-2 rounded">Copied to clipboard!</motion.p>
        </div>

        <div className="w-full gap-8 flex flex-col">
          <div className="flex items-center">
            <p className="text-xl basis-1/3 ">API key: </p>
            <span onClick={() => handleCopyToClipboard(metadata.auth.API_key)} className="p-4 outline-none cursor-pointer rounded bg-black3 w-full">{metadata.auth.API_key}</span>
          </div>

          <div className="flex items-center">
            <p className="text-xl basis-1/3 ">User ID: </p>
            <span onClick={() => handleCopyToClipboard(user.sub)} className="p-4 outline-none cursor-pointer rounded bg-black3 w-full">{user.sub}</span>
          </div>

          <div className="flex items-center">
            <label htmlFor="username" className="text-xl  basis-1/3">Referrer Domain: </label>
            <input placeholder="https://example.com" type="text" className="p-4 outline-none rounded bg-black3 w-full" />
          </div>

          <div className="flex items-center">
            <label htmlFor="username" className="text-xl  basis-1/3">Description </label>
            <textarea placeholder="What are you going to use this API for?" type="text" className="p-4 h-32 outline-none rounded bg-black3 w-full" />
          </div>

        </div>
      </div>

      <div className="mt-8 hidden">
        <h1>Documentation</h1>

      </div>
    </article>
  )
  else return <Loading />
}