import { NextResponse } from "next/server";
import extract from "./extract";

export async function POST(request) {
  try {
    const body = await request.json();
    const text = await extract(body.url);

    return NextResponse.json({ message: "extracted information successfully", text }, { status: 200 })
  }
  catch (error) {
    return NextResponse.json({ error }, { status: 400 })
  }
}