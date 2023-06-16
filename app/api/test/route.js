import { NextResponse } from "next/server";

export async function GET(request) {
  const data = await request.json();

  return NextResponse.json({ request: request }, { status: 200, statusText: "bruh" });
}