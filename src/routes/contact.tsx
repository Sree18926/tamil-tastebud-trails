import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Phone, MapPin, Clock, MessageCircle, Mail } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Location — Annapoorani Mess T. Nagar, Chennai" },
      { name: "description", content: "Visit Annapoorani Mess in T. Nagar, Chennai. Call +91 98765 43210 or order via WhatsApp. Open 6:30 AM – 10:30 PM, all days." },
      { property: "og:title", content: "Contact Annapoorani Mess" },
      { property: "og:description", content: "Find us, call us, or WhatsApp your order." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteLayout>
      <section className="relative py-20 md:py-24 bg-muted/40 overflow-hidden">
        <div className="absolute inset-0 kolam-pattern opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 md:px-8 text-center">
          <span className="font-script text-3xl text-primary">Get in touch</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold mt-2 text-balance">
            Drop by, call us, or order online.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            We're always ready to feed you. Pick whichever way is easiest.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-8">
          <div className="space-y-5">
            {[
              { icon: MapPin, title: "Visit our shop", body: "12, Gandhi Street, T. Nagar, Chennai – 600017", action: { label: "Get directions", href: "https://maps.google.com/?q=T+Nagar+Chennai" } },
              { icon: Phone, title: "Call to order", body: "+91 98765 43210", action: { label: "Tap to call", href: "tel:+919876543210" } },
              { icon: MessageCircle, title: "WhatsApp", body: "Send us your order any time", action: { label: "Open WhatsApp", href: "https://wa.me/919876543210" } },
              { icon: Clock, title: "Opening hours", body: "Every day · 6:30 AM – 10:30 PM" },
              { icon: Mail, title: "Email", body: "hello@annapoorani-mess.in", action: { label: "Send email", href: "mailto:hello@annapoorani-mess.in" } },
            ].map(({ icon: Icon, title, body, action }) => (
              <div key={title} className="p-6 rounded-2xl bg-card border border-border shadow-soft flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-primary/10 grid place-items-center shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-bold">{title}</h3>
                  <p className="text-muted-foreground mt-1">{body}</p>
                  {action && (
                    <a href={action.href} target="_blank" rel="noreferrer" className="inline-block mt-2 text-primary font-semibold text-sm hover:underline">
                      {action.label} →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-3xl overflow-hidden shadow-warm border border-border min-h-[420px]">
            <iframe
              title="Annapoorani Mess location"
              src="https://www.google.com/maps?q=T+Nagar+Chennai&output=embed"
              className="w-full h-full min-h-[420px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-foreground text-background text-center">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold">Order in 30 seconds on WhatsApp</h2>
          <p className="mt-3 text-background/80">No app downloads. No sign-ups. Just message us what you want.</p>
          <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-7 py-4 font-semibold shadow-warm">
            <MessageCircle className="w-5 h-5" /> Start chat
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}
