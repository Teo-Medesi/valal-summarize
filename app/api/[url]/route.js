import { NextResponse } from "next/server";
import puppeteer from "puppeteer-core";

export async function GET(request, context) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(context.params.url);
  await page.setViewport({width: 1920, height: 1080});

  try {
    const screenshot = await page.screenshot({path: "./images/screenshot.jpg"});
    await browser.close();
    return NextResponse.json({message: "screenshot successful", screenshot: screenshot});
  } 
  catch (error) {
    return NextResponse.json({message: "error", error: error.message});
  }
  
}