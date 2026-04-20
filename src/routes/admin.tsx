import { createFileRoute, useRouter } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, LogOut, Phone, MapPin, Clock, RefreshCw, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Orders dashboard — Annapoorani Mess" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

type OrderItem = { id: string; name: string; price: number; qty: number; subtotal: number };
type Order = {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string | null;
  items: OrderItem[];
  total_amount: number;
  notes: string | null;
  status: "new" | "preparing" | "ready" | "completed" | "cancelled";
  created_at: string;
};

const STATUS_COLORS: Record<Order["status"], string> = {
  new: "bg-secondary text-secondary-foreground",
  preparing: "bg-turmeric text-foreground",
  ready: "bg-accent text-accent-foreground",
  completed: "bg-muted text-muted-foreground",
  cancelled: "bg-destructive/15 text-destructive",
};

function AdminPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [authed, setAuthed] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<Order["status"] | "all">("all");

  // Auth + role check
  useEffect(() => {
    let mounted = true;
    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!mounted) return;
      if (!session) {
        router.navigate({ to: "/admin/login" });
        return;
      }
      setAuthed(true);
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id);
      if (!mounted) return;
      const admin = !!roles?.some((r) => r.role === "admin");
      setIsAdmin(admin);
      setChecking(false);
    };
    check();
    const { data: sub } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) router.navigate({ to: "/admin/login" });
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [router]);

  const loadOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);
    if (!error && data) setOrders(data as Order[]);
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) loadOrders();
  }, [isAdmin]);

  // Realtime subscription
  useEffect(() => {
    if (!isAdmin) return;
    const channel = supabase
      .channel("orders-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "orders" }, () => {
        loadOrders();
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAdmin]);

  const updateStatus = async (id: string, status: Order["status"]) => {
    await supabase.from("orders").update({ status }).eq("id", id);
    setOrders((prev) => prev?.map((o) => (o.id === id ? { ...o, status } : o)) ?? null);
  };

  const deleteOrder = async (id: string) => {
    if (!confirm("Delete this order?")) return;
    await supabase.from("orders").delete().eq("id", id);
    setOrders((prev) => prev?.filter((o) => o.id !== id) ?? null);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    router.navigate({ to: "/admin/login" });
  };

  if (checking) {
    return (
      <div className="min-h-screen grid place-items-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (authed && !isAdmin) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 grid place-items-center px-4">
          <div className="text-center max-w-md">
            <h1 className="font-display text-3xl font-bold">Not authorized</h1>
            <p className="text-muted-foreground mt-2">Your account doesn't have admin access.</p>
            <button onClick={signOut} className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 font-semibold">
              <LogOut className="w-4 h-4" /> Sign out
            </button>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const filtered = filter === "all" ? orders ?? [] : (orders ?? []).filter((o) => o.status === filter);
  const stats = {
    new: orders?.filter((o) => o.status === "new").length ?? 0,
    preparing: orders?.filter((o) => o.status === "preparing").length ?? 0,
    ready: orders?.filter((o) => o.status === "ready").length ?? 0,
    today: orders?.filter((o) => new Date(o.created_at).toDateString() === new Date().toDateString()).length ?? 0,
    revenue: orders
      ?.filter((o) => new Date(o.created_at).toDateString() === new Date().toDateString() && o.status !== "cancelled")
      .reduce((s, o) => s + Number(o.total_amount), 0) ?? 0,
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <SiteHeader />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold">Orders dashboard</h1>
              <p className="text-sm text-muted-foreground mt-1">Live updates · auto-refreshes when new orders arrive</p>
            </div>
            <div className="flex gap-2">
              <button onClick={loadOrders} className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-4 py-2 text-sm font-semibold">
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Refresh
              </button>
              <button onClick={signOut} className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-4 py-2 text-sm font-semibold">
                <LogOut className="w-4 h-4" /> Sign out
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
            <Stat label="New" value={stats.new} highlight />
            <Stat label="Preparing" value={stats.preparing} />
            <Stat label="Ready" value={stats.ready} />
            <Stat label="Today's orders" value={stats.today} />
            <Stat label="Today's revenue" value={`₹${stats.revenue}`} />
          </div>

          <div className="flex gap-2 flex-wrap mb-4">
            {(["all", "new", "preparing", "ready", "completed", "cancelled"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition ${
                  filter === s ? "bg-primary text-primary-foreground" : "bg-card border border-border hover:border-primary"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {orders === null ? (
            <div className="grid place-items-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">No orders {filter !== "all" && `with status "${filter}"`} yet.</div>
          ) : (
            <div className="grid gap-4">
              {filtered.map((o) => (
                <article key={o.id} className="rounded-2xl bg-card border border-border p-5 shadow-soft">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-display text-xl font-bold">{o.customer_name}</h3>
                        <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${STATUS_COLORS[o.status]}`}>
                          {o.status}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 flex items-center gap-3 flex-wrap">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(o.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</span>
                        <a href={`tel:${o.customer_phone}`} className="flex items-center gap-1 hover:text-primary"><Phone className="w-3 h-3" /> {o.customer_phone}</a>
                        {o.customer_address && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {o.customer_address}</span>}
                      </div>
                    </div>
                    <div className="font-display text-2xl font-bold text-primary">₹{Number(o.total_amount)}</div>
                  </div>

                  <div className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-1">
                    {o.items.map((it, i) => (
                      <div key={i} className="text-sm flex justify-between">
                        <span>{it.name} <span className="text-muted-foreground">× {it.qty}</span></span>
                        <span className="font-semibold">₹{it.subtotal}</span>
                      </div>
                    ))}
                  </div>

                  {o.notes && (
                    <div className="mt-3 text-sm p-3 rounded-lg bg-muted text-muted-foreground italic">
                      "{o.notes}"
                    </div>
                  )}

                  <div className="mt-4 flex items-center gap-2 flex-wrap pt-3 border-t border-border">
                    <span className="text-xs font-semibold text-muted-foreground mr-1">Set status:</span>
                    {(["new", "preparing", "ready", "completed", "cancelled"] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => updateStatus(o.id, s)}
                        disabled={o.status === s}
                        className={`text-xs px-2.5 py-1 rounded-full font-semibold capitalize transition ${
                          o.status === s ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-primary/10"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                    <button
                      onClick={() => deleteOrder(o.id)}
                      className="ml-auto text-xs text-destructive hover:bg-destructive/10 rounded-full px-2.5 py-1 inline-flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" /> Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string | number; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl p-4 border ${highlight ? "bg-primary text-primary-foreground border-primary shadow-warm" : "bg-card border-border"}`}>
      <div className={`text-xs font-semibold ${highlight ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{label}</div>
      <div className="font-display text-2xl font-bold mt-1">{value}</div>
    </div>
  );
}
