import { Link } from "@tanstack/react-router";

export default function Footer() {
  return (
    <footer className="border-t border-border py-10 px-5">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
            <span className="text-primary-foreground font-bold text-[10px]">K</span>
          </div>
          <span className="font-medium text-foreground">Kassoubi – Immigration & Recruitment</span>
        </Link>
        <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
          <Link to="/ueber-uns" className="hover:text-foreground transition-colors">Über uns</Link>
          <Link to="/prozess" className="hover:text-foreground transition-colors">Prozess</Link>
          <Link to="/kontakt" className="hover:text-foreground transition-colors">Kontakt</Link>
          <Link to="/impressum" className="hover:text-foreground transition-colors">Impressum</Link>
          <Link to="/datenschutz" className="hover:text-foreground transition-colors">Datenschutz</Link>
        </div>
        <span>© 2026 Kassoubi</span>
      </div>
    </footer>
  );
}
