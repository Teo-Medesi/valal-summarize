import Image from "next/image";
import homeIcon from "../../../public/icons/home.svg";
import contactIcon from "../../../public/icons/contact.svg";
import signupIcon from "../../../public/icons/signup.svg";
import feedbackIcon from "../../../public/icons/feedback.svg";
import aboutIcon from "../../../public/icons/about.svg";

const MobileNavbar = () => {
  return (
    <nav>
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
    </nav>
  )
}

export default MobileNavbar