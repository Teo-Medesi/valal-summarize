"use client"
import Loading from "@/app/components/Loading";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
/* 

everything will be done with POST

        POST https://valal-summarize.vercel.app/api/extract 

      extract will just crawl the website for headers and paragraphs

        POST https://valal-summarize.vercel.app/api/summarize
        
        url,
        options: {
          language, 
          length, 
          temperature, 
          custom, 
        }


      returns a summary of a website, should be able to summarize more than 1 website at a time
        
        POST https://valal-summarize.vercel.app/api/screenshot
        
        url, 
        
        only accesible to the back-end, not to the user
        
      all of these routes should be protectedw with API keys, that is only if they are made from a foreign origin
      
      all 3 API routes both need to prevalidate to check if the url is valid and if the user has permission to make the request
        ----> we need to make middleware that aggregates the request down the pipeline if it is valid, reducing redundencies in our code
        
      if the request is made from our an allowed domain (our own, for now that would be https://localhost:3000) then it will be authorized
      if it comes from a foreign domain without a valid API key, the request will be denied  --- HTTP 401 Unauthorized
      
      the API key will either be included in the request headers or in the request body
      
      */

export default function API() {
  const { user } = useAuth0();
  const [isKeyGenerated, setIsKeyGenerated] = useState(false);
  const [tempKeyPreview, setTempKeyPreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const createNewKey = async event => {
    event.preventDefault()
    setIsLoading(true);

    const response = await fetch("/api/user/metadata/create-new-key", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user })
    })

    const data = await response.json();
    if (response.ok) {
      console.log(data)
      setIsKeyGenerated(true);
      setTempKeyPreview(data.key);
    }
    else {
      setError(response.error);
    }


  }

  return (
    <article className="flex flex-col gap-8 basis-1/2 py-5">
      <h1>API</h1>

      <div className="w-full flex flex-col gap-4 items-center">
        {
          isKeyGenerated
            ?
            (
              <div className="w-full gap-8 flex flex-col">
                <div className="flex items-center">
                  <p className="text-xl basis-1/3 ">API key: </p>
                  <span className="p-4 outline-none rounded bg-black3 w-full">{tempKeyPreview}</span>
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
            )
            :
            isLoading
              ?
              (
                <Loading classname="mt-20" />
              )
              :
              (
                <div className="flex flex-col mt-20 gap-4 text-center">
                  <p>You have no active API keys</p>
                  <button onClick={createNewKey} className="text-xl p-4 px-8 bg-green-700 w-max rounded">Create New API Key</button>
                </div>
              )
        }
      </div>

      <div className="mt-8 hidden">
        <h1>Documentation</h1>

      </div>
    </article>
  )
}