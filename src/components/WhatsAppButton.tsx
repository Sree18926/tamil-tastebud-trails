import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919876543210?text=Vanakkam!%20I%20would%20like%20to%20place%20an%20order."
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-5 py-3 text-sm font-semibold shadow-warm hover:scale-105 transition-transform"
      aria-label="Order on WhatsApp"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="hidden sm:inline">Order on WhatsApp</span>
    </a>
  );
}
