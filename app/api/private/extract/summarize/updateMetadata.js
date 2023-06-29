async function updateMetadata(userID) {
  // we want to send a PATCH request to update or create a new rate_limit object which will include:
  // rate_limit, requests_made

  const domain = (process.env.MODE === "DEVELOPMENT") ? "http://localhost:3000" : ""; 

  const response = await fetch(`${domain}/api/public/users/${userID}/metadata`)
  const data = await response.json();
  const metadata = data.app_metadata;


  const new_metadata = (metadata.rate_limit && metadata.requests_made) ? { requests_made: metadata.requests_made + 1 }
    : { requests_made: 1, rate_limit: 100 };

  await fetch(`${domain}/api/public/users/${userID}/metadata`, {
    method: "PATCH",
    body: JSON.stringify({ new_metadata })
  })

}

export default updateMetadata;