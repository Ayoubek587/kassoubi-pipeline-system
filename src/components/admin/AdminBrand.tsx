import { Link } from "@tanstack/react-router";

import { cn } from "@/lib/utils";

export function AdminBrand({
  collapsed = false,
  className,
}: {
  collapsed?: boolean;
  className?: string;
}) {
  return (
    <Link
      to="/admin/dashboard"
      className={cn(
        "group flex min-w-0 items-center overflow-hidden rounded-2xl transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        collapsed ? "h-12 w-12 justify-center" : "h-14 gap-3",
        className,
      )}
      aria-label="Kassoubi Lead Management Dashboard"
    >
      <span
        className={cn(
          "grid shrink-0 place-items-center transition-all duration-300 ease-out",
          collapsed
            ? "h-11 w-11 rounded-2xl border border-border/70 bg-background/75 shadow-sm group-hover:border-primary/25 group-hover:bg-primary/5"
            : "relative h-11 w-[56px] overflow-hidden sm:w-[60px]",
        )}
      >
        {collapsed ? (
          <img
            src="/favicon.png"
            alt=""
            width={48}
            height={48}
            className="h-8 w-8 rounded-lg object-contain"
            aria-hidden="true"
          />
        ) : (
          <>
            <img
              src="/brand/kv-logo-light-normalized.png"
              alt="Kassoubi Vermittlung"
              width={660}
              height={420}
              className="absolute left-0 top-1/2 h-[31px] w-auto -translate-y-1/2 object-contain transition-transform duration-300 ease-out group-hover:scale-[1.02] dark:hidden"
            />
            <img
              src="/brand/kv-logo-dark-normalized.png"
              alt="Kassoubi Vermittlung"
              width={660}
              height={420}
              className="absolute left-0 top-1/2 hidden h-[31px] w-auto -translate-y-1/2 object-contain transition-transform duration-300 ease-out group-hover:scale-[1.02] dark:block"
            />
          </>
        )}
      </span>
      <span
        className={cn(
          "flex min-w-0 items-center gap-3 overflow-hidden transition-all duration-300 ease-out",
          collapsed ? "w-0 opacity-0" : "w-[170px] opacity-100",
        )}
        aria-hidden={collapsed}
      >
        <span
          className="hidden h-9 w-px shrink-0 bg-gradient-to-b from-transparent via-border/80 to-transparent sm:block"
          aria-hidden="true"
        />
        <span className="hidden min-w-[126px] translate-y-px select-none leading-none sm:block">
          <span className="block text-[13px] font-bold tracking-[0.22em] text-foreground">
            KASSOUBI
          </span>
          <span className="mt-1.5 block text-[8px] font-semibold tracking-[0.4em] text-primary">
            VERMITTLUNG
          </span>
          <span className="mt-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Lead Management
          </span>
        </span>
      </span>
    </Link>
  );
}
