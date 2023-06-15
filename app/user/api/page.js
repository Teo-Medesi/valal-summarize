
export default function API() {


  /* 
  
    connect project with supabase, make new user table for API
    user table, connects with API table
    API table has secret key

    the user table will be filled out with the requests that they make, how many tokens per request they spend
  */

  return (
    <article className="w-full">
      <h1>API</h1>

      <div className="w-full flex flex-col gap-4 mt-8 items-center">
        <p>You have no active API keys</p>
        <button className="text-xl p-4 px-8 bg-green-700 w-max rounded">Create New API Key</button>
      </div>
    </article>
  )
}