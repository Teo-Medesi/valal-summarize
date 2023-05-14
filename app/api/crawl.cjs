const puppeteer = require("puppeteer-core");

const crawlWebsite = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);
  await page.screenshot({path: "example.png"});

  await browser.close();
  const json = {status: "200 OK"}
  
  return json;
}

module.exports = crawlWebsite;