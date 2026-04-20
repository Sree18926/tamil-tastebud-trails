import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Lock } from "lucide-react";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin login — Annapoorani Mess" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LoginPage,
});

const schema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(6, "At least 6 characters").max(100),
});

function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    if (mode === "signup") {
      const { error: err } = await supabase.auth.signUp({
        email: parsed.data.email,
        password: parsed.data.password,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      if (err) {
        setError(err.message);
        setLoading(false);
        return;
      }
      // Session auto-created when email confirm is off (default for Cloud)
      router.navigate({ to: "/admin" });
    } else {
      const { error: err } = await supabase.auth.signInWithPassword({
        email: parsed.data.email,
        password: parsed.data.password,
      });
      if (err) {
        setError(err.message);
        setLoading(false);
        return;
      }
      router.navigate({ to: "/admin" });
    }
  };

  return (
    <SiteLayout>
      <section className="min-h-[70vh] grid place-items-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-soft">
            <div className="w-12 h-12 rounded-full bg-primary/10 grid place-items-center mb-4">
              <Lock className="w-5 h-5 text-primary" />
            </div>
            <h1 className="font-display text-3xl font-bold">{mode === "signin" ? "Admin sign in" : "Create admin account"}</h1>
            <p className="text-sm text-muted-foreground mt-2">
              {mode === "signup"
                ? "The first account you create becomes the shop admin automatically."
                : "Sign in to view orders and manage the shop."}
            </p>

            <form onSubmit={submit} className="mt-6 space-y-4">
              <label className="block">
                <span className="text-sm font-semibold">Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 focus:outline-none focus:border-primary"
                  required
                  autoComplete="email"
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold">Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 focus:outline-none focus:border-primary"
                  required
                  minLength={6}
                  autoComplete={mode === "signup" ? "new-password" : "current-password"}
                />
              </label>
              {error && <div className="text-sm text-destructive">{error}</div>}
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground py-3 font-semibold shadow-warm disabled:opacity-60"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {mode === "signup" ? "Create account" : "Sign in"}
              </button>
            </form>

            <div className="mt-5 text-sm text-center text-muted-foreground">
              {mode === "signin" ? (
                <>No account yet?{" "}
                  <button onClick={() => setMode("signup")} className="text-primary font-semibold hover:underline">Create one</button>
                </>
              ) : (
                <>Already have an account?{" "}
                  <button onClick={() => setMode("signin")} className="text-primary font-semibold hover:underline">Sign in</button>
                </>
              )}
            </div>
          </div>
          <div className="text-center mt-4">
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary">← Back to site</Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
