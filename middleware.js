import { NextResponse } from "next/server";

/*

      all 3 API routes need to prevalidate to check if the url is valid and if the user has permission to make the request
        ----> we need to make middleware that aggregates the request down the pipeline if it is valid, reducing redundencies in our code
      
      if the request is made from an allowed domain (our own, for now that would be https://localhost:3000) then it will be authorized
      if it comes from a foreign domain without a valid API key, the request will be denied  --- HTTP 403 Unauthorized

      the API key will either be included in the request headers or in the request body

*/

export async function middleware(request) {
  try {
    const body = await request.json();
    if (!body.url) return NextResponse.json({ message: "Missing body URL" }, { status: 400 });

    // testing if url is valid (faster than sending a GET request to the website to see if it exists)
    const regex = /(https?:\/\/)?([\da-z\.-]+)\.([a-z]{2,6})([\/\w\.-]*)*\/?/;
    if (!regex.test(body.url)) return NextResponse.json({ message: "Invalid URL" }, { status: 404 });

    try {
      // testing if website exists, using HEAD as we don't want to waste bandwidth
      await fetch(body.url, { method: "HEAD" })
    }
    catch (error) {
      return NextResponse.json({ message: "Website not found" }, { status: 404 });
    }

  }
  catch (error) {
    return NextResponse.json({ message: "Invalid JSON", error }, { status: 400 });
  }
}

// defining which routes we want to intercept
export const config = {
  matcher: "/api/:path*",
}