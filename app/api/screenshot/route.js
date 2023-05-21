import { NextResponse } from "next/server";
import { getThumURL } from "thum.io";

export async function POST(request) {
  const body = await request.json();
  
  // testing if url is valid
  const regex = /(https?:\/\/)?([\da-z\.-]+)\.([a-z]{2,6})([\/\w\.-]*)*\/?/;
  if (!regex.test(body.url)) throw new Error("400 - Invalid URL");

  // testing if website exists
  const response = await fetch(body.url);
  if (!response.ok) throw new Error("404 - Website not found.");
  
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


  return NextResponse.json({ url: imageURL });
}
