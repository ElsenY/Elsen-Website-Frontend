"use client"

interface LabelProps {
  label: string;
  icon: React.ReactNode;
}

export default function Label({ label, icon }: LabelProps) {
  return (
    <div className="flex flex-row h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#223649] pl-4 pr-4">
        {icon}
        <p className="text-white text-sm font-medium leading-normal">{label}</p>
    </div>
  );
}