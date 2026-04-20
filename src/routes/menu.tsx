import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Sun, Soup, Moon, Plus, Minus } from "lucide-react";
import heroImg from "@/assets/hero-meal.jpg";
import { CATEGORIES, MENU_ITEMS } from "@/lib/menu-data";
import { useCart } from "@/lib/cart-store";

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

const ICONS = { breakfast: Sun, lunch: Soup, dinner: Moon } as const;

function MenuPage() {
  const items = useCart((s) => s.items);
  const add = useCart((s) => s.add);
  const remove = useCart((s) => s.remove);

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
            Tap <span className="font-semibold text-primary">+</span> to add items to your order. Checkout sends it straight to us on WhatsApp.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((c) => (
              <a key={c.id} href={`#${c.id}`} className="px-4 py-2 rounded-full bg-card border border-border text-sm font-semibold hover:border-primary hover:text-primary transition">
                {c.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {CATEGORIES.map((cat) => {
        const Icon = ICONS[cat.id];
        const catItems = MENU_ITEMS.filter((i) => i.category === cat.id);
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
                {catItems.map((item) => {
                  const qty = items[item.id] ?? 0;
                  return (
                    <article key={item.id} className="group flex gap-4 p-4 rounded-2xl bg-card border border-border hover:shadow-soft transition">
                      {item.img ? (
                        <div className="w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden shrink-0">
                          <img src={item.img} alt={item.name} loading="lazy" width={400} height={400} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        </div>
                      ) : (
                        <div className="w-24 h-24 md:w-28 md:h-28 rounded-xl bg-gradient-warm shrink-0 grid place-items-center text-primary-foreground font-display text-3xl">
                          {item.name.charAt(0)}
                        </div>
                      )}
                      <div className="flex-1 min-w-0 flex flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <h3 className="font-display text-lg font-bold leading-tight flex items-center gap-2">
                              {item.name}
                              <span aria-label={item.veg ? "veg" : "non-veg"} className={`inline-block w-3 h-3 border-2 rounded-sm ${item.veg ? "border-leaf" : "border-spice"}`}>
                                <span className={`block w-1.5 h-1.5 m-[1px] rounded-full ${item.veg ? "bg-leaf" : "bg-spice"}`} />
                              </span>
                            </h3>
                            {item.tamil && <div className="text-xs text-muted-foreground mt-0.5">{item.tamil}</div>}
                          </div>
                          <span className="font-bold text-primary whitespace-nowrap">₹{item.price}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed flex-1">{item.desc}</p>
                        <div className="mt-3">
                          {qty === 0 ? (
                            <button
                              onClick={() => add(item.id)}
                              className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-4 py-1.5 text-sm font-semibold shadow-soft hover:opacity-90 transition"
                            >
                              <Plus className="w-3.5 h-3.5" /> Add
                            </button>
                          ) : (
                            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/30 px-1.5 py-1">
                              <button onClick={() => remove(item.id)} className="w-7 h-7 rounded-full bg-background grid place-items-center hover:bg-primary/20 transition" aria-label="Remove one">
                                <Minus className="w-3.5 h-3.5 text-primary" />
                              </button>
                              <span className="font-bold text-primary w-5 text-center text-sm">{qty}</span>
                              <button onClick={() => add(item.id)} className="w-7 h-7 rounded-full bg-background grid place-items-center hover:bg-primary/20 transition" aria-label="Add one">
                                <Plus className="w-3.5 h-3.5 text-primary" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}
    </SiteLayout>
  );
}
