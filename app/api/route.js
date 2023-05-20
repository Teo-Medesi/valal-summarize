import cheerio from "cheerio";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const website = await fetch(body.url);
  const html = await website.text();

  // parsing text from html
  const $ = cheerio.load(html);
  let text = "";

  $("h1, h2, h3, h4, h5, h6, pre, p").each((index, element) => {
    const item = $(element).text();
    console.log(item);

    text = text.concat(item, " ||| ");
  });

  // max number of characters that our html text should be for our GPT API call including the prompt length
  const maxLength = 1500;

  // if the text is longer than our maxLength, we will trim it off
  const output = text.length >= maxLength ? text.substring(0, maxLength) : text;

  console.log(output);

  return NextResponse.json({ output });
}
