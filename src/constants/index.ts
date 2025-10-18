const PHONE_NUMBER = "+34 345 67 89 04";
const EMAIL_ADDRESS = "info@elcaminodelavida.es";

const TIK_TOK_URL = "https://www.tiktok.com/@elcaminodelavida";
const FACEBOOK_URL = "https://facebook.com/elcaminodelavida";
const INSTAGRAM_URL = "https://instagram.com/elcaminodelavida";

// Extraer solo los dígitos del número de teléfono para WhatsApp
const WHATSAPP_NUMBER = PHONE_NUMBER.replace(/\D/g, "");
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export {
  PHONE_NUMBER,
  EMAIL_ADDRESS,
  TIK_TOK_URL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  WHATSAPP_URL,
};
