"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimate } from "framer-motion";
import { useAuth0 } from "@auth0/auth0-react";
import Skeleton from 'react-loading-skeleton'
import Image from "next/image";
import languagesData from "../../public/json/languages.json";
import copyIcon from "../../public/icons/copy.svg"
import copyToClipboard from "./utils/copyToClipboard";
import Restricted from "./components/Restricted";
import 'react-loading-skeleton/dist/skeleton.css'


export default function Home() {
  const [isParametersOpen, setIsParametersOpen] = useState(true);

  const [ImageURL, setImageURL] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [userMetadata, setUserMetadata] = useState(null);
  const { user, isAuthenticated } = useAuth0();

  const [isLoading, setIsLoading] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [scope, animate] = useAnimate();

  const formRef = useRef();

  useEffect(() => {
    if (isAuthenticated && !userMetadata) getUserMetadata();
  }, [isAuthenticated]);

  const createUserMetadata = async () => {
    await fetch(`/api/public/users/${user.sub}/metadata/create-new-key`, { method: "POST" })
    getUserMetadata();
  }

  const getUserMetadata = async () => {
    const response = await fetch(`/api/public/users/${user.sub}/metadata`)
    const metadata = await response.json();

    if (Object.keys(metadata).length === 0) createUserMetadata();
    else setUserMetadata(metadata.app_metadata);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    summary != "" && setSummary("");
    description != "" && setDescription("");

    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }
    if (!formRef.current.url.value) return;

    setIsLoading(true);
    setSummary("");

    const response = await fetch("/api/private/extract/summarize", {
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
      headers: {
        "Content-Type": "application/json",
        "Authorization": JSON.stringify({ API_key: userMetadata.auth.API_key, user_id: user.sub })
      }
    });

    const data = await response.json();
    setSummary(data.website_summary);
    setDescription(data.website_description);
  };

  const handlePreview = async (event) => {
    if (!isAuthenticated) return;

    const url = event.target.value;

    const response = await fetch(`/api/private/screenshot?url=${url}`, {
      headers: {
        "Authorization": JSON.stringify({ API_key: userMetadata.auth.API_key, user_id: user.sub })
      }
    });
    const data = await response.json();

    if (response.status === 200) setImageURL(data.url);
  };

  const handleCopyToClipboard = async () => {
    await copyToClipboard(summary);

    await animate(".banner", { opacity: 1 }, { duration: 0.5 });
    await animate(".banner", { opacity: 0 }, { delay: 1, duration: 2 })
  }

  return (
    <>
      {isAuthModalOpen && <div className="z-30 p-4 md:p-0 fixed left-0 bottom-0 w-screen h-screen flex justify-center items-center"><div className="w-full md:w-3/4 lg:w-2/3 h-1/2 md:h-2/3 bg-black2 shadow-md shadow-black2 border-t-8 border-t-green-700 rounded-t rounded-b-xl text-center"><Restricted /></div></div>}
      <main ref={scope} className={"flex min-h-screen flex-col overflow-x-hidden bg-black2 " + (isAuthModalOpen && "brightness-50")}>

        <article className="h-full w-full flex bg-black flex-col md:items-center pt-4 lg:pt-16">
          <form
            ref={formRef}
            className="flex flex-col gap-4 md:gap-8 w-full items-center">
            <section className="w-full flex flex-col items-center">
              <div className="flex flex-col w-full md:w-3/4 lg:w-1/2 p-4 gap-8 md:gap-16 md:items-center">
                <div className="flex flex-col text-center gap-2">
                  <h1 className="text-xl text-center hidden md:block md:text-4xl">
                    Valal Summarize
                  </h1>
                  <p className="text-left lg:text-center text-gray-500">
                    Valal Summarize: Your Web Content, Supercharged. AI-Powered Summaries in Seconds.
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

                <div className={"bg-white flex flex-col gap-4 text-black w-full rounded text-xl border-b-8 border-b-green-700 p-4 md:p-8 " + ((isLoading || summary) ? "" : "hidden")}>
                  {
                    summary || description
                      ?
                      (
                        <>
                          <p><span className="text-green-700 font-bold">Description</span>: {description} </p>
                          <p><span className="text-green-700 font-bold">Summary</span>: {summary}</p>
                        </>
                      )
                      :
                      < Skeleton count={8} baseColor="#ffffff" highlightColor="#15803D" />
                  }
                  <div onClick={handleCopyToClipboard} className="flex justify-end w-full cursor-pointer"><Image src={copyIcon} alt="copy to clipboard icon" className="w-16 h-16 p-2 hover:bg-green-500 rounded-full transition-colors duration-300" /></div>
                </div>

                <div className="w-screen h-screen  pointer-events-none fixed left-0 bottom-0 pb-8 flex justify-center items-end">
                  <motion.p initial={{ opacity: 0 }} className="banner bg-green-700 w-1/2 text-center py-2 rounded">Copied to clipboard!</motion.p>
                </div>

                <img
                  src={ImageURL ? ImageURL : ""}
                  alt="preview image"
                  className={ImageURL ? "" : "hidden"}
                />
              </div>


              <div className="shapedivider hidden">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                  <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill"></path>
                  <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="shape-fill"></path>
                  <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill"></path>
                </svg>
              </div>
            </section>

            <section
              className={
                "flex flex-col gap-4 md:gap-8 p-4 pb-32 md:pb-4 w-full md:items-center" +
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
                  defaultValue={"detailed"}
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

      </main>
    </>
  );
}
