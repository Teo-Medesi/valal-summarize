import { NextResponse } from "next/server";


export async function GET(request) {
  console.log("TEST");
  return NextResponse.json({ message: "Test" }, { status: 200, statusText: "bruh" });
}