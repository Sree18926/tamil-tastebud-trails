import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import shopImg from "@/assets/shop.jpg";
import { Heart, Leaf, Sparkles, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Annapoorani Mess | Family-Run Tamil Tiffin Center" },
      { name: "description", content: "Three generations of homely Tamil cooking. Discover the story behind Annapoorani Mess — fresh ingredients, traditional recipes, family hospitality." },
      { property: "og:title", content: "Our Story — Annapoorani Mess" },
      { property: "og:description", content: "A family-run Tamil tiffin center since 1998. Fresh, hygienic, authentic." },
      { property: "og:image", content: shopImg },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="relative py-20 md:py-28 bg-muted/40 overflow-hidden">
        <div className="absolute inset-0 kolam-pattern opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 md:px-8 text-center">
          <span className="font-script text-3xl text-primary">Our Story</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold mt-2 text-balance">
            A family kitchen that became a neighborhood favorite.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            What began in 1998 as Annapoorani Amma serving meals to neighborhood students from her own kitchen has grown into one of T. Nagar's most-loved tiffin centers — without ever losing the soul of homely cooking.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-3xl overflow-hidden shadow-warm">
            <img src={shopImg} alt="Inside Annapoorani Mess kitchen" loading="lazy" width={1920} height={1080} className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-5">Three generations. One recipe book.</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Every sambar we ladle, every dosa we crisp, every payasam we sweeten follows the same handwritten recipes Annapoorani Amma started with. Her daughter Lakshmi runs the kitchen today; her grandson Karthik manages the shop.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We grind our own masalas every morning. We source vegetables from Koyambedu market at dawn. We never reuse oil. And we still serve every meal on a fresh banana leaf — because some traditions are worth preserving.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-muted/40">
        <div className="max-w-6xl mx-auto px-4 md:px-8 grid md:grid-cols-4 gap-6">
          {[
            { icon: Heart, label: "27 Years", sub: "Serving the community" },
            { icon: Users, label: "500+", sub: "Daily happy guests" },
            { icon: Leaf, label: "100%", sub: "Fresh, daily-sourced" },
            { icon: Sparkles, label: "0", sub: "Compromises on quality" },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="p-8 rounded-2xl bg-card border border-border text-center shadow-soft">
              <Icon className="w-7 h-7 text-primary mx-auto mb-3" />
              <div className="font-display text-3xl font-bold text-primary">{label}</div>
              <div className="text-sm text-muted-foreground mt-1">{sub}</div>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
