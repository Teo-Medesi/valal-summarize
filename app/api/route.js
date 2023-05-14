import { NextResponse } from "next/server";
import crawlWebsite from "./crawl.cjs";

export async function POST(request) {
  const req = await request.json();
  const response = await crawlWebsite(req.body.url);

  NextResponse(response);
}
