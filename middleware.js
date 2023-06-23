import { NextResponse } from "next/server";

/*

  TODO FOR 23.6: implement user_id and user API key authentification for api/extract      
*/

export async function middleware(request) {
  if (request.nextUrl.pathname.startsWith("/api/private")) {
    const auth = JSON.parse(request.headers.get("Authorization"));

    // checking for master API key 
    if (!auth || auth.API_key !== process.env.MASTER_KEY) return NextResponse.json({ message: "Forbidden", error: "Resources restricted to users" }, { status: 403 })
  }

  if (request.nextUrl.pathname.startsWith("/api/extract")) {
    try {
      const body = await request.json();
      const auth = JSON.parse(request.headers.get("Authorization"));

      // authentification
      if (!auth || typeof (auth) !== "object") return NextResponse.json({ message: "Restricted", error: "Missing Authorization header" }, { status: 401 })

      if (!auth.API_key) return NextResponse.json({ message: "Restricted", error: "Missing API key" }, { status: 401 })

      if (auth.API_key !== process.env.MASTER_KEY) {
        if (!auth.user_id) return NextResponse.json({ message: "Restricted", error: "Missing user_id in auth object" }, { status: 401 })

        try {
          const response = await fetch(`http://localhost:3000/api/private/users/${auth.user_id}/metadata`)
          const metadata = await response.json();

          if (!metadata.app_metadata.auth.API_key || metadata.app_metadata.auth.API_key !== auth.API_key) return NextResponse.json({ message: "Forbidden", error: "Invalid API_key" }, { status: 403 });
        }
        catch (error) {
          return NextResponse.json({ message: "Unauthorized", error: "Invalid user_id" }, { status: 401 })
        }
      }

      // URL validation

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

  if (request.nextUrl.pathname.startsWith("/api/private/screenshot")) {
    if (!request.nextUrl.searchParams.get("url")) return NextResponse.json({ message: "Missing body URL" }, { status: 400 });

    // testing if url is valid (faster than sending a GET request to the website to see if it exists)
    const regex = /(https?:\/\/)?([\da-z\.-]+)\.([a-z]{2,6})([\/\w\.-]*)*\/?/;
    if (!regex.test(request.nextUrl.searchParams.get("url"))) return NextResponse.json({ message: "Invalid URL" }, { status: 404 });

    try {
      // testing if website exists, using HEAD as we don't want to waste bandwidth
      await fetch(request.nextUrl.searchParams.get("url"), { method: "HEAD" })
    }
    catch (error) {
      return NextResponse.json({ message: "Website not found" }, { status: 404 });
    }
  }

}
