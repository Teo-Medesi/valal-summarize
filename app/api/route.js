import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const image = await fetch(`https://image.thum.io/get/${body.url}`);

  return NextResponse.json({ screenshot: image });
}
