import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import heroImg from "@/assets/hero-meal.jpg";
import dosaImg from "@/assets/dosa.jpg";
import idliImg from "@/assets/idli.jpg";
import parottaImg from "@/assets/parotta.jpg";
import pongalImg from "@/assets/pongal.jpg";
import { ArrowRight, Star, Leaf, Heart, Award, Utensils, Clock, IndianRupee } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Annapoorani Mess — Best Local Tamil Food & Homely Meals Near You" },
      { name: "description", content: "Authentic Tamil tiffin and homely meals in Chennai. Idli, dosa, parotta, full meals served fresh on banana leaf. Order now or visit us." },
      { property: "og:title", content: "Annapoorani Mess — Authentic Tamil Tiffin Center" },
      { property: "og:description", content: "Taste tradition. Homely Tamil meals cooked with love since 1998. Best local food and Tamil mess near you." },
      { property: "og:image", content: heroImg },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: heroImg },
    ],
  }),
  component: HomePage,
});

const todaysSpecials = [
  { name: "Masala Dosa", img: dosaImg, price: "₹70", tag: "Crispy & Golden" },
  { name: "Soft Idli (3 pcs)", img: idliImg, price: "₹40", tag: "Steam Fresh" },
  { name: "Parotta + Salna", img: parottaImg, price: "₹90", tag: "Chef's Pick" },
  { name: "Ven Pongal", img: pongalImg, price: "₹60", tag: "Morning Comfort" },
];

const reviews = [
  { name: "Karthik R.", text: "Tastes exactly like my paatti's cooking. The sambar is unbeatable!", rating: 5 },
  { name: "Priya S.", text: "Cleanest mess in the area. Served hot on banana leaf. Worth every rupee.", rating: 5 },
  { name: "Arun M.", text: "Best parotta and salna in T. Nagar. I'm here every weekend.", rating: 5 },
];

function HomePage() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        <img
          src={heroImg}
          alt="Traditional South Indian Tamil meal on banana leaf with sambar, rasam, chutney and rice"
          width={1920}
          height={1280}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ backgroundImage: "var(--gradient-hero)" }} />
        <div className="absolute inset-0 kolam-pattern opacity-40 mix-blend-overlay" />

        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-24 text-background animate-float-up">
          <span className="inline-block font-script text-3xl md:text-4xl text-secondary">Vanakkam!</span>
          <h1 className="mt-2 font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] max-w-4xl text-balance">
            Taste of Tamil Nadu, <span className="text-secondary">Served with Love.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-2xl text-background/90 leading-relaxed">
            Homely meals. Traditional recipes. Pocket-friendly prices. Cooked fresh every single day in our family kitchen since 1998.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-4 text-base font-semibold shadow-warm hover:scale-[1.02] transition"
            >
              Order Now <ArrowRight className="w-5 h-5" />
            </a>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 rounded-full bg-background/10 backdrop-blur border border-background/30 text-background px-7 py-4 text-base font-semibold hover:bg-background/20 transition"
            >
              View Menu
            </Link>
          </div>

          <div className="mt-14 flex flex-wrap gap-8 text-sm">
            {[
              { icon: Star, label: "4.8 / 5 · 2,300+ reviews" },
              { icon: Leaf, label: "Served on banana leaf" },
              { icon: Clock, label: "Open 6:30 AM – 10:30 PM" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-background/90">
                <Icon className="w-4 h-4 text-secondary" /> {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="py-20 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-3 gap-8">
          {[
            { icon: Heart, title: "Homely Cooking", text: "Recipes passed down three generations. Every dish made the way amma makes it." },
            { icon: Leaf, title: "Fresh & Hygienic", text: "Sourced daily from local markets. Spotless kitchen. No leftovers, ever." },
            { icon: IndianRupee, title: "Affordable Prices", text: "Full unlimited meals from just ₹80. Quality food shouldn't be a luxury." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="p-8 rounded-2xl bg-card border border-border shadow-soft hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-xl bg-primary/10 grid place-items-center mb-5">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">{title}</h3>
              <p className="text-muted-foreground leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TODAY'S SPECIALS */}
      <section className="py-20 md:py-28 bg-muted/40">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
            <div>
              <span className="font-script text-2xl text-primary">Today's Special</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-1">Fresh from our kitchen</h2>
            </div>
            <Link to="/menu" className="text-primary font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all">
              See full menu <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {todaysSpecials.map((d) => (
              <article key={d.name} className="group rounded-2xl overflow-hidden bg-card border border-border shadow-soft hover:shadow-warm transition-shadow">
                <div className="aspect-square overflow-hidden">
                  <img src={d.img} alt={d.name} loading="lazy" width={1024} height={1024} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <span className="text-xs uppercase tracking-wider text-accent font-semibold">{d.tag}</span>
                  <div className="flex items-center justify-between mt-1">
                    <h3 className="font-display text-xl font-bold">{d.name}</h3>
                    <span className="text-primary font-bold">{d.price}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <span className="font-script text-2xl text-primary">Loved by locals</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-1 mb-14">What our regulars say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div key={r.name} className="p-8 rounded-2xl bg-card border border-border text-left shadow-soft">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-foreground/90 leading-relaxed mb-5">"{r.text}"</p>
                <div className="font-semibold text-primary">— {r.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="relative py-20 bg-foreground text-background overflow-hidden">
        <div className="absolute inset-0 kolam-pattern opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 md:px-8 text-center">
          <Award className="w-10 h-10 text-secondary mx-auto mb-4" />
          <h2 className="font-display text-4xl md:text-5xl font-bold text-balance">
            Hungry? Your Tamil meal is just a tap away.
          </h2>
          <p className="mt-4 text-background/80 max-w-xl mx-auto">
            Order via WhatsApp, call us, or walk into our T. Nagar shop. We'll make it feel like home.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="rounded-full bg-accent text-accent-foreground px-6 py-3 font-semibold shadow-warm">WhatsApp Order</a>
            <Link to="/contact" className="rounded-full bg-background text-foreground px-6 py-3 font-semibold inline-flex items-center gap-2">
              <Utensils className="w-4 h-4" /> Visit Us
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
