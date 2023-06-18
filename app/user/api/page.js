
export default function API() {

  // let's plan out our API again

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

  return (
    <article className="w-full flex flex-col gap-4">
      <h1>API</h1>

      <div className="w-full flex flex-col gap-4 items-center">
        <p>You have no active API keys</p>
        <button className="text-xl p-4 px-8 bg-green-700 w-max rounded">Create New API Key</button>
      </div>

      <div className="mt-8">
        <h1>Documentation</h1>



      </div>
    </article>
  )
}