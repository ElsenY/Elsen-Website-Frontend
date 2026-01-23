import { Loader2Icon } from "lucide-react"

import { cn } from "@/lib/utils";

function Spinner({ className, size = 4, ...props }: React.ComponentProps<"svg"> & { size?: number }) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn(`size-${size} animate-spin`, className)}
      {...props}
    />
  )
}

export { Spinner }
