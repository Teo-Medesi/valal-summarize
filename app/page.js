"use client";
import { useState } from "react";
import homeIcon from "../public/icons/home.svg"
import contactIcon from "../public/icons/contact.svg"
import signupIcon from "../public/icons/signup.svg"
import feedbackIcon from "../public/icons/feedback.svg"
import aboutIcon from "../public/icons/about.svg"
import Image from "next/image";
import languagesData from "../public/json/languages.json"

export default function Home() {
  const [isParametersOpen, setIsParametersOpen] = useState(true);
  
  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden bg-black2">
      {/* laptop and desktop navbar*/}
      <nav className="hidden md:flex min-h-[10vh] text-xl bg-black px-16 items-center min-w-screen justify-between">
        <div className="flex gap-8 items-center">
          <h1 className="text-2xl text-white bg-green-700 p-1 px-6 rounded uppercase bold">Valal</h1>
          <ul className="flex gap-4">
            <li className="hover:text-green-700"><a href="#">Home</a></li>
            <li className="hover:text-green-700"><a href="#">About</a></li>
            <li className="hover:text-green-700"><a href="#">Contact</a></li>
          </ul>
        </div>
        <div className="flex gap-4">
          <button className="border-gray-400 text-gray-400 hover:border-white hover:text-white border rounded p-4">Feedback</button>
          <button className="rounded hover:rounded-xl p-4 uppercase bg-green-700">Sign Up</button>
        </div>
      </nav>
      
      <div className="md:hidden flex justify-center items-center min-h-[10vh] text-3xl text-white bg-green-700">
        <h1>Valal</h1>
      </div>

      <article className="h-full w-full min-h-[90vh] flex bg-black flex-col md:items-center lg:py-8">
        <form className="flex flex-col gap-4 md:gap-8 w-full items-center">
          <section className="flex flex-col w-full md:w-3/4 lg:w-1/2 p-4 gap-4 md:gap-8 md:items-center">
            <h1 className="text-xl text-center md:text-3xl">website crawler and summarizer</h1>
            <input autoFocus type="text" name="url" className="w-full p-4 border-4 rounded outline-none text-gray-500" placeholder="https://example.com/123"/>
            <button type="submit" className="text-xl p-4 bg-green-700 rounded w-full">Submit</button>
          </section>

          <section className={"flex flex-col gap-4 md:gap-8 p-4 bg-black2 w-full md:items-center" + (isParametersOpen ? "" : "hidden")}>
            <div className="flex flex-col gap-2 md:w-3/4 lg:w-1/2  ">
              <label htmlFor="language" className="text-xl">Language</label>
              <select name="language" id="language" defaultValue={"English"} className="p-4 rounded outline-none text-gray-500">
                {languagesData.languages.map(language => <option key={language.code} value={language.name}>{language.name}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-2 md:w-3/4 lg:w-1/2 ">
              <label htmlFor="length" className="text-xl">Length</label>
              <select name="length" id="length" defaultValue={"medium"} className="p-4 rounded outline-none text-gray-500">
                <option value="short">short = 1-2 sentences</option>
                <option value="medium">medium = 2 - 4 sentences</option>
                <option value="detailed">detailed = 4+ sentences</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 md:w-3/4 lg:w-1/2 ">
              <label htmlFor="length" className="text-xl">custom parameters</label>
              <input type="text" name="custom prompt" id="custom prompt" className="p-4 rounded outline-none text-gray-500" placeholder="enter additional prompt here"/>
            </div>
          </section>
        </form>
      </article>
      
      {/* mobile and tablet navbar*/}      
      <nav className="invisible text-sm flex justify-between left-0 bottom-0 md:hidden min-h-[10vh] bg-green-700 w-full">
        <div className="flex justify-center flex-col items-center w-full border-r-green-600 border-r">
          <Image className="w-8 h-8" src={homeIcon} alt="home button"/>
        </div>
        <div className="flex justify-center flex-col items-center w-full border-r-green-600 border-r">
          <Image className="w-8 h-8" src={aboutIcon} alt="about button"/>
        </div>
        <div className="flex justify-center flex-col bg-white items-center w-full border-r-green-600 border-r">
          <Image className="w-12 h-12" src={signupIcon} alt="signup button"/>
        </div>
        <div className="flex justify-center flex-col items-center w-full border-r-green-600 border-r">
          <Image className="w-8 h-8" src={contactIcon} alt="contact me button"/>
        </div>
        <div className="flex justify-center flex-col items-center w-full border-r-green-600 border-r">
          <Image className="w-8 h-8" src={feedbackIcon} alt="feedback button" />
        </div>
      </nav>
      <nav className="fixed text-sm flex justify-between left-0 bottom-0 md:hidden min-h-[10vh] bg-green-700 w-full">
        <div className="flex justify-center flex-col items-center w-full border-r-green-600 border-r">
          <Image className="w-8 h-8" src={homeIcon} alt="home button"/>
        </div>
        <div className="flex justify-center flex-col items-center w-full border-r-green-600 border-r">
          <Image className="w-8 h-8" src={aboutIcon} alt="about button"/>
        </div>
        <div className="flex justify-center flex-col bg-white items-center w-full border-r-green-600 border-r">
          <Image className="w-12 h-12" src={signupIcon} alt="signup button"/>
        </div>
        <div className="flex justify-center flex-col items-center w-full border-r-green-600 border-r">
          <Image className="w-8 h-8" src={contactIcon} alt="contact me button"/>
        </div>
        <div className="flex justify-center flex-col items-center w-full border-r-green-600 border-r">
          <Image className="w-8 h-8" src={feedbackIcon} alt="feedback button" />
        </div>
      </nav>

      
      
    </main>
  )
}
