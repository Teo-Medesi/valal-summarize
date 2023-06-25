import { NextResponse } from "next/server";
import summarize from "./completion";
import extract from "../extract";

// body => options, url => language, temperature, length, custom

export async function POST(request) {
  try {
    const body = await request.json();
    const options = body.options || { language: "English", length: "Medium - 2-4 sentences", temperature: 0.5, custom: "none" }

    // getting headers and paragraphs from website
    const text = await extract(body.url);
    const summary = await summarize(text, options);

    return NextResponse.json({ summary });
  }
  catch (error) {
    // note to self: attaching the caught error to the body doesn't work for some reason, the caught error must be in the response init object
    return NextResponse.json({ error }, { status: 500 });
  }
}
