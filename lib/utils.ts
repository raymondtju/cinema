import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function rc(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}