import { KeyboardEvent } from "react";

export function isEnterKey(event: KeyboardEvent<HTMLElement>): boolean {
  return event.key === "Enter";
}