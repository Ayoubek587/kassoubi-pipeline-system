import { Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  BarChart3,
  Building2,
  CalendarClock,
  Columns3,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareText,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Server,
  Settings,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

import { AdminBrand } from "@/components/admin/AdminBrand";
import { AdminThemeToggle } from "@/components/admin/AdminThemeToggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { getSupabaseAuthConfig, logoutAdmin } from "@/lib/admin";
import { createBrowserSupabaseClient } from "@/lib/supabase-browser";
import { cn } from "@/lib/utils";

type NavItem = {
  to:
    | "/admin/dashboard"
    | "/admin/leads"
    | "/admin/leads/new"
    | "/admin/pipeline"
    | "/admin/termine"
    | "/admin/analytics"
    | "/admin/bewerber"
    | "/admin/unternehmen"
    | "/admin/nachrichten"
    | "/admin/systemstatus"
    | "/admin/einstellungen";
  label: string;
  icon: LucideIcon;
};

const navSections: Array<{ label: string; items: NavItem[] }> = [
  {
    label: "Übersicht",
    items: [
      { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { to: "/admin/leads", label: "Leads", icon: UsersRound },
      { to: "/admin/pipeline", label: "Pipeline", icon: Columns3 },
      { to: "/admin/termine", label: "Termine", icon: CalendarClock },
      { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    ],
  },
  {
    label: "Recruiting",
    items: [
      { to: "/admin/bewerber", label: "Bewerber", icon: GraduationCap },
      { to: "/admin/unternehmen", label: "Unternehmen", icon: Building2 },
      { to: "/admin/nachrichten", label: "Nachrichten", icon: MessageSquareText },
    ],
  },
  {
    label: "System",
    items: [
      { to: "/admin/systemstatus", label: "Systemstatus", icon: Server },
      { to: "/admin/einstellungen", label: "Einstellungen", icon: Settings },
    ],
  },
];

const collapsedStorageKey = "kassoubi-admin-sidebar-collapsed";

function AdminProfile({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/70 bg-background/70 p-3 shadow-sm",
        collapsed && "flex justify-center p-2",
      )}
    >
      <div className="flex min-w-0 items-center gap-3">
        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-semibold text-primary">
          A
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-emerald-500" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">Admin</p>
            <p className="truncate text-xs text-muted-foreground">Kassoubi Recruiting</p>
          </div>
        )}
      </div>
    </div>
  );
}

