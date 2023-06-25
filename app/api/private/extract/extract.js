import cheerio from "cheerio";

export default async function extract(url) {
  // parsing text from html
  const website = await fetch(url);
  const html = await website.text();

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
  text = text.length >= maxLength ? text.substring(0, maxLength) : text;

  return text;
}