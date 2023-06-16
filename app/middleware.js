import { NextResponse } from "next/server";

/*

      all 3 API routes both need to prevalidate to check if the url is valid and if the user has permission to make the request
        ----> we need to make middleware that aggregates the request down the pipeline if it is valid, reducing redundencies in our code
      
      if the request is made from our an allowed domain (our own, for now that would be https://localhost:3000) then it will be authorized
      if it comes from a foreign domain without a valid API key, the request will be denied  --- HTTP 401 Unauthorized

      the API key will either be included in the request headers or in the request body

*/

export function middleware(request) {
  console.log(request);
}

// defining which routes we want to intercept
export const config = {
  matcher: "/api/:path*",
}