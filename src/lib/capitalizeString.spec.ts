import { capitalizeString } from "./capitalizeString";

describe("@/lib/capitalizeString", () => {
  it(`GIVEN a keyboard event
      WHEN this event is NOT an "Enter" key
      THEN should return false`, () => {
    const result = capitalizeString("bla bla bla");
    expect(result).toBe("Bla bla bla");
  });
});
