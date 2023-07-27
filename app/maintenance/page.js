"use client"
import Image from "next/image";
import gif from "../../public/maintenance.gif"

export default function Maintenance() {
    return (
        <div className={"w-full h-full justify-center p-4 items-center flex flex-col gap-4 "}>
            <Image src={gif} className="w-60 h-60 md:w-80 md:h-80" />
            <h1 className="p-4 border-8 border-dashed border-black bg-yellow-400 text-xl md:text-3xl text-black font-bold rounded">THIS WEBSITE IS TEMPORARILY UNDER MAINTENANCE</h1>
        </div>
    )
}