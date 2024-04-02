import { KeyboardEvent } from "react";
import { isEnterKey } from "./keyboardEvents";

describe("@/lib/keyboardEvents", () => {
  it(`GIVEN a keyboard event
      WHEN this event is NOT an "Enter" key
      THEN should return false`, () => {
    const kbEvent = { key: "Esc" } as KeyboardEvent<HTMLElement>;
    const result = isEnterKey(kbEvent);
    expect(result).toBe(false);
  });

  it(`GIVEN a keyboard event
      WHEN this event is an "Enter" key
      THEN should return true`, () => {
    const kbEvent = { key: "Enter" } as KeyboardEvent<HTMLElement>;
    const result = isEnterKey(kbEvent);
    expect(result).toBe(true);
  });
});
