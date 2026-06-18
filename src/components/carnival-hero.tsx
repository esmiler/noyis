import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight, Leaf, MapPin, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/components/lang-context";
import { tr } from "@/lib/i18n";
import { whatsAppUrl } from "@/lib/whatsapp";
import storefront from "@/assets/noyis-storefront.png.asset.json";
import lineup from "@/assets/noyis-treasure-lineup.jpg.asset.json";

type SlideKey = "stamina" | "recovery" | "local";

const SLIDES: { key: SlideKey; img?: string; gradient?: string }[] = [
  { key: "stamina", img: lineup.url },
  { key: "recovery", gradient: "linear-gradient(135deg, hsl(150 60% 18%), hsl(170 55% 22%) 50%, hsl(45 70% 45%))" },
  { key: "local", img: storefront.url },
];

const AUTO_MS = 6000;

export function CarnivalHero() {
  const { lang } = useLang();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), AUTO_MS);
    return () => clearInterval(id);
  }, [paused, reduced]);

  // swipe
  const [touchX, setTouchX] = useState<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => setTouchX(e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) setIndex((i) => (i + (dx < 0 ? 1 : SLIDES.length - 1)) % SLIDES.length);
    setTouchX(null);
  };

  const carnivalMsg =
    "Hello NOYIS AFRICA! I'm preparing for Antigua Carnival 2026. I'd like to order the Stamina Combo (Treasure Man + Treasure Herbs) for pickup at Lower Nevis Street. Please send total pricing. Thank you!";
  const whatsappHref = whatsAppUrl(carnivalMsg);

  return (
    <section
      aria-label="Antigua Carnival 2026 wellness collection"
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Backgrounds */}
      {SLIDES.map((s, i) => (
        <div
          key={s.key}
          aria-hidden={i !== index}
          className={`absolute inset-0 transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}
        >
          {s.img ? (
            <img src={s.img} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full" style={{ background: s.gradient }} />
          )}
          <div className="absolute inset-0 bg-gradient-to-br from-botanical/95 via-botanical/80 to-botanical/40" />
        </div>
      ))}

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:py-36">
        {/* Slide 1 — Stamina */}
        <SlidePanel active={index === 0}>
          <Eyebrow icon={<Sparkles className="h-3.5 w-3.5" />}>
            {tr("carn_eyebrow", lang)}
          </Eyebrow>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
            {tr("carn_s1_title", lang)}
          </h1>
          <p className="mt-6 max-w-2xl text-base text-white/85 sm:text-lg">{tr("carn_s1_sub", lang)}</p>
          <p className="mt-2 max-w-2xl text-sm text-white/70">{tr("carn_grounding", lang)}</p>
          <Actions>
            <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90">
              <Link to="/products" search={{ cat: "natural-wellness" }}>
                {tr("carn_s1_cta", lang)} <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <WhatsAppLink href={whatsappHref} label={tr("hero_cta_whatsapp", lang)} />
          </Actions>
        </SlidePanel>

        {/* Slide 2 — Recovery */}
        <SlidePanel active={index === 1}>
          <Eyebrow icon={<Leaf className="h-3.5 w-3.5" />}>{tr("carn_eyebrow", lang)}</Eyebrow>
          <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
            {tr("carn_s2_title", lang)}
          </h2>
          <p className="mt-6 max-w-2xl text-base text-white/85 sm:text-lg">{tr("carn_s2_sub", lang)}</p>
          <p className="mt-2 max-w-2xl text-sm text-white/70">{tr("carn_grounding", lang)}</p>
          <Actions>
            <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90">
              <Link to="/products" search={{ cat: "natural-wellness" }}>
                {tr("carn_s2_cta", lang)} <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <WhatsAppLink href={whatsappHref} label={tr("hero_cta_whatsapp", lang)} />
          </Actions>
        </SlidePanel>

        {/* Slide 3 — Local pickup */}
        <SlidePanel active={index === 2}>
          <Eyebrow icon={<MapPin className="h-3.5 w-3.5" />}>{tr("carn_s3_kicker", lang)}</Eyebrow>
          <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
            {tr("carn_s3_title", lang)}
          </h2>
          <p className="mt-6 max-w-2xl text-base text-white/85 sm:text-lg">{tr("carn_s3_sub", lang)}</p>
          <Actions>
            <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90">
              <a href={whatsappHref} target="_blank" rel="noreferrer">
                <MessageCircle className="h-4 w-4" /> {tr("carn_s3_cta", lang)}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white/20">
              <Link to="/store-locator">{tr("carn_s3_directions", lang)}</Link>
            </Button>
          </Actions>
        </SlidePanel>

        {/* Controls */}
        <div className="relative mt-10 flex items-center gap-3">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => setIndex((i) => (i + SLIDES.length - 1) % SLIDES.length)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2" role="tablist" aria-label="Carnival slides">
            {SLIDES.map((s, i) => (
              <button
                key={s.key}
                role="tab"
                aria-selected={i === index}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${i === index ? "w-8 bg-gold" : "w-2 bg-white/40 hover:bg-white/70"}`}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => setIndex((i) => (i + 1) % SLIDES.length)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* SEO keyword sink (visually hidden but in the rendered DOM) */}
      <p className="sr-only">
        Antigua Carnival 2026 health recovery remedies. Best energy boosters for T-Shirt Mas Antigua.
        Natural detox teas in Saint John's. J'ouvert recovery, hydration and stamina from Noyis Africa.
      </p>
    </section>
  );
}

function SlidePanel({ active, children }: { active: boolean; children: React.ReactNode }) {
  return (
    <div
      className={`max-w-3xl transition-all duration-500 ${active ? "opacity-100 translate-y-0" : "pointer-events-none absolute inset-x-4 sm:inset-x-6 opacity-0 translate-y-2"}`}
      aria-hidden={!active}
    >
      {children}
    </div>
  );
}

function Eyebrow({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold">
      {icon} {children}
    </span>
  );
}

function Actions({ children }: { children: React.ReactNode }) {
  return <div className="mt-8 flex flex-wrap gap-3">{children}</div>;
}

function WhatsAppLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-md border border-white/40 bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur hover:bg-white/20"
    >
      <MessageCircle className="h-4 w-4" /> {label}
    </a>
  );
}
