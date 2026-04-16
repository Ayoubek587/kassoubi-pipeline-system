export default function Footer() {
  return (
    <footer className="border-t border-border py-10 px-5">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
            <span className="text-primary-foreground font-bold text-[10px]">K</span>
          </div>
          <span className="font-medium text-foreground">Kassoubi Vermittlung</span>
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-foreground transition-colors">Impressum</a>
          <a href="#" className="hover:text-foreground transition-colors">Datenschutz</a>
          <a href="#kontakt" className="hover:text-foreground transition-colors">Kontakt</a>
        </div>
        <span>© 2026 Kassoubi Vermittlung</span>
      </div>
    </footer>
  );
}
