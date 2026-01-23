import LinkedinIcon from "../icons/linkedin-icon";
import GithubIcon from "../icons/github-icon";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex justify-center">
        <div className="flex max-w-[960px] flex-1 flex-col">
          <footer className="flex flex-col gap-6 px-5 py-10 text-center @container">
            <div className="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
              <div className="text-[#90adcb] text-base font-normal leading-normal min-w-40">
                End of section, try this cool <Link href="/game/blockade" className="underline">game</Link> that I made, or explore more about me below.
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://www.linkedin.com/in/elsen-yacub/" target="_blank" rel="noopener noreferrer">
                <LinkedinIcon />
              </a>
              <a href="https://github.com/ElsenY" target="_blank" rel="noopener noreferrer">
                <GithubIcon />
              </a>
            </div>
            <p className="text-[#90adcb] text-base font-normal leading-normal">
              © 2026 Elsen Yacub. All rights reserved.
            </p>
          </footer>
        </div>
      </footer>
  );
}