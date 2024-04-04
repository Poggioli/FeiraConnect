import { UseExhibitorCardPropsProps } from "./types";
import parsePhoneNumber, { PhoneNumber } from "libphonenumber-js";

export function useExhibitorCard({
  name,
  phone,
  whatsApp,
  website,
}: UseExhibitorCardPropsProps) {
  const formatedName = name.charAt(0).toUpperCase() + name.slice(1);
  const hasWebsite = !!website;

  const phoneNumber = parsePhoneNumber(phone, "BR") as PhoneNumber;
  const telephone = {
    formatedNumber: `${phoneNumber.formatNational()}`,
    link: `tel:${phoneNumber.formatInternational()}`,
    "aria-label": `Número de telefone de ${formatedName}`,
  };

  const hasWhatsApp = !!whatsApp;
  const wpp = parsePhoneNumber(whatsApp || "", "BR");
  const whatsAppLink = encodeURI(
    `https://wa.me/${wpp?.countryCallingCode}${wpp?.nationalNumber}?text=Olá ${formatedName}, encontrei seu número através do feira-connect.`
  );
  const whatsAppNumber = {
    formatedNumber: `${wpp?.formatNational()}`,
    link: whatsAppLink,
    "aria-label": `Enviar mensagem pelo whatsApp para ${formatedName}`,
  };

  return {
    formatedName,
    telephone,
    whatsAppNumber,
    hasWhatsApp,
    hasWebsite,
  };
}
