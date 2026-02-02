import Image from "next/image";

interface CompanyCardProps {
  logo: string; // image URL
  alt: string;  // alt text for logo
  description: React.ReactNode;
  elID?: string;
}

export default function CompanyCard({ logo, alt, description, elID }: CompanyCardProps) {
  return (
    <div className="relative w-full h-80 rounded-xl overflow-hidden group shadow-lg cursor-pointer">
      {/* Logo */}
      <div className="relative w-[95%] h-full m-4">
        <Image
          src={logo}
          alt={alt}
          fill
          className="object-contain"
          sizes="100%"
          priority
        />
      </div>

      {/* Overlay */}
      <div
        id={elID || ""}
        className="overlay">
          {description}
      </div>
    </div>
  );
}
