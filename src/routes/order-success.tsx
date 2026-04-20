import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { CheckCircle2, MessageCircle, Phone } from "lucide-react";
import { z } from "zod";
import { buildWhatsAppLink, SHOP } from "@/lib/shop";

export const Route = createFileRoute("/order-success")({
  validateSearch: z.object({ id: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Order placed — Annapoorani Mess" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SuccessPage,
});

function SuccessPage() {
  const { id } = Route.useSearch();
  return (
    <SiteLayout>
      <section className="min-h-[70vh] grid place-items-center px-4 py-20">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-accent/15 grid place-items-center mb-6">
            <CheckCircle2 className="w-10 h-10 text-accent" />
          </div>
          <span className="font-script text-2xl text-primary">Nandri!</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-1">Order received</h1>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            We've saved your order and opened WhatsApp so you can confirm it with us. If WhatsApp didn't open, tap the button below.
          </p>
          {id && <p className="text-xs text-muted-foreground mt-3">Reference: <span className="font-mono">{id.slice(0, 8)}</span></p>}

          <div className="mt-8 flex flex-col gap-3">
            <a href={buildWhatsAppLink(id ? `Hi, I just placed an order. Reference: ${id.slice(0, 8)}` : "Hi, I just placed an order.")} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-accent-foreground px-6 py-3 font-semibold shadow-warm">
              <MessageCircle className="w-5 h-5" /> Open WhatsApp
            </a>
            <a href={`tel:${SHOP.phoneTel}`} className="inline-flex items-center justify-center gap-2 rounded-full bg-card border border-border px-6 py-3 font-semibold">
              <Phone className="w-4 h-4" /> Or call us
            </a>
            <Link to="/menu" className="text-sm text-muted-foreground hover:text-primary mt-2">
              ← Back to menu
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
