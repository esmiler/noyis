import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/components/lang-context";
import { tr, type Lang } from "@/lib/i18n";
import { whatsAppUrl } from "@/lib/whatsapp";
import slide1Img from "@/assets/noyis-lineup-banner.jpeg.asset.json";
import slide2Img from "@/assets/carnival-treasure.png.asset.json";
import slide3Img from "@/assets/treasure-man-carnival.png.asset.json";
import slide4Img from "@/assets/noyis-cola-antigua.jpeg.asset.json";
import slide5Img from "@/assets/noyis-cover.png.asset.json";

const AUTO_MS = 4000;

const COCA_MSG =
  "Hello NOYIS AFRICA, I'd like to order the exclusive African-bottled Coca-Cola (case of 24) for pickup or delivery in Antigua. Please send me the total price and availability. Thank you!";
const STAMINA_MSG =
  "Hello NOYIS AFRICA, I'd like to order the Carnival Stamina Combo (Treasure Man + Treasure Herbs + Treasure Woman) for pickup at Lower Nevis Street, St. John's. Please send total pricing. Thank you!";

type CTAType = "link" | "whatsapp";
interface Slide {
  key: string;
  img: string;
  titleKey: keyof Parameters<typeof tr>[0] extends never ? string : string;
  subKey: string;
  ctaKey: string;
  altKey: string;
  ctaType: CTAType;
  to?: string;
  search?: Record<string, string>;
  whatsapp?: string;
}

const SLIDES: Slide[] = [
  {
    key: "s1",
    img: slide1Img.url,
    titleKey: "slide1_title",
    subKey: "slide1_sub",
    ctaKey: "slide1_cta",
    altKey: "slide1_alt",
    ctaType: "link",
    to: "/treasure",
  },
  {
    key: "s2",
    img: slide2Img.url,
    titleKey: "slide2_title",
    subKey: "slide2_sub",
    ctaKey: "slide2_cta",
    altKey: "slide2_alt",
    ctaType: "link",
    to: "/products",
    search: { cat: "natural-wellness" },
  },
  {
    key: "s3",
    img: slide3Img.url,
    titleKey: "slide3_title",
    subKey: "slide3_sub",
    ctaKey: "slide3_cta",
    altKey: "slide3_alt",
    ctaType: "link",
    to: "/products",
    search: { cat: "natural-wellness" },
  },
  {
    key: "s4",
    img: slide4Img.url,
    titleKey: "slide4_title",
    subKey: "slide4_sub",
    ctaKey: "slide4_cta",
    altKey: "slide4_alt",
    ctaType: "whatsapp",
    whatsapp: COCA_MSG,
  },
  {
    key: "s5",
    img: slide5Img.url,
    titleKey: "slide5_title",
    subKey: "slide5_sub",
    ctaKey: "slide5_cta",
    altKey: "slide5_alt",
    ctaType: "whatsapp",
    whatsapp: STAMINA_MSG,
  },
];

export function CarnivalHero() {
  const { lang } = useLang();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = () => setReduced(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), AUTO_MS);
    return () => clearInterval(id);
  }, [paused, reduced]);

  const go = (n: number) => setIndex((n + SLIDES.length) % SLIDES.length);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
    touchX.current = null;
  };

  return (
    <section
      aria-label="Noyis Africa featured highlights — Antigua Carnival 2026"
      className="relative isolate overflow-hidden bg-transparent"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Slides */}
      <div className="relative w-full h-[60vh] min-h-[340px] max-h-[420px] sm:max-h-[480px]">
        {SLIDES.map((s, i) => {
          const active = i === index;
          return (
            <div
              key={s.key}
              className={`absolute inset-0 transition-opacity duration-700 ease-out ${active ? "opacity-100" : "opacity-0"}`}
              aria-hidden={!active}
            >
              <img
                src={s.img}
                alt={tr(s.altKey as never, lang as Lang)}
                className="h-full w-full object-contain"
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
              />
              {/* Bottom darkening gradient for legibility under text */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
            </div>
          );
        })}

        {/* Text overlays */}
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:pb-24">
            {SLIDES.map((s, i) => {
              const active = i === index;
              const Heading = i === 0 ? "h1" : "h2";
              return (
                <div
                  key={s.key}
                  className={`max-w-3xl transition-all duration-500 ${active ? "relative opacity-100 translate-y-0" : "pointer-events-none absolute opacity-0 translate-y-3"}`}
                  aria-hidden={!active}
                >
                  <Heading className="font-display text-3xl font-semibold leading-[1.05] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] sm:text-5xl lg:text-6xl">
                    {tr(s.titleKey as never, lang as Lang)}
                  </Heading>
                  <p className="mt-5 max-w-2xl text-base text-white/90 drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)] sm:text-lg">
                    {tr(s.subKey as never, lang as Lang)}
                  </p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    {s.ctaType === "link" ? (
                      <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90">
                        <Link to={s.to!} search={s.search as never}>
                          {tr(s.ctaKey as never, lang as Lang)} <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    ) : (
                      <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90">
                        <a href={whatsAppUrl(s.whatsapp!)} target="_blank" rel="noreferrer">
                          <MessageCircle className="h-4 w-4" />
                          {tr(s.ctaKey as never, lang as Lang)}
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Controls */}
        <div className="absolute inset-x-0 bottom-4 z-10 flex items-center justify-center gap-3 sm:bottom-6">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => go(index - 1)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur transition hover:bg-black/50"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2" role="tablist" aria-label="Slides">
            {SLIDES.map((s, i) => (
              <button
                key={s.key}
                role="tab"
                aria-selected={i === index}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => go(i)}
                className={`h-2 rounded-full transition-all ${i === index ? "w-8 bg-gold" : "w-2 bg-white/50 hover:bg-white/80"}`}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => go(index + 1)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur transition hover:bg-black/50"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* SEO/AEO keyword sink */}
      <p className="sr-only">
        Antigua Carnival 2026 health recovery. Natural wellness in Saint John. Treasure Man Antigua,
        Treasure Herbs J'ouvert recovery, Treasure Woman stamina. African-bottled Coca-Cola wholesale
        Caribbean. Noyis Africa Lower Nevis Street St. John's wholesale and retail warehouse.
      </p>
    </section>
  );
}
