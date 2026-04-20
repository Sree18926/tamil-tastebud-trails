// Single source of truth for shop config — change once, updates everywhere.
export const SHOP = {
  name: "Annapoorani Mess",
  whatsappNumber: "919876543210", // international format, no + or spaces
  phoneDisplay: "+91 98765 43210",
  phoneTel: "+919876543210",
  address: "12, Gandhi Street, T. Nagar, Chennai – 600017",
  email: "hello@annapoorani-mess.in",
  hours: "6:30 AM – 10:30 PM",
};

export const buildWhatsAppLink = (text: string) =>
  `https://wa.me/${SHOP.whatsappNumber}?text=${encodeURIComponent(text)}`;
