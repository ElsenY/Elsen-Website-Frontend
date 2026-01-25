'use client';
import Image from "next/image"; 
import Link from "next/link";

export default function Hero() {
  return (
    <div className="h-screen w-screen">
        <Image
          src="/images/profile.jpeg"
          alt="Hero Background"
          fill
          className="object-cover"
        />
      

      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30"></div>

      <div className="absolute inset-0 flex flex-col pb-36 justify-center items-center text-center">

        <h1 className="text-5xl md:text-6xl font-extrabold text-white animate-rgb-stroke paint-stroke-fill">
          ELSEN YACUB
        </h1>

        <p className="tracking-wider mt-4 text-4xl md:text-4xl font-extrabold rgb-text-fill simple-text-stroke paint-stroke-fill">
            SOFTWARE ENGINEER
        </p>


        <div className="flex flex-row gap-6 sm:gap-12 drop-shadow-xl">
        <Link href="/docs/resume.pdf" target="_blank" rel="noopener noreferrer"> 

        <button className="mt-6 px-2 sm:px-6 py-3 rounded-lg
                           bg-gradient-to-r 
                           hover:scale-105
                           hover:shadow-xl
                           transition-all duration-100
                           shadow-lg 
                           shadow-black/20
                           simple-text-stroke
                           font-extrabold
                           text-black
                           xs:text-base sm:text-xl">
                            See Resume
                            </button>
        </Link>
        <Link href="/game/blockade"> 
        <button className="mt-6 px-2 sm:px-6 py-3 rounded-lg
                           bg-gradient-to-r 
                           hover:scale-105
                           hover:shadow-xl
                           transition-all duration-100
                           shadow-lg 
                           shadow-black/20
                           simple-text-stroke
                           font-extrabold
                           text-black
                           xs:text-base sm:text-xl
                           ">
                            Play a Game 
        </button>
        </Link>
        <Link href="/about">
        <button className="mt-6 px-2 sm:px-6 py-3 rounded-lg
                           bg-gradient-to-r 
                           hover:scale-105
                           hover:shadow-xl
                           transition-all duration-100
                           shadow-lg 
                           shadow-black/20
                           simple-text-stroke
                           font-extrabold
                           text-black
                           text-base sm:text-xl">
          More About Me
        </button>
        </Link>
        </div>

      </div>
    </div>
  );
}
