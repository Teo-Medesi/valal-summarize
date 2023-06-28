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
            <p className="text-xl basis-1/3 ">API Key: </p>
            <span onClick={() => handleCopyToClipboard(metadata.auth.API_key)} className="p-4 outline-none cursor-pointer rounded bg-black3 w-full">{metadata.auth.API_key}</span>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <p className="text-xl basis-1/3 ">User ID: </p>
              <span onClick={() => handleCopyToClipboard(user.sub)} className="p-4 outline-none cursor-pointer rounded bg-black3 w-full">{user.sub}</span>
            </div>
            <p className="text-gray-400">See <span className="font-bold italic">Documentation</span> for more information</p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <p className="text-xl basis-1/3 ">Rate Limit: </p>
              <span className="p-4 outline-none rounded bg-black3 w-full">{metadata.rate_limit || 100}</span>
            </div>
            <p className="text-gray-400">The amount of requests that you can make this month. This website is just for my portfolio so the limit is 100.</p>
          </div>


          <div className="flex items-center">
            <p className="text-xl basis-1/3 ">Remaining: </p>
            <span className="p-4 outline-none rounded bg-black3 w-full">{(metadata.rate_limit - metadata.requests_made) || 100}</span>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <label htmlFor="username" className="text-xl  basis-1/3">Referrer Domain: </label>
              <input placeholder="https://example.com" type="text" className="p-4 outline-none rounded bg-black3 w-full" />
            </div>
            <p className="text-gray-400">The domain from which you are planning on using this API.</p>
          </div>

          <div className="flex items-center">
            <label htmlFor="username" className="text-xl  basis-1/3">Description </label>
            <textarea placeholder="What are you going to use this API for?" type="text" className="p-4 h-32 outline-none rounded bg-black3 w-full" />
          </div>
        </div>
      </div>

      <div className="mt-8 flex h-screen flex-col gap-4">
        <h1>Documentation</h1>
        <div>
          <h3 className="text-green-700">Introduction</h3>
          <p>This API is useful for extracting meaningful information from or getting a description of one or more websites. Alongside summarization and extraction, users can also get screenshots of websites</p>
        </div>
        <div>
          <h3 className="text-green-700">Authorization</h3>
          <p>
            In order to make requests, an <span className="text-green-700 font-bold">Authorization</span> header is required in each request.
            The value of the header must be an <span className="text-green-700 font-bold">object in JSON format</span> that contains the values <span className="text-green-700 font-bold">"API_key"</span> and <span className="text-green-700 font-bold">"user_id"</span>
            The required values can be found at the top of this page or in the example below.
          </p>

          <div className="mt-8 p-2 white whitespace-pre-line text-orange-200 rounded bg-black3"><span className="text-green-700">Authorization</span>: {'{'} {"\n"} '<span className="text-green-700">API_key</span>': '{metadata.auth.API_key}', {"\n"} '<span className="text-green-700">user_id</span>': '{user.sub}' {"\n"} {'}'}</div>
        </div>
        <div>
          <h3 className=" mt-8">Available Endpoints</h3>
          <div>
            <p className="p-4 bg-black2 text-xl rounded mt-8"> <span className="text-orange-400 mr-4">POST</span> /api/private/extract</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti officiis provident quia, ipsa at nostrum eveniet, hic maiores quis dolores neque aliquid perferendis deserunt!</p>
          </div>
        </div>


      </div>
    </article>
  )
  else return <Loading />
}
