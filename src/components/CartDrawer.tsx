import { useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { useCart } from "@/lib/cart-store";
import { ShoppingBag, Plus, Minus, X, ArrowRight } from "lucide-react";
import { findItem } from "@/lib/menu-data";

export function CartDrawer() {
  const [open, setOpen] = useState(false);
  const items = useCart((s) => s.items);
  const count = useCart((s) => Object.values(s.items).reduce((a, b) => a + b, 0));
  const total = useCart((s) =>
    Object.entries(s.items).reduce((sum, [id, qty]) => {
      const m = findItem(id);
      return sum + (m ? m.price * qty : 0);
    }, 0),
  );
  const add = useCart((s) => s.add);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);
  const router = useRouter();

  const detailed = Object.entries(items)
    .map(([id, qty]) => ({ item: findItem(id), qty }))
    .filter((x): x is { item: NonNullable<ReturnType<typeof findItem>>; qty: number } => !!x.item);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative inline-flex items-center gap-2 rounded-full bg-secondary text-secondary-foreground px-4 py-2 text-sm font-semibold shadow-soft hover:opacity-90 transition"
        aria-label={`Cart (${count} items)`}
      >
        <ShoppingBag className="w-4 h-4" />
        <span className="hidden sm:inline">Cart</span>
        {count > 0 && (
          <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold grid place-items-center shadow-warm">
            {count}
          </span>
        )}
      </button>

      {open && (
        <div className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-background shadow-warm flex flex-col animate-float-up">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h2 className="font-display text-xl font-bold">Your Order</h2>
              <button onClick={() => setOpen(false)} className="p-1 rounded-md hover:bg-muted" aria-label="Close cart">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {detailed.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground">
                  <ShoppingBag className="w-10 h-10 mx-auto mb-3 opacity-40" />
                  Your cart is empty.
                  <div className="mt-4">
                    <Link
                      to="/menu"
                      onClick={() => setOpen(false)}
                      className="text-primary font-semibold hover:underline"
                    >
                      Browse menu →
                    </Link>
                  </div>
                </div>
              ) : (
                detailed.map(({ item, qty }) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm leading-tight truncate">{item.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">₹{item.price} each</div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => remove(item.id)} className="w-8 h-8 rounded-full bg-muted grid place-items-center hover:bg-primary/10 transition" aria-label="Remove one">
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-7 text-center font-semibold text-sm">{qty}</span>
                      <button onClick={() => add(item.id)} className="w-8 h-8 rounded-full bg-muted grid place-items-center hover:bg-primary/10 transition" aria-label="Add one">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="font-bold text-primary w-16 text-right text-sm">₹{item.price * qty}</div>
                  </div>
                ))
              )}
            </div>

            {detailed.length > 0 && (
              <div className="border-t border-border p-5 space-y-3 bg-muted/30">
                <div className="flex items-center justify-between text-lg">
                  <span className="font-semibold">Total</span>
                  <span className="font-display font-bold text-primary text-2xl">₹{total}</span>
                </div>
                <button
                  onClick={() => {
                    setOpen(false);
                    router.navigate({ to: "/checkout" });
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground py-3.5 font-semibold shadow-warm hover:opacity-95 transition"
                >
                  Checkout <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={clear} className="w-full text-xs text-muted-foreground hover:text-destructive transition">
                  Clear cart
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
