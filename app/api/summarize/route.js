import cheerio from "cheerio";
import { NextResponse } from "next/server";
import summarize from "./completion";

export async function POST(request) {
  const body = await request.json();
  const website = await fetch(body.url);
  const html = await website.text();

  // testing if url is valid
  const regex = /(https?:\/\/)?([\da-z\.-]+)\.([a-z]{2,6})([\/\w\.-]*)*\/?/;
  if (!regex.test(body.url)) return NextResponse.json({}, { status: 404, statusText: "invalid URL", });

  // testing if website exists
  const response = await fetch(body.url);
  if (!response.ok) return NextResponse.json({}, { status: 404, statusText: "website not found" });

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

  try {
    const summary = await summarize(input, { language: body.options.language, length: body.options.length, custom: body.options.custom, temperature: body.options.temperature });
    return NextResponse.json({ summary: summary });
  }
  catch (error) {
    // note to self: attaching the caught error to the body doesn't work for some reason, the caught error must be in the response init object
    return NextResponse.json({}, { status: 500, statusText: error });
  }
}
