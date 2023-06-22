import { NextResponse } from "next/server";
import { getThumURL } from "thum.io";

// url is in query params GET /api/screenshot?url=http://example.com

export async function GET(request) {
  try {
    const url = request.nextUrl.searchParams.get("url");

    const imageURL = getThumURL({
      url: url,
      width: 1200,
      auth: {
        type: "referer",
        keyId: process.env.THUM_IO_ID,
        secret: process.env.THUM_IO_SECRET,
      },
      protocol: "https",
    });

    return NextResponse.json({ url: imageURL }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error }, { status: 400 })
  }
}
