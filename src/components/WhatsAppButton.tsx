import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/shop";

export function WhatsAppButton() {
  return (
    <a
      href={buildWhatsAppLink("Vanakkam! I would like to place an order.")}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-5 py-3 text-sm font-semibold shadow-warm hover:scale-105 transition-transform"
      aria-label="Order on WhatsApp"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
