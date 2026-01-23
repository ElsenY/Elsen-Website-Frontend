import { Button } from "../ui/button";
import Image from "next/image";
import { Card } from "../ui/card";  
import Link from "next/link";
export default function MainCard() {
  return (
    <div className="relative flex overflow-hidden min-h-[480px] min-w-[300px] justify-end flex-col gap-6 rounded-lg px-4 pb-10 @[480px]:px-10">
    <Image
      src="/images/elsen_about_profile.jpeg"
      alt="Elsen Yacub"
      fill
      priority
      className="object-cover"
    />
  
    <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/80" />
    <div className="relative z-10 flex flex-col gap-6 justify-end">
      <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
        Elsen Yacub
      </h1>
      <h2 className="text-white text-sm font-normal leading-tight whitespace-pre-line @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
        {description}
      </h2>
      <div>
        <Link href="/docs/resume.pdf" target="_blank" rel="noopener noreferrer" className="w-full">
          <Button>See My Resume</Button> 
        </Link>
      </div>
    </div>
  </div>
  
  );
}

const description = 
<p className="text-base whitespace-pre-line">
A Backend focused Software Engineer with various experiences, from backend to frontend to infrastructure. With <b className="font-extrabold">5+ years</b> of experience working in multiple big tech companies such as <b className="font-extrabold">TikTok Tokopedia</b>, I have contributed in building robust apps and services, contributed in cost saving initiatives, and also improving multiple teams efficiency by creating impactful automations tools.
</p>