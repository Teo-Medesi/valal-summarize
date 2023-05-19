import screenshot from "./screenshot.js";

const crawlWebsite = async (URL) => {
  const screenshot = await screenshot(URL);  

  return {screenshot};
}
