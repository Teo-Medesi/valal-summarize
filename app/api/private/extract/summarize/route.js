import { NextResponse } from "next/server";
import summarize from "./completion";
import extract from "../extract";
import extractVariables from "./extract";
import updateMetadata from "./updateMetadata";

// body => options, url => language, temperature, length, custom

export async function POST(request) {
  try {
    const body = await request.json();
    const options = body.options || { language: "English", length: "Medium - 2-4 sentences", temperature: 0.5, custom: "none" }

    // getting headers and paragraphs from website
    //const text = await extract(body.url);
    //const summary = await summarize(text, options);
    //const { websiteDescription, websiteSummary } = extractVariables(summary);

    // updating rate limit
    const auth = JSON.parse(request.headers.get("Authorization"));
    await updateMetadata(auth.user_id);

    return NextResponse.json({ message: "test" });
    // return NextResponse.json({ website_description: websiteDescription, website_summary: websiteSummary });
  }
  catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