function NavLinks({
  collapsed = false,
  onNavigate,
}: {
  collapsed?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <nav className="grid gap-6">
      {navSections.map((section) => (
        <div key={section.label} className="grid gap-2">
          {!collapsed && (
            <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/80">
              {section.label}
            </p>
          )}
          <div className="grid gap-1">
            {section.items.map((item) => {
              const Icon = item.icon;
              const link = (
                <Link
                  key={item.to}
                  to={item.to}
                  title={item.label}
                  onClick={onNavigate}
                  className={cn(
                    "group flex min-h-11 items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted/80 hover:text-foreground",
                    collapsed && "justify-center px-2",
                  )}
                  activeProps={{
                    className:
                      "bg-primary text-primary-foreground shadow-sm hover:bg-primary hover:text-primary-foreground",
                  }}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </Link>
              );

              if (!collapsed) return link;

              return (
                <Tooltip key={item.to}>
                  <TooltipTrigger asChild>{link}</TooltipTrigger>
                  <TooltipContent side="right">{item.label}</TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}

export function AdminShell({
  children,
  title,
  description,
}: {
  children: ReactNode;
  title: string;
  description: string;
}) {
  const navigate = useNavigate();
  const logout = useServerFn(logoutAdmin);
  const getAuthConfig = useServerFn(getSupabaseAuthConfig);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    try {
      setCollapsed(localStorage.getItem(collapsedStorageKey) === "true");
    } catch {
      setCollapsed(false);
    }
  }, []);

  const toggleCollapsed = () => {
    setCollapsed((current) => {
      const next = !current;
      try {
        localStorage.setItem(collapsedStorageKey, String(next));
      } catch {
        // localStorage can be unavailable in locked-down browsers.
      }
      return next;
    });
  };

  const handleLogout = async () => {
    try {
      const authConfig = await getAuthConfig({});
      await createBrowserSupabaseClient(authConfig).auth.signOut({ scope: "local" });
    } catch {
      // Continue with server-side cookie cleanup even when local storage is unavailable.
    }

    logout({}).finally(() => {
      navigate({ to: "/admin/login", replace: true });
    });
  };

  return (
    <TooltipProvider delayDuration={120}>
      <div className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top_left,color-mix(in_oklab,var(--primary)_10%,transparent),transparent_30%),linear-gradient(180deg,var(--surface),var(--background))]">
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-30 hidden overflow-hidden border-r border-border/70 bg-card/94 shadow-[0_20px_70px_color-mix(in_oklab,var(--foreground)_9%,transparent)] backdrop-blur-xl transition-[width] duration-200 lg:block",
            collapsed ? "w-24" : "w-72",
          )}
        >
          <div className="flex h-full min-w-0 flex-col">
            <div
              className={cn(
                "shrink-0 border-b border-border/70 py-5 transition-all duration-300 ease-out",
                collapsed ? "flex justify-center px-0" : "px-5",
              )}
            >
              <AdminBrand collapsed={collapsed} />
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 pb-6">
              <Button
                asChild
                variant="outline"
                size={collapsed ? "icon" : "default"}
                className={cn(
                  "mb-5 rounded-xl border-primary/20 bg-primary/10 text-primary shadow-sm hover:bg-primary/15",
                  collapsed ? "mx-auto flex" : "w-full justify-start",
                )}
                title="Neuer Lead"
              >
                <Link to="/admin/leads/new">
                  <Plus className="h-4 w-4" />
                  {!collapsed && "Neuer Lead"}
                </Link>
              </Button>
              <NavLinks collapsed={collapsed} />
            </div>
            <div className="grid shrink-0 gap-3 border-t border-border/70 p-4 pb-5">
              <AdminProfile collapsed={collapsed} />
              <Button
                variant="ghost"
                size={collapsed ? "icon" : "default"}
                className={cn(
                  "rounded-xl text-muted-foreground",
                  collapsed ? "mx-auto" : "w-full justify-start",
                )}
                onClick={toggleCollapsed}
                aria-label={collapsed ? "Sidebar erweitern" : "Sidebar einklappen"}
                title={collapsed ? "Sidebar erweitern" : "Sidebar einklappen"}
              >
                {collapsed ? (
                  <PanelLeftOpen className="h-4 w-4" />
                ) : (
                  <PanelLeftClose className="h-4 w-4" />
                )}
                {!collapsed && "Einklappen"}
              </Button>
              <Button
                variant="ghost"
                size={collapsed ? "icon" : "default"}
                className={cn(
                  "rounded-xl text-muted-foreground",
                  collapsed ? "mx-auto" : "w-full justify-start",
                )}
                onClick={handleLogout}
                aria-label="Abmelden"
                title="Abmelden"
              >
                <LogOut className="h-4 w-4" />
                {!collapsed && "Abmelden"}
              </Button>
            </div>
          </div>
        </aside>

        <div
          className={cn(
            "min-w-0 transition-[padding] duration-200",
            collapsed ? "lg:pl-24" : "lg:pl-72",
          )}
        >
          <header className="sticky top-0 z-20 border-b border-border/70 bg-background/88 backdrop-blur-xl">
            <div className="mx-auto flex min-h-20 w-full max-w-[1500px] flex-col gap-5 px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex min-w-0 flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex min-w-0 items-start gap-3">
                  <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                    <SheetTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="mt-1 shrink-0 rounded-lg border-border/80 bg-card/75 shadow-sm lg:hidden"
                        aria-label="Menü öffnen"
                      >
                        <Menu className="h-4 w-4" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent
                      side="left"
                      className="flex w-[86vw] max-w-sm flex-col bg-card p-0"
                    >
                      <SheetHeader className="border-b border-border/70 px-5 py-5 text-left">
                        <AdminBrand />
                        <SheetTitle className="sr-only">Admin Navigation</SheetTitle>
                        <SheetDescription className="sr-only">Kassoubi Admin Menü</SheetDescription>
                      </SheetHeader>
                      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 pb-6">
                        <Button
                          asChild
                          variant="outline"
                          className="mb-5 w-full justify-start rounded-xl border-primary/20 bg-primary/10 text-primary shadow-sm hover:bg-primary/15"
                        >
                          <Link to="/admin/leads/new" onClick={() => setMobileOpen(false)}>
                            <Plus className="h-4 w-4" />
                            Neuer Lead
                          </Link>
                        </Button>
                        <NavLinks onNavigate={() => setMobileOpen(false)} />
                      </div>
                      <div className="grid shrink-0 gap-3 border-t border-border/70 p-4 pb-5">
                        <AdminProfile />
                        <Button
                          variant="ghost"
                          className="w-full justify-start rounded-xl text-muted-foreground"
                          onClick={handleLogout}
                        >
                          <LogOut className="h-4 w-4" />
                          Abmelden
                        </Button>
                      </div>
                    </SheetContent>
                  </Sheet>
                  <div className="min-w-0">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                      Adminbereich
                    </p>
                    <h2 className="truncate text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                      {title}
                    </h2>
                    <p className="mt-1.5 max-w-2xl text-sm leading-6 text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <AdminThemeToggle />
                  <Button
                    variant="outline"
                    className="rounded-lg border-border/80 bg-card/75 shadow-sm"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="hidden sm:inline">Abmelden</span>
                  </Button>
                </div>
              </div>
            </div>
          </header>
          <main className="min-w-0 px-4 py-7 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-[1500px] min-w-0">{children}</div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
