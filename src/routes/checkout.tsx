import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useCart } from "@/lib/cart-store";
import { findItem } from "@/lib/menu-data";
import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { buildWhatsAppLink, SHOP } from "@/lib/shop";
import { Plus, Minus, ShoppingBag, Loader2, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Annapoorani Mess" },
      { name: "description", content: "Place your Tamil food order. Sent directly to our kitchen via WhatsApp." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

const checkoutSchema = z.object({
  customer_name: z.string().trim().min(2, "Please enter your name").max(80),
  customer_phone: z
    .string()
    .trim()
    .min(10, "Enter a valid phone number")
    .max(20)
    .regex(/^[+\d\s-]+$/, "Use digits, spaces, + or -"),
  customer_address: z.string().trim().max(300).optional(),
  notes: z.string().trim().max(500).optional(),
});

function CheckoutPage() {
  const router = useRouter();
  const items = useCart((s) => s.items);
  const add = useCart((s) => s.add);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const detailed = Object.entries(items)
    .map(([id, qty]) => ({ item: findItem(id), qty }))
    .filter((x): x is { item: NonNullable<ReturnType<typeof findItem>>; qty: number } => !!x.item);
  const total = detailed.reduce((s, { item, qty }) => s + item.price * qty, 0);

  if (detailed.length === 0) {
    return (
      <SiteLayout>
        <div className="max-w-md mx-auto px-4 py-24 text-center">
          <ShoppingBag className="w-12 h-12 mx-auto text-muted-foreground/40 mb-4" />
          <h1 className="font-display text-3xl font-bold">Your cart is empty</h1>
          <p className="text-muted-foreground mt-2">Browse our menu and add some delicious items.</p>
          <Link to="/menu" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-semibold shadow-warm">
            <ArrowLeft className="w-4 h-4" /> Back to menu
          </Link>
        </div>
      </SiteLayout>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    const parsed = checkoutSchema.safeParse({
      customer_name: name,
      customer_phone: phone,
      customer_address: address || undefined,
      notes: notes || undefined,
    });
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        errs[i.path[0] as string] = i.message;
      });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);

    const orderItems = detailed.map(({ item, qty }) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      qty,
      subtotal: item.price * qty,
    }));

    const { data, error } = await supabase
      .from("orders")
      .insert({
        customer_name: parsed.data.customer_name,
        customer_phone: parsed.data.customer_phone,
        customer_address: parsed.data.customer_address ?? null,
        items: orderItems,
        total_amount: total,
        notes: parsed.data.notes ?? null,
      })
      .select("id")
      .single();

    if (error || !data) {
      setSubmitting(false);
      setServerError("We couldn't save your order. Please try again or call us directly.");
      return;
    }

    // Build WhatsApp message
    const lines = [
      `*New order from ${SHOP.name}*`,
      ``,
      `*Name:* ${parsed.data.customer_name}`,
      `*Phone:* ${parsed.data.customer_phone}`,
      parsed.data.customer_address ? `*Address:* ${parsed.data.customer_address}` : null,
      ``,
      `*Items:*`,
      ...orderItems.map((i) => `• ${i.name} × ${i.qty} = ₹${i.subtotal}`),
      ``,
      `*Total: ₹${total}*`,
      parsed.data.notes ? `\n*Notes:* ${parsed.data.notes}` : null,
      ``,
      `Order ID: ${data.id.slice(0, 8)}`,
    ].filter(Boolean).join("\n");

    clear();
    // Open WhatsApp in new tab, then redirect to thank-you
    window.open(buildWhatsAppLink(lines), "_blank", "noopener,noreferrer");
    router.navigate({ to: "/order-success", search: { id: data.id } });
  };

  return (
    <SiteLayout>
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <Link to="/menu" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-4">
            <ArrowLeft className="w-4 h-4" /> Continue browsing menu
          </Link>
          <h1 className="font-display text-4xl md:text-5xl font-bold">Checkout</h1>
          <p className="text-muted-foreground mt-2">Confirm your order — we'll receive it on WhatsApp instantly.</p>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="max-w-5xl mx-auto px-4 md:px-8 grid md:grid-cols-[1fr_400px] gap-8">
          <form onSubmit={handleSubmit} className="space-y-5 order-2 md:order-1">
            <h2 className="font-display text-2xl font-bold">Your details</h2>

            <Field label="Full name" error={errors.customer_name}>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={80}
                className="input"
                placeholder="Karthik Raman"
                autoComplete="name"
              />
            </Field>

            <Field label="Phone number" error={errors.customer_phone}>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={20}
                className="input"
                placeholder="+91 98765 43210"
                inputMode="tel"
                autoComplete="tel"
              />
            </Field>

            <Field label="Delivery address (optional)" error={errors.customer_address}>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                maxLength={300}
                rows={2}
                className="input"
                placeholder="Leave blank if pickup"
                autoComplete="street-address"
              />
            </Field>

            <Field label="Notes (optional)" error={errors.notes}>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                maxLength={500}
                rows={2}
                className="input"
                placeholder="Less spicy, extra chutney, etc."
              />
            </Field>

            {serverError && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm">
                {serverError}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground py-4 font-semibold shadow-warm hover:opacity-95 transition disabled:opacity-60"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Place order via WhatsApp · ₹{total}
            </button>
            <p className="text-xs text-muted-foreground text-center">
              Your order is saved to our system. WhatsApp will open with the order pre-filled — just hit send.
            </p>
          </form>

          <aside className="order-1 md:order-2">
            <div className="rounded-2xl bg-card border border-border p-5 sticky top-24 shadow-soft">
              <h2 className="font-display text-lg font-bold mb-4">Order summary</h2>
              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {detailed.map(({ item, qty }) => (
                  <div key={item.id} className="flex items-center gap-2 text-sm">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold truncate">{item.name}</div>
                      <div className="text-xs text-muted-foreground">₹{item.price}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button type="button" onClick={() => remove(item.id)} className="w-6 h-6 rounded-full bg-muted grid place-items-center" aria-label="Remove one">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center font-semibold">{qty}</span>
                      <button type="button" onClick={() => add(item.id)} className="w-6 h-6 rounded-full bg-muted grid place-items-center" aria-label="Add one">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="w-14 text-right font-bold text-primary">₹{item.price * qty}</div>
                  </div>
                ))}
              </div>
              <div className="border-t border-border mt-4 pt-4 flex items-center justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-display font-bold text-2xl text-primary">₹{total}</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <style>{`
        .input {
          width: 100%;
          border: 1px solid var(--color-border);
          background: var(--color-card);
          border-radius: 0.75rem;
          padding: 0.75rem 1rem;
          font-size: 0.95rem;
          transition: border-color 0.15s, box-shadow 0.15s;
          font-family: inherit;
        }
        .input:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px color-mix(in oklab, var(--color-primary) 15%, transparent);
        }
      `}</style>
    </SiteLayout>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold mb-1.5">{label}</span>
      {children}
      {error && <span className="block mt-1 text-xs text-destructive">{error}</span>}
    </label>
  );
}
