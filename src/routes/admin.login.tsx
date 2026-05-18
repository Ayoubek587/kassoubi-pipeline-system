import { FormEvent, useCallback, useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, LockKeyhole, Mail } from "lucide-react";

import { AdminBrand } from "@/components/admin/AdminBrand";
import { AdminThemeToggle } from "@/components/admin/AdminThemeToggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { establishAdminSession, getAdminSession, getSupabaseAuthConfig } from "@/lib/admin";
import { createBrowserSupabaseClient, type SupabaseAuthConfig } from "@/lib/supabase-browser";

const accessDeniedMessage = "Kein Zugriff auf diesen Adminbereich.";
const bullets = [
  "Bewerberverwaltung",
  "Unternehmensanfragen",
  "Lead-Status",
  "Notizen & Follow-ups",
];

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [{ title: "Admin Login | Kassoubi" }],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const getSession = useServerFn(getAdminSession);
  const getAuthConfig = useServerFn(getSupabaseAuthConfig);
  const establishSession = useServerFn(establishAdminSession);
  const [authConfig, setAuthConfig] = useState<SupabaseAuthConfig | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checking, setChecking] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const syncSupabaseSession = useCallback(
    async (config: SupabaseAuthConfig) => {
      const supabase = createBrowserSupabaseClient(config);
      const { data } = await supabase.auth.getSession();
      const session = data.session;

      if (!session?.access_token || !session.refresh_token) return false;

      try {
        await establishSession({
          data: {
            accessToken: session.access_token,
            refreshToken: session.refresh_token,
            expiresIn: session.expires_in,
          },
        });
        return true;
      } catch (sessionError) {
        await supabase.auth.signOut({ scope: "local" });
        if (sessionError instanceof Error && sessionError.message === accessDeniedMessage) {
          setError(accessDeniedMessage);
        }
        return false;
      }
    },
    [establishSession],
  );

  useEffect(() => {
    let active = true;

    async function checkSession() {
      setChecking(true);
      setError("");

      try {
        const serverSession = await getSession({});

        if (serverSession.authenticated) {
          navigate({ to: "/admin/dashboard", replace: true });
          return;
        }

        const config = await getAuthConfig({});
        if (!active) return;

        setAuthConfig(config);

        if (await syncSupabaseSession(config)) {
          navigate({ to: "/admin/dashboard", replace: true });
        }
      } catch (sessionError) {
        if (!active) return;
        setError(
          sessionError instanceof Error
            ? sessionError.message
            : "Admin-Anmeldung ist aktuell nicht verfügbar.",
        );
      } finally {
        if (active) setChecking(false);
      }
    }

    checkSession();

    return () => {
      active = false;
    };
  }, [getAuthConfig, getSession, navigate, syncSupabaseSession]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting || !authConfig) return;

    setSubmitting(true);
    setError("");

    const supabase = createBrowserSupabaseClient(authConfig);

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError || !data.session?.access_token || !data.session.refresh_token) {
        throw new Error("E-Mail oder Passwort ist nicht korrekt.");
      }

      await establishSession({
        data: {
          accessToken: data.session.access_token,
          refreshToken: data.session.refresh_token,
          expiresIn: data.session.expires_in,
        },
      });

      navigate({ to: "/admin/dashboard", replace: true });
    } catch (loginError) {
      if (loginError instanceof Error && loginError.message === accessDeniedMessage) {
        await supabase.auth.signOut({ scope: "local" });
        setError(accessDeniedMessage);
      } else {
        setError(loginError instanceof Error ? loginError.message : "Anmeldung fehlgeschlagen.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const disabled = submitting || checking || !email || !password || !authConfig;

  return (
    <main className="relative flex min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,color-mix(in_oklab,var(--primary)_14%,transparent),transparent_30%),linear-gradient(180deg,var(--surface),var(--background))] px-4 py-10">
      <div className="absolute right-4 top-4 z-10">
        <AdminThemeToggle />
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[1fr_440px]">
        <section className="hidden min-w-0 lg:block">
          <AdminBrand className="scale-110 origin-left" />
          <h1 className="mt-8 max-w-xl text-4xl font-semibold tracking-tight text-foreground">
            Recruiting- & Vermittlungsdashboard für Kassoubi.
          </h1>
          <p className="mt-4 max-w-lg text-base leading-7 text-muted-foreground">
            Verwalten Sie Bewerberprofile, Unternehmensanfragen, Status, Notizen und Follow-ups an
            einem geschützten Ort.
          </p>
          <div className="mt-7 grid max-w-lg gap-3 sm:grid-cols-2">
            {bullets.map((bullet) => (
              <div key={bullet} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary" aria-hidden="true" />
                {bullet}
              </div>
            ))}
          </div>
        </section>
        <Card className="w-full rounded-2xl border-border/70 bg-card/95 shadow-[0_24px_80px_color-mix(in_oklab,var(--foreground)_10%,transparent)]">
          <CardHeader className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <AdminBrand className="lg:hidden" />
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                <LockKeyhole className="h-5 w-5" />
              </div>
            </div>
            <div>
              <CardTitle className="text-2xl">Admin Login</CardTitle>
              <CardDescription className="mt-2">
                Melden Sie sich an, um Kassoubi Leads sicher zu verwalten.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="admin-email">E-Mail</Label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <Input
                    id="admin-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    disabled={submitting || checking}
                    onChange={(event) => setEmail(event.target.value)}
                    className="h-11 rounded-lg bg-background pl-10"
                    placeholder="admin@kassoubi.de"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="admin-password">Passwort</Label>
                <Input
                  id="admin-password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  disabled={submitting || checking}
                  onChange={(event) => setPassword(event.target.value)}
                  className="h-11 rounded-lg bg-background"
                  placeholder="Passwort"
                />
              </div>

              {error && (
                <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {error}
                </p>
              )}

              <Button type="submit" className="h-11 rounded-lg" disabled={disabled}>
                {checking ? "Sitzung wird geprüft..." : submitting ? "Anmeldung..." : "Einloggen"}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                Geschützter interner Bereich · Nur autorisierte Benutzer
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
