import { Link } from "@tanstack/react-router";
import { Phone, MapPin, Clock, Instagram, Facebook, Shield } from "lucide-react";
import { SHOP } from "@/lib/shop";

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background mt-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-warm grid place-items-center text-primary-foreground font-display text-xl font-bold">
              அ
            </div>
            <div className="font-display text-lg font-bold">{SHOP.name}</div>
          </div>
          <p className="text-sm text-background/70 leading-relaxed">
            Homely Tamil meals cooked with love since 1998. Best local food and authentic tiffin near you.
          </p>
        </div>

        <div>
          <h4 className="font-display text-base mb-3 text-secondary">Explore</h4>
          <ul className="space-y-2 text-sm text-background/80">
            <li><Link to="/menu" className="hover:text-secondary">Menu</Link></li>
            <li><Link to="/about" className="hover:text-secondary">Our Story</Link></li>
            <li><Link to="/contact" className="hover:text-secondary">Contact</Link></li>
            <li><Link to="/admin/login" className="hover:text-secondary inline-flex items-center gap-1"><Shield className="w-3 h-3" /> Staff login</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-base mb-3 text-secondary">Visit Us</h4>
          <ul className="space-y-2 text-sm text-background/80">
            <li className="flex gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0 text-secondary" /> {SHOP.address}</li>
            <li className="flex gap-2"><Phone className="w-4 h-4 mt-0.5 shrink-0 text-secondary" /> {SHOP.phoneDisplay}</li>
            <li className="flex gap-2"><Clock className="w-4 h-4 mt-0.5 shrink-0 text-secondary" /> {SHOP.hours}</li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-base mb-3 text-secondary">Follow</h4>
          <div className="flex gap-3">
            <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-background/10 grid place-items-center hover:bg-primary transition"><Instagram className="w-4 h-4" /></a>
            <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-background/10 grid place-items-center hover:bg-primary transition"><Facebook className="w-4 h-4" /></a>
          </div>
          <p className="text-xs text-background/50 mt-6">Tamil mess near me · Best local food · Homely meals Chennai</p>
        </div>
      </div>
      <div className="border-t border-background/10 py-5 text-center text-xs text-background/60">
        © {new Date().getFullYear()} {SHOP.name} · Made with love in Tamil Nadu
      </div>
    </footer>
  );
}
