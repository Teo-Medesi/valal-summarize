
export default function API() {


  // connect project with supabase, make new user table for API

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