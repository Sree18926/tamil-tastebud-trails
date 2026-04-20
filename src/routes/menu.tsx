import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import dosaImg from "@/assets/dosa.jpg";
import idliImg from "@/assets/idli.jpg";
import parottaImg from "@/assets/parotta.jpg";
import pongalImg from "@/assets/pongal.jpg";
import heroImg from "@/assets/hero-meal.jpg";
import { Sun, Soup, Moon } from "lucide-react";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Idli, Dosa, Meals, Parotta | Annapoorani Mess" },
      { name: "description", content: "Browse our full menu of authentic Tamil breakfast, lunch and dinner. Idli, dosa, vada, full meals on banana leaf, parotta, biryani — all freshly cooked." },
      { property: "og:title", content: "Our Menu — Annapoorani Mess" },
      { property: "og:description", content: "Authentic Tamil breakfast, lunch and dinner served fresh." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: MenuPage,
});

type Item = { name: string; tamil?: string; price: string; desc: string; img?: string; veg?: boolean };
type Category = { id: string; title: string; time: string; icon: typeof Sun; items: Item[] };

const menu: Category[] = [
  {
    id: "breakfast",
    title: "Breakfast",
    time: "6:30 AM – 11:00 AM",
    icon: Sun,
    items: [
      { name: "Idli (3 pcs)", tamil: "இட்லி", price: "₹40", desc: "Soft, steam-fluffy rice cakes with chutney & sambar", img: idliImg, veg: true },
      { name: "Masala Dosa", tamil: "மசாலா தோசை", price: "₹70", desc: "Crispy golden crepe stuffed with potato masala", img: dosaImg, veg: true },
      { name: "Ven Pongal", tamil: "வெண் பொங்கல்", price: "₹60", desc: "Creamy rice & moong dal tempered with ghee, pepper, cashew", img: pongalImg, veg: true },
      { name: "Medu Vada (2 pcs)", tamil: "வடை", price: "₹35", desc: "Crispy lentil donuts with coconut chutney", veg: true },
      { name: "Pesarattu", tamil: "பெசரட்டு", price: "₹65", desc: "Green gram dosa with ginger chutney", veg: true },
      { name: "Filter Coffee", tamil: "டிகிரி காபி", price: "₹25", desc: "Decoction brewed strong, served in tumbler-davara", veg: true },
    ],
  },
  {
    id: "lunch",
    title: "Lunch",
    time: "12:00 PM – 3:30 PM",
    icon: Soup,
    items: [
      { name: "Full Meals (Unlimited)", tamil: "சாப்பாடு", price: "₹120", desc: "Rice, sambar, rasam, 2 poriyal, kootu, appalam, curd, payasam — on banana leaf", img: heroImg, veg: true },
      { name: "Mini Meals", tamil: "மினி மீல்ஸ்", price: "₹80", desc: "Limited portion thali with all the essentials", veg: true },
      { name: "Curd Rice", tamil: "தயிர் சாதம்", price: "₹50", desc: "Tempered curd rice with pomegranate & curry leaves", veg: true },
      { name: "Lemon Rice", tamil: "எலுமிச்சை சாதம்", price: "₹55", desc: "Tangy turmeric rice with peanuts", veg: true },
      { name: "Sambar Rice", tamil: "சாம்பார் சாதம்", price: "₹60", desc: "Comforting bowl with ghee and appalam", veg: true },
    ],
  },
  {
    id: "dinner",
    title: "Dinner",
    time: "6:30 PM – 10:30 PM",
    icon: Moon,
    items: [
      { name: "Parotta + Salna", tamil: "பரோட்டா", price: "₹90", desc: "Flaky layered parotta with spicy Chettinad gravy", img: parottaImg },
      { name: "Chicken Biryani", tamil: "பிரியாணி", price: "₹180", desc: "Seeraga samba rice biryani, slow-cooked dum style" },
      { name: "Kothu Parotta", tamil: "கொத்து பரோட்டா", price: "₹130", desc: "Shredded parotta tossed with egg, onion & masala" },
      { name: "Idiyappam (4 pcs)", tamil: "இடியாப்பம்", price: "₹70", desc: "Steamed string hoppers with coconut milk or kurma", veg: true },
      { name: "Chapathi + Kurma (2 pcs)", price: "₹70", desc: "Soft chapathis with vegetable kurma", veg: true },
    ],
  },
];

function MenuPage() {
  return (
    <SiteLayout>
      <section className="relative py-20 md:py-24 bg-muted/40 overflow-hidden">
        <div className="absolute inset-0 kolam-pattern opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 md:px-8 text-center">
          <span className="font-script text-3xl text-primary">Our Menu</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold mt-2 text-balance">
            Cooked fresh. Served hot. Always homely.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Prices are inclusive. All meals served with complimentary chutneys, sambar, and warm Tamil hospitality.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {menu.map((c) => (
              <a key={c.id} href={`#${c.id}`} className="px-4 py-2 rounded-full bg-card border border-border text-sm font-semibold hover:border-primary hover:text-primary transition">
                {c.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {menu.map((cat) => {
        const Icon = cat.icon;
        return (
          <section key={cat.id} id={cat.id} className="py-16 md:py-20 bg-background scroll-mt-24">
            <div className="max-w-6xl mx-auto px-4 md:px-8">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 grid place-items-center">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold">{cat.title}</h2>
                  <p className="text-sm text-muted-foreground">Served {cat.time}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                {cat.items.map((item) => (
                  <article key={item.name} className="group flex gap-4 p-4 rounded-2xl bg-card border border-border hover:shadow-soft transition">
                    {item.img && (
                      <div className="w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden shrink-0">
                        <img src={item.img} alt={item.name} loading="lazy" width={400} height={400} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-display text-lg font-bold leading-tight">
                            {item.name}
                            {item.veg !== false && <span className="inline-block ml-2 w-3 h-3 border-2 border-leaf rounded-sm align-middle"><span className="block w-1.5 h-1.5 m-[1px] bg-leaf rounded-full" /></span>}
                          </h3>
                          {item.tamil && <div className="text-xs text-muted-foreground mt-0.5">{item.tamil}</div>}
                        </div>
                        <span className="font-bold text-primary whitespace-nowrap">{item.price}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{item.desc}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </SiteLayout>
  );
}
