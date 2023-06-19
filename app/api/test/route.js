import { NextResponse } from "next/server";


export async function POST(request) {
  try {
    const body = await request.json();
    return NextResponse.json({ message: "Test", user: body.user }, { status: 200, statusText: "bruh" });
  }
  catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}