import cheerio from "cheerio";
import { NextResponse } from "next/server";
import summarize from "./completion";

// body => options, url => language, temperature, length, custom

export async function POST(request, { params }) {
  try {
    const body = await request.json();
    const website = await fetch(body.url);
    const html = await website.text();

    const options = body.options || { language: "English", length: "Medium - 2-4 sentences", temperature: 0.5, custom: "none" }

    // parsing text from html
    const $ = cheerio.load(html);
    let text = "";

    // we only want to get the most important and information heavy elements, such as headers and paragraphs
    $("h1, h2, h3, h4, h5, h6, pre, p").each((index, element) => {
      // we use trim() in order to remove all unneeded white space
      const item = $(element).text().trim();

      // ||| is used as a separater so that GPT can better understand the text
      text = text.concat(item, " ||| ");
    });

    // max number of characters that our html text should be for our GPT API call including the prompt length
    const maxLength = 3500;

    // if the text is longer than our maxLength, we will trim it off
    const input = text.length >= maxLength ? text.substring(0, maxLength) : text;

    const summary = await summarize(input, options);
    return NextResponse.json({ summary });
  }
  catch (error) {
    // note to self: attaching the caught error to the body doesn't work for some reason, the caught error must be in the response init object
    return NextResponse.json({ error }, { status: 500 });
  }
}
