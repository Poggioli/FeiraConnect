import { customRenderHook } from "@tests/customRenderHook";
import { UseExhibitorCardPropsProps } from "./types";
import { useExhibitorCard } from "./useExhibitorCard";

describe("@/components/useExhibitorCard", () => {
  const defaultProps: UseExhibitorCardPropsProps = {
    name: "exhibitor name",
    phone: "11912345678",
    whatsApp: "11912345679",
    website: "https://exhibitor-name.com.br",
  };

  it(`GIVEN a name
      WHEN call useExhibitorCard
      THEN should put the first letter capitalized`, () => {
    const { result } = customRenderHook(() => useExhibitorCard(defaultProps));
    expect(result.current.formatedName).toBe("Exhibitor name");
  });

  describe("hasWebsite", () => {
    it(`GIVEN a website defined
        WHEN call useExhibitorCard
        THEN should return hasWebsite as true`, () => {
      const { result } = customRenderHook(() => useExhibitorCard(defaultProps));
      expect(result.current.hasWebsite).toBe(true);
    });

    it(`GIVEN a website as falsy value
        WHEN call useExhibitorCard
        THEN should return hasWebsite as false`, () => {
      const { result } = customRenderHook(() =>
        useExhibitorCard({ ...defaultProps, website: undefined })
      );
      expect(result.current.hasWebsite).toBe(false);
    });
  });

  describe("telephone", () => {
    it(`GIVEN a telephone defined
        WHEN call useExhibitorCard
        THEN should return formatedNumber`, () => {
      const { result } = customRenderHook(() => useExhibitorCard(defaultProps));
      expect(result.current.telephone.formatedNumber).toBe("(11) 91234-5678");
    });

    it(`GIVEN a telephone defined
        WHEN call useExhibitorCard
        THEN should return link`, () => {
      const { result } = customRenderHook(() => useExhibitorCard(defaultProps));
      expect(result.current.telephone.link).toBe("tel:+55 11 91234 5678");
    });

    it(`GIVEN a telephone defined
        WHEN call useExhibitorCard
        THEN should return aria-label`, () => {
      const { result } = customRenderHook(() => useExhibitorCard(defaultProps));
      expect(result.current.telephone["aria-label"]).toBe("Número de telefone de Exhibitor name");
    });
  });

  describe("hasWhatsApp", () => {
    it(`GIVEN a website defined
        WHEN call useExhibitorCard
        THEN should return hasWhatsApp as true`, () => {
      const { result } = customRenderHook(() => useExhibitorCard(defaultProps));
      expect(result.current.hasWhatsApp).toBe(true);
    });

    it(`GIVEN a website as falsy value
        WHEN call useExhibitorCard
        THEN should return hasWhatsApp as false`, () => {
      const { result } = customRenderHook(() =>
        useExhibitorCard({ ...defaultProps, whatsApp: undefined })
      );
      expect(result.current.hasWhatsApp).toBe(false);
    });
  });

  describe("whatsAppNumber", () => {
    it(`GIVEN a whatsAppNumber defined
        WHEN call useExhibitorCard
        THEN should return formatedNumber`, () => {
      const { result } = customRenderHook(() => useExhibitorCard(defaultProps));
      expect(result.current.whatsAppNumber.formatedNumber).toBe("(11) 91234-5679");
    });

    it(`GIVEN a whatsAppNumber defined
        WHEN call useExhibitorCard
        THEN should return link`, () => {
      const { result } = customRenderHook(() => useExhibitorCard(defaultProps));
      expect(result.current.whatsAppNumber.link).toBe("https://wa.me/5511912345679?text=Ol%C3%A1%20Exhibitor%20name,%20encontrei%20seu%20n%C3%BAmero%20atrav%C3%A9s%20do%20feira-connect.");
    });

    it(`GIVEN a whatsAppNumber defined
        WHEN call useExhibitorCard
        THEN should return aria-label`, () => {
      const { result } = customRenderHook(() => useExhibitorCard(defaultProps));
      expect(result.current.whatsAppNumber["aria-label"]).toBe("Enviar mensagem pelo whatsApp para Exhibitor name");
    });
  });
});
