import { Link } from "@tanstack/react-router";
import { Phone, Menu as MenuIcon, X } from "lucide-react";
import { useState } from "react";
import { CartDrawer } from "./CartDrawer";
import { SHOP } from "@/lib/shop";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/85 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2 group min-w-0">
          <div className="w-10 h-10 rounded-full bg-gradient-warm grid place-items-center shadow-warm text-primary-foreground font-display text-xl font-bold shrink-0">
            அ
          </div>
          <div className="leading-tight min-w-0">
            <div className="font-display text-base md:text-xl font-bold text-foreground truncate">{SHOP.name}</div>
            <div className="text-[10px] md:text-xs text-muted-foreground tracking-widest uppercase truncate">Authentic Tamil Tiffin</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              activeProps={{ className: "text-primary font-semibold" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
          <CartDrawer />
          <a
            href={`tel:${SHOP.phoneTel}`}
            className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold shadow-warm hover:opacity-95 transition"
          >
            <Phone className="w-4 h-4" /> Call
          </a>
        </nav>

        <div className="md:hidden flex items-center gap-2">
          <CartDrawer />
          <button
            className="p-2 rounded-md text-foreground"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-4 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-base font-medium py-2"
                activeProps={{ className: "text-primary font-semibold" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            <a
              href={`tel:${SHOP.phoneTel}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3 text-sm font-semibold shadow-warm"
            >
              <Phone className="w-4 h-4" /> Call to Order
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
