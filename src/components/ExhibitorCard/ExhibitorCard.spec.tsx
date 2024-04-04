import { render } from "@testing-library/react";
import { ExhibitorCard, ExhibitorCardSkeleton } from "./ExhibitorCard";
import { ExhibitorCardProps } from "./types";

describe("@/components/ExhibitorCard", () => {
  const defaultProps: ExhibitorCardProps = {
    id: "id-exhibitor-name",
    slug: "exhibitor-name",
    items: ["item 1", "item 2", "item 3"],
    description: "description",
    name: "exhibitor name",
    phone: "11912345678",
    whatsApp: "11912345679",
    website: "https://exhibitor-name.com.br",
  };

  it(`GIVEN a ExhibitorCard
      WHEN render
      THEN should show the formatedName`, () => {
    const { getByText } = render(<ExhibitorCard {...defaultProps} />);
    const formatedName = getByText("Exhibitor name");
    expect(formatedName).toBeVisible();
  });

  describe("description", () => {
    it(`GIVEN a ExhibitorCard
        WHEN description is truthy value
        THEN should show the description value`, () => {
      const { getByText } = render(<ExhibitorCard {...defaultProps} />);
      const description = getByText("description");
      expect(description).toBeVisible();
    });

    it(`GIVEN a ExhibitorCard
        WHEN description is falsy value
        THEN should NOT show the description value`, () => {
      const { baseElement } = render(<ExhibitorCard {...defaultProps} description={undefined} />);
      expect(baseElement).toMatchSnapshot();
    });
  });

  it(`GIVEN a ExhibitorCard
      WHEN render
      THEN should show the items value`, () => {
    const { getByText } = render(<ExhibitorCard {...defaultProps} />);
    const item1 = getByText("item 1");
    const item2 = getByText("item 2");
    const item3 = getByText("item 3");
    expect(item1).toBeVisible();
    expect(item2).toBeVisible();
    expect(item3).toBeVisible();
  });

  describe("telephone", () => {
    it(`GIVEN a ExhibitorCard
        WHEN render
        THEN should show the anchor tag with href to tel`, () => {
      const { getByLabelText } = render(<ExhibitorCard {...defaultProps} />);
      const anchorTag = getByLabelText("Número de telefone de Exhibitor name");
      expect(anchorTag).toHaveAttribute("href", "tel:+55 11 91234 5678");
    });

    it(`GIVEN a ExhibitorCard
        WHEN render
        THEN should show the anchor tag with aria-label`, () => {
      const { getByLabelText } = render(<ExhibitorCard {...defaultProps} />);
      const ariaLabel = getByLabelText("Número de telefone de Exhibitor name");
      expect(ariaLabel).toBeVisible();
    });

    it(`GIVEN a ExhibitorCard
        WHEN render
        THEN should show the formated number`, () => {
      const { getByText } = render(<ExhibitorCard {...defaultProps} />);
      const formatedNumber = getByText("(11) 91234-5678");
      expect(formatedNumber).toBeVisible();
    });
  });

  describe("whatsAppNumber", () => {
    it(`GIVEN a ExhibitorCard
        WHEN render
        THEN should show the anchor tag with href to tel`, () => {
      const { getByLabelText } = render(<ExhibitorCard {...defaultProps} />);
      const anchorTag = getByLabelText("Enviar mensagem pelo whatsApp para Exhibitor name");
      expect(anchorTag).toHaveAttribute("href", "https://wa.me/5511912345679?text=Ol%C3%A1%20Exhibitor%20name,%20encontrei%20seu%20n%C3%BAmero%20atrav%C3%A9s%20do%20feira-connect.");
    });

    it(`GIVEN a ExhibitorCard
        WHEN render
        THEN should show the anchor tag with aria-label`, () => {
      const { getByLabelText } = render(<ExhibitorCard {...defaultProps} />);
      const ariaLabel = getByLabelText("Enviar mensagem pelo whatsApp para Exhibitor name");
      expect(ariaLabel).toBeVisible();
    });

    it(`GIVEN a ExhibitorCard
        WHEN render
        THEN should show the formated number`, () => {
      const { getByText } = render(<ExhibitorCard {...defaultProps} />);
      const formatedNumber = getByText("(11) 91234-5679");
      expect(formatedNumber).toBeVisible();
    });

    it(`GIVEN a ExhibitorCard
        WHEN whatsApp number is falsy
        THEN should NOT show the whatsApp tag`, () => {
      const { queryByText } = render(<ExhibitorCard {...defaultProps} whatsApp={undefined} />);
      const formatedNumber = queryByText("(11) 91234-5679");
      expect(formatedNumber).not.toBeInTheDocument();
    });
  });

  describe("website", () => {
    it(`GIVEN a ExhibitorCard
        WHEN render
        THEN should show the site tag`, () => {
      const { getByText } = render(<ExhibitorCard {...defaultProps} />);
      const tag = getByText("Site");
      expect(tag).toBeVisible();
    });

    it(`GIVEN a ExhibitorCard
        WHEN website is falsy
        THEN should NOT show the site tag`, () => {
      const { queryByText } = render(<ExhibitorCard {...defaultProps} website={undefined} />);
      const tag = queryByText("Site");
      expect(tag).not.toBeInTheDocument();
    });
  });

  it(`GIVEN a ExhibitorCardSkeleton
      WHEN render
      then should everything rigth`, () => {
    const { baseElement } = render(<ExhibitorCardSkeleton />);
    expect(baseElement).toMatchSnapshot();
  })
});