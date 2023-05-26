import { NextResponse } from "next/server";
import { getThumURL } from "thum.io";

export async function POST(request) {
  const body = await request.json();
  
  // testing if url is valid
  const regex = /(https?:\/\/)?([\da-z\.-]+)\.([a-z]{2,6})([\/\w\.-]*)*\/?/;
  if (!regex.test(body.url)) return NextResponse.json({}, {status: 404, statusText: "invalid URL" , });

  // testing if website exists
  const response = await fetch(body.url);
  if (!response.ok) return NextResponse.json({}, {status: 404, statusText: "website not found"});
  
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

  // testing if website exists
  const thumResponse = await fetch(imageURL);
  if (!thumResponse) return NextResponse.json({response: thumResponse}, {status: 500, statusText: "failed to receive image from thum.io"});

  return NextResponse.json({ url: imageURL }, {status: 200});
}
