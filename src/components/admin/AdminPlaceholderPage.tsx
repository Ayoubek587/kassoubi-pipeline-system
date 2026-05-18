import { type LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AdminPlaceholderPage({
  icon: Icon,
  title,
  description,
  items,
  cta,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  items: Array<{ title: string; description: string }>;
  cta?: string;
}) {
  return (
    <div className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
      <Card className="overflow-hidden rounded-xl border-border/70 bg-card/95 shadow-sm">
        <CardHeader className="border-b border-border/70 bg-muted/35">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <CardTitle className="text-xl">{title}</CardTitle>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-5">
          <div className="grid gap-3 sm:grid-cols-2">
            {items.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border/70 bg-background/70 p-4"
              >
                <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-xl border-border/70 bg-card/95 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border border-dashed border-border bg-background/70 p-5">
            <p className="text-sm font-semibold text-foreground">Geplant für die nächste Stufe</p>
            <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
              Diese Ansicht ist vorbereitet, damit der Adminbereich sauber mitwachsen kann.
            </p>
            {cta && (
              <Button variant="outline" className="mt-4 rounded-lg bg-card/80">
                {cta}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
