import Image from "next/image";
import logo from "../../../public/logo/logo-dark.svg";

const MobileBanner = ({className}) => {
  return (
    <div className={"md:hidden flex justify-center items-center text-3xl text-white bg-black " + className}>
      <Image src={logo} alt="Valal logo" className="h-28 w-28" />
    </div>
  )
}

export default MobileBanner