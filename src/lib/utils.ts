import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function safeMediaSrc(src: string) {
  try {
    return encodeURI(src);
  } catch {
    return src;
  }
}
