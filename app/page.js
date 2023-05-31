"use client";
import { useRef, useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import Skeleton from 'react-loading-skeleton'
import { motion, useAnimate } from "framer-motion";
import homeIcon from "../public/icons/home.svg";
import contactIcon from "../public/icons/contact.svg";
import signupIcon from "../public/icons/signup.svg";
import feedbackIcon from "../public/icons/feedback.svg";
import aboutIcon from "../public/icons/about.svg";
import Image from "next/image";
import languagesData from "../public/json/languages.json";
import logo from "../public/logo/logo-dark.svg";
import copyIcon from "../public/icons/copy.svg"
import 'react-loading-skeleton/dist/skeleton.css'
import copyToClipboard from "./components/copyToClipboard";


export default function Home() {
  const [isParametersOpen, setIsParametersOpen] = useState(true);
  const [ImageURL, setImageURL] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [scope, animate] = useAnimate();

  const formRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formRef.current.url.value) return;

    setIsLoading(true);
    setSummary("");

    const response = await fetch("/api/summarize", {
      method: "POST",
      body: JSON.stringify({
        url: formRef.current.url.value,
        options: {
            language: formRef.current.language.value,
            length: formRef.current.length.value,
            temperature: formRef.current.temperature.value,
            custom: formRef.current.custom.value
        } 
      }),
    });

    const data = await response.json();
    setSummary(data.summary);
  };

  const handlePreview = async (event) => {
    const url = event.target.value;

    const response = await fetch("/api/screenshot", {
      method: "POST",
      body: JSON.stringify({ url }),
    });

    const data = await response.json();
    console.log(data);
    
    if (response.status === 200) {
      setImageURL(data.url);
    }
  };

  const handleCopyToClipboard = async () => {
    await copyToClipboard(summary);

    await animate(".banner", {opacity: 1}, {duration: 0.5});
    await animate(".banner", {opacity: 0}, {delay: 1, duration: 2})
  }

  return (
    <main ref={scope} className="flex min-h-screen flex-col overflow-x-hidden bg-black2">
      {/* laptop and desktop navbar*/}
      <nav className="hidden md:flex max-h-[10vh] text-xl bg-black px-16 items-center min-w-screen justify-between">
        <div className="flex gap-8 items-center">
          <Image src={logo} alt="Valal logo" className="h-28 w-28" />
          <ul className="flex gap-4">
            <li className="hover:text-green-700">
              <a href="#">Home</a>
            </li>
            <li className="hover:text-green-700">
              <a href="#">About</a>
            </li>
            <li className="hover:text-green-700">
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>
        <div className="flex gap-4">
          <button className="border-gray-400 text-gray-400 hover:border-white hover:text-white border rounded p-4">
            Feedback
          </button>
          <button className="rounded hover:rounded-xl p-4 uppercase bg-green-700">
            Sign Up
          </button>
        </div>
      </nav>

      <div className="md:hidden flex justify-center items-center text-3xl text-white bg-black ">
        <Image src={logo} alt="Valal logo" className="h-28 w-28" />
      </div>

      <article className="h-full w-full flex bg-black flex-col md:items-center py-4 lg:py-16">
        <form
          ref={formRef}
          className="flex flex-col gap-4 md:gap-8 w-full items-center">
          <section className="w-full flex flex-col items-center">
            <div className="flex flex-col w-full md:w-3/4 lg:w-1/2 p-4 gap-8 md:gap-16 md:items-center">
              <div className="flex flex-col text-center gap-2">
                <h1 className="text-xl text-center md:text-4xl">
                  Valal Summarize
                </h1>
                <p className="text-left lg:text-center text-gray-500">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error
                  ullam beatae reprehenderit sint ea aut. Sit placeat beatae minus
                  provident!
                </p>
              </div>
              <input
                autoFocus
                type="text"
                name="url"
                className="w-full p-4 bg-transparent border-b border-gray-500  outline-none text-white"
                placeholder="https://example.com/123"
                onChange={handlePreview}
              />
              <button
                onClick={handleSubmit}
                className="text-xl p-4 bg-green-700 rounded w-full">
                Submit
              </button>

              
              <div className={"bg-white flex flex-col gap-4 text-black w-full rounded text-xl border-b-8 border-b-green-700 p-8 "  + ((isLoading || summary) ? "" : "hidden")}> 
                <p>{summary || <Skeleton count={8} baseColor="#ffffff" highlightColor="#15803D"/>}</p>
                <div onClick={handleCopyToClipboard} className="flex justify-end w-full cursor-pointer"><Image src={copyIcon} alt="copy to clipboard icon" className="w-16 h-16 p-2 hover:bg-green-500 rounded-full transition-colors duration-300"/></div>
              </div>
              
              <div className="w-screen h-screen  pointer-events-none fixed left-0 bottom-0 pb-8 flex justify-center items-end">
                <motion.p initial={{opacity: 0}} className="banner bg-green-700 w-1/2 text-center py-2 rounded">Copied to clipboard?</motion.p>
              </div>
               
              <img
                src={ImageURL ? ImageURL : ""}
                alt="preview image"
                className={ImageURL ? "" : "hidden"}
              />
            </div>


            <div class="shapedivider hidden">
              <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                  <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill"></path>
                  <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="shape-fill"></path>
                  <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill"></path>
              </svg>
            </div>
          </section>

          <section
            className={
              "flex flex-col gap-4 md:gap-8 p-4 bg-black2 w-full md:items-center" +
              (isParametersOpen ? "" : "hidden")
            }>
            <div className="flex flex-col gap-2 md:w-3/4 lg:w-1/2  ">
              <label htmlFor="language" className="text-xl">
                Language
              </label>
              <select
                name="language"
                id="language"
                defaultValue={"English"}
                className="p-4 rounded outline-none text-gray-500">
                {languagesData.languages.map((language, index) => (
                  <option key={index} value={language.name}>
                    {language.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2 md:w-3/4 lg:w-1/2 ">
              <label htmlFor="length" className="text-xl">
                Length
              </label>
              <select
                name="length"
                id="length"
                defaultValue={"medium"}
                className="p-4 rounded outline-none text-gray-500">
                <option value="short">short = 1-2 sentences</option>
                <option value="medium">medium = 2 - 4 sentences</option>
                <option value="detailed">detailed = 4+ sentences</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 md:w-3/4 lg:w-1/2 ">
              <label htmlFor="length" className="text-xl">
                custom parameters
              </label>
              <input
                type="text"
                name="custom"
                id="custom prompt"
                className="p-4 rounded outline-none text-gray-500"
                placeholder="enter additional prompt here"
              />
            </div>
            <div className="flex flex-col gap-2 md:w-3/4 lg:w-1/2 ">
              <label htmlFor="temperature" className="text-xl">
                Temperature
              </label>
              <select
                name="temperature"
                id="temperature"
                defaultValue={0.75}
                className="p-4 rounded outline-none text-gray-500">
                  <option value={0}>Highly deterministic</option>
                  <option value={0.25}>deterministic</option>
                  <option value={0.5}>Neutral</option>
                  <option value={0.75}>Creative</option>
                  <option value={1}>Highly Creative</option>
              </select>
            </div>

          </section>
        </form>
      </article>

      {/* mobile and tablet navbar*/}
      <nav className="invisible text-sm flex justify-between left-0 bottom-0 md:hidden min-h-[10vh] bg-green-700 w-full">
        <div className="flex justify-center flex-col items-center w-full border-r-green-600 border-r">
          <Image className="w-8 h-8" src={homeIcon} alt="home button" />
        </div>
        <div className="flex justify-center flex-col items-center w-full border-r-green-600 border-r">
          <Image className="w-8 h-8" src={aboutIcon} alt="about button" />
        </div>
        <div className="flex justify-center flex-col bg-white items-center w-full border-r-green-600 border-r">
          <Image className="w-12 h-12" src={signupIcon} alt="signup button" />
        </div>
        <div className="flex justify-center flex-col items-center w-full border-r-green-600 border-r">
          <Image
            className="w-8 h-8"
            src={contactIcon}
            alt="contact me button"
          />
        </div>
        <div className="flex justify-center flex-col items-center w-full border-r-green-600 border-r">
          <Image className="w-8 h-8" src={feedbackIcon} alt="feedback button" />
        </div>
      </nav>
      <nav className="fixed text-sm flex justify-between left-0 bottom-0 md:hidden min-h-[10vh] bg-green-700 w-full">
        <div className="flex justify-center flex-col items-center w-full border-r-green-600 border-r">
          <Image className="w-8 h-8" src={homeIcon} alt="home button" />
        </div>
        <div className="flex justify-center flex-col items-center w-full border-r-green-600 border-r">
          <Image className="w-8 h-8" src={aboutIcon} alt="about button" />
        </div>
        <div className="flex justify-center flex-col bg-white items-center w-full border-r-green-600 border-r">
          <Image className="w-12 h-12" src={signupIcon} alt="signup button" />
        </div>
        <div className="flex justify-center flex-col items-center w-full border-r-green-600 border-r">
          <Image
            className="w-8 h-8"
            src={contactIcon}
            alt="contact me button"
          />
        </div>
        <div className="flex justify-center flex-col items-center w-full border-r-green-600 border-r">
          <Image className="w-8 h-8" src={feedbackIcon} alt="feedback button" />
        </div>
      </nav>
    </main>
  );
}
