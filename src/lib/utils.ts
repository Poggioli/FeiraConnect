import { clsx, type ClassValue } from "clsx";
import { KeyboardEvent } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isEnterKey(event: KeyboardEvent<HTMLElement>): boolean {
  return event.key === "Enter"
}
