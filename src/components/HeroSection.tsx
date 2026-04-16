import { motion } from "framer-motion";
import { ArrowRight, Users, GraduationCap, Handshake, Building2, CheckCircle2 } from "lucide-react";
import { useEffect, useRef } from "react";

const trustItems = [
  "100+ Vermittlungen",
  "B1–B2 geprüfte Kandidaten",
  "48h Reaktionszeit",
  "Deutschlandweite Partner",
];

const pipelineSteps = [
  { icon: Users, label: "Kandidat", color: "oklch(0.65 0.2 250)" },
  { icon: GraduationCap, label: "Training", color: "oklch(0.68 0.18 230)" },
  { icon: Handshake, label: "Matching", color: "oklch(0.7 0.15 195)" },
  { icon: Building2, label: "Unternehmen", color: "oklch(0.72 0.13 170)" },
];

function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(oklch(1 0 0 / 30%) 1px, transparent 1px),
            linear-gradient(90deg, oklch(1 0 0 / 30%) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Radial glow behind headline */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px]"
        style={{
          background: "radial-gradient(ellipse at center, oklch(0.65 0.2 250 / 12%) 0%, oklch(0.7 0.15 195 / 6%) 40%, transparent 70%)",
        }}
      />
      {/* Top edge glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[2px]"
        style={{
          background: "linear-gradient(90deg, transparent, oklch(0.65 0.2 250 / 40%), transparent)",
        }}
      />
    </div>
  );
}

function PipelineVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const particles: { x: number; speed: number; offset: number }[] = [];
    for (let i = 0; i < 12; i++) {
      particles.push({
        x: Math.random(),
        speed: 0.001 + Math.random() * 0.002,
        offset: Math.random() * Math.PI * 2,
      });
    }

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;
      ctx.clearRect(0, 0, w, h);
      time += 0.016;

      // Draw connecting lines
      const nodeCount = 4;
      const spacing = w / (nodeCount + 1);
      const cy = h / 2;

      for (let i = 0; i < nodeCount - 1; i++) {
        const x1 = spacing * (i + 1) + 28;
        const x2 = spacing * (i + 2) - 28;

        // Glow line
        const gradient = ctx.createLinearGradient(x1, cy, x2, cy);
        gradient.addColorStop(0, "rgba(100, 160, 255, 0.3)");
        gradient.addColorStop(0.5, "rgba(100, 200, 230, 0.5)");
        gradient.addColorStop(1, "rgba(100, 160, 255, 0.3)");
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, cy);
        ctx.lineTo(x2, cy);
        ctx.stroke();

        // Dashed overlay
        ctx.strokeStyle = "rgba(100, 180, 255, 0.15)";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        ctx.moveTo(x1, cy);
        ctx.lineTo(x2, cy);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Draw particles along lines
      particles.forEach((p) => {
        p.x += p.speed;
        if (p.x > 1) p.x = 0;

        const totalStart = spacing;
        const totalEnd = spacing * nodeCount;
        const px = totalStart + p.x * (totalEnd - totalStart);
        const py = cy + Math.sin(time * 2 + p.offset) * 3;

        const alpha = Math.sin(p.x * Math.PI) * 0.8;
        ctx.fillStyle = `rgba(120, 200, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fill();

        // Particle glow
        ctx.fillStyle = `rgba(120, 200, 255, ${alpha * 0.3})`;
        ctx.beginPath();
        ctx.arc(px, py, 6, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="relative mt-16 max-w-3xl mx-auto">
      {/* Canvas for animated lines & particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ height: "120px" }}
      />

      {/* Pipeline nodes */}
      <div className="relative flex items-center justify-between" style={{ height: "120px" }}>
        {pipelineSteps.map((step, i) => (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 + i * 0.15, duration: 0.5, type: "spring", stiffness: 200 }}
            className="relative z-10 flex flex-col items-center gap-2"
          >
            {/* Node glow */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full blur-xl opacity-30"
              style={{ background: step.color }}
            />
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
              className="relative glass rounded-2xl p-3 md:p-4 flex flex-col items-center gap-1.5"
              style={{ boxShadow: `0 0 20px ${step.color.replace(")", " / 20%)")}` }}
            >
              <step.icon size={22} style={{ color: step.color }} />
              <span className="text-[11px] md:text-xs text-muted-foreground font-medium whitespace-nowrap">
                {step.label}
              </span>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      style={{
        background: "linear-gradient(180deg, oklch(0.13 0.04 260) 0%, oklch(0.08 0.03 265) 60%, oklch(0.06 0.02 270) 100%)",
      }}
    >
      <GridBackground />

      {/* Glow blobs */}
      <div className="glow-blob w-[600px] h-[600px] top-[-150px] left-[-150px]" style={{ background: "oklch(0.65 0.2 250 / 15%)" }} />
      <div className="glow-blob w-[500px] h-[500px] bottom-[-100px] right-[-100px]" style={{ background: "oklch(0.7 0.15 195 / 10%)" }} />
      <div className="glow-blob w-[300px] h-[300px] top-[20%] right-[10%]" style={{ background: "oklch(0.6 0.18 280 / 8%)" }} />

      <div className="relative z-10 mx-auto max-w-5xl px-5 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 text-xs font-medium"
            style={{
              background: "oklch(0.65 0.2 250 / 8%)",
              border: "1px solid oklch(0.65 0.2 250 / 15%)",
              color: "oklch(0.75 0.15 250)",
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            Predictable Talent Pipeline System
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08]"
        >
          Wir bauen Ihre{" "}
          <span className="gradient-text">Fachkräfte-Pipeline</span>
          <br className="hidden sm:block" />
          {" "}für Deutschland
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-6 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          style={{ color: "oklch(0.65 0.03 255)" }}
        >
          Internationale Azubis. Vollständige Betreuung. Planbare Ergebnisse.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#kontakt"
            className="group relative inline-flex items-center gap-2 text-base font-semibold px-7 py-3.5 rounded-xl overflow-hidden transition-transform duration-300 hover:scale-[1.03]"
            style={{
              background: "var(--gradient-primary)",
              color: "var(--color-primary-foreground)",
              boxShadow: "0 0 30px oklch(0.65 0.2 250 / 25%), 0 0 60px oklch(0.65 0.2 250 / 10%)",
            }}
          >
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(135deg, oklch(0.7 0.22 250), oklch(0.75 0.17 195))", boxShadow: "0 0 50px oklch(0.65 0.2 250 / 40%)" }} />
            <span className="relative z-10 flex items-center gap-2">
              Jetzt Fachkräfte sichern <ArrowRight size={16} />
            </span>
          </a>
          <a
            href="#bewerber"
            className="inline-flex items-center gap-2 text-base font-medium px-7 py-3.5 rounded-xl transition-all duration-300 hover:scale-[1.03]"
            style={{
              background: "oklch(1 0 0 / 4%)",
              color: "var(--color-foreground)",
              border: "1px solid oklch(1 0 0 / 10%)",
              backdropFilter: "blur(10px)",
            }}
          >
            Ausbildung starten
          </a>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
        >
          {trustItems.map((item) => (
            <div key={item} className="flex items-center gap-1.5 text-sm" style={{ color: "oklch(0.55 0.03 255)" }}>
              <CheckCircle2 size={14} style={{ color: "oklch(0.7 0.15 195)" }} />
              <span>{item}</span>
            </div>
          ))}
        </motion.div>

        {/* Pipeline Visualization */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <PipelineVisualization />
        </motion.div>
      </div>
    </section>
  );
}
