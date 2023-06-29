import { NextResponse } from "next/server";

/*
TODO FOR 23.6: implement user_id and user API key authentification for api/extract      
*/

export async function middleware(request) {
  const domain = (process.env.MODE === "DEVELOPMENT") ? "http://localhost:3000" : "https://valal-summarize.vercel.app";

  if (request.nextUrl.pathname.startsWith("/api/private")) {
    const auth = JSON.parse(request.headers.get("Authorization"));

    // authentification
    if (!auth || typeof (auth) !== "object") return NextResponse.json({ message: "Restricted", error: "Missing Authorization header" }, { status: 401 })

    if (!auth.API_key) return NextResponse.json({ message: "Restricted", error: "Missing API key" }, { status: 401 })

    if (!auth.user_id) return NextResponse.json({ message: "Restricted", error: "Missing user_id in auth object" }, { status: 401 })

    try {
      const response = await fetch(`/api/public/users/${auth.user_id}/metadata`)
      const metadata = await response.json();

      if (!metadata.app_metadata.auth.API_key || metadata.app_metadata.auth.API_key !== auth.API_key) return NextResponse.json({ message: "Forbidden", error: "Invalid API_key" }, { status: 403 });
    }
    catch (error) {
      return NextResponse.json({ message: "Unauthorized", error: "Invalid user_id" }, { status: 401 })
    }

    try {
      // checking if the url is in the request body or in the query params
      const url = request.nextUrl.pathname.startsWith("/api/private/extract") ? (await request.json()).url : request.nextUrl.searchParams.get("url")

      // URL validation
      if (!url) return NextResponse.json({ message: "Missing URL" }, { status: 400 });

      // testing if url is valid (faster than sending a GET request to the website to see if it exists)
      const regex = /(https?:\/\/)?([\da-z\.-]+)\.([a-z]{2,6})([\/\w\.-]*)*\/?/;
      if (!regex.test(url)) return NextResponse.json({ message: "Invalid URL" }, { status: 404 });

      try {
        // testing if website exists, using HEAD as we don't want to waste bandwidth
        await fetch(url, { method: "HEAD" })
      }
      catch (error) {
        return NextResponse.json({ message: "Website not found" }, { status: 404 });
      }

    }
    catch (error) {
      return NextResponse.json({ message: "Invalid JSON", error }, { status: 400 });
    }

  }

  if (request.nextUrl.pathname.startsWith("/api/private/extract/summarize")) {
    try {
      const auth = JSON.parse(request.headers.get("Authorization"));

      const response = await fetch(`${domain}/api/public/users/${auth.user_id}/metadata`);
      const metadata = (await response.json()).app_metadata;

      // if this is the users first request, then there is no metadata yet so we will skip the middleware
      if (!metadata.requests_made || !metadata.rate_limit) return NextResponse.next();

      if (metadata.requests_made >= metadata.rate_limit) {
        return NextResponse.json({ message: "Too many requests", error: "You have gone over the specified request limit." }, { status: 429 })
      }
      else {
        const newHeaders = new Headers(request.headers);
        newHeaders.set("X-RateLimit-Limit", metadata.rate_limit)
        newHeaders.set("X-RateLimit-Remaining", (metadata.rate_limit - metadata.requests_made - 1))

        return NextResponse.next({ headers: newHeaders })
      }

    }
    catch (error) {
      return NextResponse.json({ message: "Internal server error", error }, { status: 500 })
    }
  }
}
