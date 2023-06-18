import { NextResponse } from "next/server";
import { getThumURL } from "thum.io";

export async function POST(request) {
  try {

    // protecting against CORS (screenshot should only be accessible to our server)
    //if (request.headers.get("origin") !== request.headers.get("host")) return NextResponse.json({ message: "Forbidden" }, { status: 403 })

    const body = await request.json();

    const imageURL = getThumURL({
      url: body.url,
      width: 1200,
      auth: {
        type: "referer",
        keyId: process.env.THUM_IO_ID,
        secret: process.env.THUM_IO_SECRET,
      },
      protocol: "https",
    });

    return NextResponse.json({ url: imageURL, origin: request.headers.get("origin") }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 400 })
  }
}
