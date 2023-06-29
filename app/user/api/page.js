"use client"
import Loading from "@/app/components/Loading";
import copyToClipboard from "@/app/utils/copyToClipboard";
import Prism from 'prismjs'
import { useAuth0 } from "@auth0/auth0-react";
import { useAnimate, motion } from "framer-motion";
import { useEffect, useState } from "react";
import 'prismjs/themes/prism-coldark-dark.css'
import 'prismjs/components/prism-javascript'

export default function API() {
  const { user } = useAuth0();
  const [metadata, setMetadata] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (user) getUserMetadata();
  }, [user])

  useEffect(() => {
    Prism.highlightAll();
  }, [])
  

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
      <h1 className="text-green-700">API</h1>

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

      <div className=" flex h-[300vh] flex-col gap-4">
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

          <div className="mt-8">
            <pre>
              <code className="language-javascript">
                {`
Authorization: JSON.stringify({
  API_key: process.env.API_KEY,
  user_id: process.env.USER_ID
  })
                `}
              </code>
            </pre>
          </div>
        </div>

        <div>
          <h2 className="">Available Endpoints</h2>
         <section>
           <div className="mt-8">
             <p className="p-4 bg-black2 text-xl rounded "> <span className="text-orange-400 mr-4">POST</span> /api/private/extract</p>
             <p className="mt-4">Used for extracting meaningful text (paragraphs and headers) from websites.</p>
             <p>Requires <span className="text-green-700 font-bold">url</span> in the request body.</p>
           </div>
           
           <h3>Example request</h3>
           <div className="mt-8">
             <pre> 
               <code className="language-javascript">
                 {`
const response = await fetch("http://localhost:3000/api/private/extract", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": JSON.stringify({
      API_key: process.env.API_KEY,
      user_id: process.env.USER_ID
    })
  },
  body: JSON.stringify({url: "http://example.com"})
});

const data = await response.json();
                 `}
               </code>
             </pre>
           </div>
         </section>
         <section>
           <div className="mt-8">
             <p className="p-4 bg-black2 text-xl rounded "> <span className="text-orange-400 mr-4">POST</span> /api/private/extract/summarize</p>
             <p className="mt-4">Describe and summarize the content of a web page.</p>
             <p>Requires <span className="text-green-700 font-bold">url</span> in the request body.</p>
           </div>
           
           <h3>Example request</h3>
           <div className="mt-8">
             <pre> 
               <code className="language-javascript">
                 {`
const response = await fetch("http://localhost:3000/api/private/extract/summarize", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": JSON.stringify({
      API_key: process.env.API_KEY,
      user_id: process.env.USER_ID
    })
  },
  body: JSON.stringify({url: "http://example.com"})
});

const data = await response.json();
                 `}
               </code>
             </pre>
           </div>
         </section>
         <section>
           <div className="mt-8">
             <p className="p-4 bg-black2 text-xl rounded "> <span className="text-green-700 mr-4">GET</span> /api/private/screenshot?url</p>
             <p className="mt-4">Get a 16:9 screenshot of a webpage</p>
             <p>Requires <span className="text-green-700 font-bold">url</span> as a query parameter.</p>
           </div>
           
           <h3>Example request</h3>
           <div className="mt-8">
             <pre> 
               <code className="language-javascript">
                 {`
const response = await fetch("http://localhost:3000/api/private/screenshot?url=http://example.com", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Authorization": JSON.stringify({
      API_key: process.env.API_KEY,
      user_id: process.env.USER_ID
    })
});

const data = await response.json();
                 `}
               </code>
             </pre>
           </div>
         </section>


        </div>

        <div>
          <h2 className="text-green-700">Rate Limiting</h2>
          <p className="whitespace-pre-line">
            This website is created primarily for my portfolio and therefore for now I have set a rate limit of 100 for the 
            <span className="text-green-700"> /summarize</span> and <span className="text-green-700">/screenshot</span> endpoint.

            {'\n\n'}If you wish to use this service seriously, feel free to contact me for additional information.

            {'\n\n'}With each request you will receive a <span className="text-green-700">X-RateLimit-Limit</span> and a <span className="text-green-700">X_RateLimit-Remaining</span> header
            so that you can keep track of the amount of requests you can make.
          </p>
        </div>
      </div>
    </article>
  )
  else return <Loading />
}
