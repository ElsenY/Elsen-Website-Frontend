import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function safeFetch(url: string, options: RequestInit = {}) {
  const isEdge = typeof Response !== "undefined" && globalThis.Request; // crude Edge check

  // If sending a body in Edge, add duplex
  if (isEdge && options.body) {
    // @ts-expect-error: duplex is required in Edge runtime
    options.duplex = "half";
  }

  options.credentials = "include";
  return fetch(url, options);
}

