import { weekdayFormated } from "./weekdayFormated";

describe("@/lib/weekdayFormated", () => {
  describe("monday", () => {
    it(`GIVEN a call to weekdayFormated
        WHEN value is "monday"
        THEN should return "Segunda-feira"`, () => {
      expect(weekdayFormated("monday")).toBe("Segunda-feira");
    });

    it(`GIVEN a call to weekdayFormated
        WHEN value is "1"
        THEN should return "Segunda-feira"`, () => {
      expect(weekdayFormated(1)).toBe("Segunda-feira");
    });

    it(`GIVEN a call to weekdayFormated
        WHEN value is date that is monday
        THEN should return "Segunda-feira"`, () => {
      expect(weekdayFormated(new Date(2024, 3, 8))).toBe("Segunda-feira");
    });
  });

  describe("tuesday", () => {
    it(`GIVEN a call to weekdayFormated
        WHEN value is "tuesday"
        THEN should return "Terça-feira"`, () => {
      expect(weekdayFormated("tuesday")).toBe("Terça-feira");
    });

    it(`GIVEN a call to weekdayFormated
        WHEN value is "2"
        THEN should return "Terça-feira"`, () => {
      expect(weekdayFormated(2)).toBe("Terça-feira");
    });

    it(`GIVEN a call to weekdayFormated
        WHEN value is date that is tuesday
        THEN should return "Terça-feira"`, () => {
      expect(weekdayFormated(new Date(2024, 3, 9))).toBe("Terça-feira");
    });
  });

  describe("wednesday", () => {
    it(`GIVEN a call to weekdayFormated
        WHEN value is "wednesday"
        THEN should return "Quarta-feira"`, () => {
      expect(weekdayFormated("wednesday")).toBe("Quarta-feira");
    });

    it(`GIVEN a call to weekdayFormated
        WHEN value is "3"
        THEN should return "Quarta-feira"`, () => {
      expect(weekdayFormated(3)).toBe("Quarta-feira");
    });

    it(`GIVEN a call to weekdayFormated
        WHEN value is date that is wednesday
        THEN should return "Quarta-feira"`, () => {
      expect(weekdayFormated(new Date(2024, 3, 10))).toBe("Quarta-feira");
    });
  });

  describe("thursday", () => {
    it(`GIVEN a call to weekdayFormated
        WHEN value is "thursday"
        THEN should return "Quinta-feira"`, () => {
      expect(weekdayFormated("thursday")).toBe("Quinta-feira");
    });

    it(`GIVEN a call to weekdayFormated
        WHEN value is "4"
        THEN should return "Quinta-feira"`, () => {
      expect(weekdayFormated(4)).toBe("Quinta-feira");
    });

    it(`GIVEN a call to weekdayFormated
        WHEN value is date that is thursday
        THEN should return "Quinta-feira"`, () => {
      expect(weekdayFormated(new Date(2024, 3, 11))).toBe("Quinta-feira");
    });
  });

  describe("friday", () => {
    it(`GIVEN a call to weekdayFormated
        WHEN value is "friday"
        THEN should return "Sexta-feira"`, () => {
      expect(weekdayFormated("friday")).toBe("Sexta-feira");
    });

    it(`GIVEN a call to weekdayFormated
        WHEN value is "5"
        THEN should return "Sexta-feira"`, () => {
      expect(weekdayFormated(5)).toBe("Sexta-feira");
    });

    it(`GIVEN a call to weekdayFormated
        WHEN value is date that is friday
        THEN should return "Sexta-feira"`, () => {
      expect(weekdayFormated(new Date(2024, 3, 12))).toBe("Sexta-feira");
    });
  });

  describe("saturday", () => {
    it(`GIVEN a call to weekdayFormated
        WHEN value is "saturday"
        THEN should return "Sábado"`, () => {
      expect(weekdayFormated("saturday")).toBe("Sábado");
    });

    it(`GIVEN a call to weekdayFormated
        WHEN value is "6"
        THEN should return "Sábado"`, () => {
      expect(weekdayFormated(6)).toBe("Sábado");
    });

    it(`GIVEN a call to weekdayFormated
        WHEN value is date that is saturday
        THEN should return "Sábado"`, () => {
      expect(weekdayFormated(new Date(2024, 3, 13))).toBe("Sábado");
    });
  });

  describe("sunday", () => {
    it(`GIVEN a call to weekdayFormated
        WHEN value is "sunday"
        THEN should return "Domingo"`, () => {
      expect(weekdayFormated("sunday")).toBe("Domingo");
    });

    it(`GIVEN a call to weekdayFormated
        WHEN value is "0"
        THEN should return "Domingo"`, () => {
      expect(weekdayFormated(0)).toBe("Domingo");
    });

    it(`GIVEN a call to weekdayFormated
        WHEN value is date that is sunday
        THEN should return "Domingo"`, () => {
      expect(weekdayFormated(new Date(2024, 3, 14))).toBe("Domingo");
    });
  });
});
