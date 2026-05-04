import { motion, type Variants } from "framer-motion";
import { useEffect, useMemo, useState, type CSSProperties } from "react";

const COLORS = {
  bg: "#050507",
  orange: "#f4721e",
  steel: "#12121a",
  card: "#14141f",
  text: "rgba(255,255,255,0.92)",
} as const;

const VENUE_NAME = "Endorphin Sport Center";

type Copy = {
  nav: Record<"about" | "services" | "reviews" | "facility" | "contact", string>;
  cta: { join: string; call: string; callNow: string };
  maps: {
    directionsCard: string;
    googleDirections: string;
    appleDirections: string;
    openMap: string;
    pinLabel: string;
  };
  hero: {
    ratingSuffix: string;
    headline: string;
    subtitle: string;
    kinetic: string;
  };
  hours: {
    section: string;
    line: string;
    now: string;
  };
  about: {
    kicker: string;
    title: string;
    body: string;
    chips: readonly string[];
  };
  services: { kicker: string; title: string; subtitle: string };
  reviews: { kicker: string; title: string; subtitle: string };
  facility: { kicker: string; title: string; subtitle: string };
  contact: {
    addressLabel: string;
    ctaTitle: string;
    ctaSub: string;
  };
  footer: { note: string; tagline: string };
  status: { open: string; closed: string };
  a11y: { openMenu: string; closeMenu: string };
};

const COPY: Record<"tr" | "en", Copy> = {
  tr: {
    nav: {
      about: "Hakkımızda",
      services: "Hizmetler",
      reviews: "Yorumlar",
      facility: "Salon",
      contact: "İletişim",
    },
    cta: {
      join: "Üye Ol",
      call: "Bizi Ara",
      callNow: "Hemen Ara",
    },
    maps: {
      directionsCard: "Yol tarifi",
      googleDirections: "Google Haritalar",
      appleDirections: "Apple Haritalar",
      openMap: "Haritayı aç",
      pinLabel: "Konum: Endorphin Sport Center · Döşemealtı",
    },
    hero: {
      ratingSuffix: "· 167 yorum · Google",
      headline: "Endorfini Hisset",
      subtitle: "Döşemealtı’nda boks ringi, pilates stüdyosu ve yeni nesil ekipman — her seviye için güçlü bir antrenman zeminleri.",
      kinetic: "Boks ringi · Pilates · Ağırlık & makine · Hijyen önceliği · Gece 00:00’a kadar",
    },
    hours: {
      section: "Çalışma saatleri",
      line: "Her gün 06:00 – 00:00",
      now: "Şu an (İstanbul saati)",
    },
    about: {
      kicker: "Kimiz?",
      title: `${VENUE_NAME} hakkında`,
      body:
        "İlgili eğitmenler, güncellenmiş makine parkuru, gerçek boks ringi ve pilates stüdyosu ile temiz — enerjik bir salonda kalıcı rutin oluşturmak için doğru adres.",
      chips: [
        "Profesyonel kadro",
        "Bol ağırlık seçeneği",
        "Pilates stüdyosu",
        "Boks ringi",
        "Düzenli temizlik",
        "Döşemealtı lokasyon",
      ],
    },
    services: {
      kicker: "Üyelerimize",
      title: "Neler sunuyoruz?",
      subtitle: "Tek çatı altında güçlü programa dönüşen net alanlar.",
    },
    reviews: {
      kicker: "Saha sesi",
      title: "4.8 yıldız",
      subtitle: "Google yorumlarından seçtiklerimiz.",
    },
    facility: {
      kicker: "Alanlar",
      title: "Salondaki üç katmanlı deneyim",
      subtitle: "Ring, stüdyo ve ağırlık alanı aynı üyelik içinde uyum içinde çalışır.",
    },
    contact: {
      addressLabel: "Adres",
      ctaTitle: "Bugün ilk adımı at",
      ctaSub:
        "Hemen ara veya seçtiğin harita uygulamasıyla doğrudan yol tarifi al.",
    },
    footer: {
      note: `${VENUE_NAME} · Bahçeyaka, Döşemealtı / Antalya`,
      tagline: `© ${new Date().getFullYear()} · Her gün 06:00 – 00:00`,
    },
    status: { open: "Açık", closed: "Kapalı" },
    a11y: { openMenu: "Menüyü aç", closeMenu: "Menüyü kapat" },
  },
  en: {
    nav: {
      about: "About",
      services: "Services",
      reviews: "Reviews",
      facility: "The floor",
      contact: "Visit",
    },
    cta: {
      join: "Join today",
      call: "Call us",
      callNow: "Call now",
    },
    maps: {
      directionsCard: "Get directions",
      googleDirections: "Google Maps",
      appleDirections: "Apple Maps",
      openMap: "Open map",
      pinLabel: "Location: Endorphin Sport Center · Döşemealtı",
    },
    hero: {
      ratingSuffix: "· 167 reviews · Google",
      headline: "Feel the endorphins",
      subtitle:
        "A boxing ring, a dedicated pilates studio and modern gym floor near Antalya — disciplined training without the fluff.",
      kinetic:
        "Boxing ring · Pilates · Weights · Hygiene first · Open until midnight",
    },
    hours: {
      section: "Opening hours",
      line: "Every day 06:00 – midnight",
      now: "Current time · Istanbul",
    },
    about: {
      kicker: "Meet the gym",
      title: `About ${VENUE_NAME}`,
      body:
        "Thoughtful coaches, refreshed equipment lanes, an honest boxing ring and a calm pilates loft — structured sessions in a space that stays immaculate night after night.",
      chips: [
        "Coach-led sessions",
        "Plates everywhere you need them",
        "Dedicated pilates studio",
        "Full-size boxing ring",
        "Spotless daily turnover",
        "Easy Döşemealtı drop-in",
      ],
    },
    services: {
      kicker: "For members",
      title: "What you train",
      subtitle: "Three rhythm zones stitched into one membership.",
    },
    reviews: {
      kicker: "Word of mouth",
      title: "4.8 on Google",
      subtitle: "Hand-picked excerpts from athletes who already train here.",
    },
    facility: {
      kicker: "Layouts",
      title: "How the club is stitched together",
      subtitle: "Cardio-adjacent strength, boxing intensity and restorative pilates coexist on one timetable.",
    },
    contact: {
      addressLabel: "Address",
      ctaTitle: "Book your trial move",
      ctaSub: "Dial the desk or jump straight into your preferred maps app.",
    },
    footer: {
      note: `${VENUE_NAME} · Bahçeyaka · Döşemealtı / Antalya`,
      tagline: `© ${new Date().getFullYear()} · Open daily · 06:00 – midnight`,
    },
    status: { open: "Open now", closed: "Closed · See hours" },
    a11y: { openMenu: "Open menu", closeMenu: "Close menu" },
  },
} as const;

type Lang = keyof typeof COPY;

const SERVICES = [
  {
    emoji: "🥊",
    tr: { title: "Boks ringi", desc: "Hız, güç ve reflekste ölçülebilir ilerleme." },
    en: {
      title: "Boxing ring",
      desc: "Measurable bursts of power wrapped in disciplined footwork drills.",
    },
  },
  {
    emoji: "🧘",
    tr: { title: "Pilates stüdyosu", desc: "Kontrollü tempo ile denge ve core gücünü yükselt." },
    en: {
      title: "Pilates studio",
      desc: "Slow, surgical tempo lifts balance, posture and deep core stamina.",
    },
  },
  {
    emoji: "🏋️",
    tr: { title: "Ağırlık & makine", desc: "Yeni nesil istasyonlarla hipertrofi ve kuvvet blokları." },
    en: {
      title: "Strength floor",
      desc: "Plate-loaded rigs and slick machines programmed for hypertrophy blocks.",
    },
  },
  {
    emoji: "❄️",
    tr: { title: "Hijyen", desc: "Her vardiya sonrası dezenfeksiyon ve ferah havalandırma." },
    en: {
      title: "Hygiene",
      desc: "Shift-based wipe-down rituals keep the airflow as crisp as the plates.",
    },
  },
  {
    emoji: "👨‍🏫",
    tr: { title: "Eğitmen desteği", desc: "Hedef kartı çıkarılır, güvenli yükleme garanti altına alınır." },
    en: {
      title: "Coaching cues",
      desc: "Coaches blueprint your block so every set stays accountable.",
    },
  },
  {
    emoji: "🕕",
    tr: {
      title: "Esnek saat",
      desc: "Gece rakamları yükselene kadar açık günlük bloklar.",
    },
    en: {
      title: "Extended hours",
      desc: "06:00 to midnight slices mean commuters never sprint the warm-up.",
    },
  },
] as const;

const REVIEWS: Record<
  Lang,
  readonly { stars: number; text: string; author: string }[]
> = {
  tr: [
    {
      stars: 5,
      text:
        "Eğitmenler çok ilgili, salon hijyenik ve ekipmanlar yeni. Kesinlikle tavsiye ederim.",
      author: "Üye",
    },
    {
      stars: 5,
      text: "Bol plaka seçeneği ve ring alanı süper.",
      author: "Antalyalı sporcu",
    },
    {
      stars: 5,
      text: "Pilates stüdyosu sessiz ve ferah.",
      author: "Pilates tutkunu",
    },
  ],
  en: [
    {
      stars: 5,
      text:
        "The gym is really clean, machines are practically new and they hoard weight plates smarter than anywhere else downtown.",
      author: "bobo",
    },
    {
      stars: 5,
      text: "First class 🤌🏼💪🏼 Coaches actually watch your reps instead of staring at IG.",
      author: "Mustafa K.",
    },
    {
      stars: 5,
      text:
        "Pilates nook is quieter than yoga studios costing twice as much. Worth the drive.",
      author: "Remote worker",
    },
  ],
};

const FACILITY_MODULES: Record<
  Lang,
  readonly { title: string; body: string; metric: string }[]
> = {
  tr: [
    {
      title: "Fight hattı",
      body: "Ring çevresi bag ve eldiven seçenekleriyle patlayıcı kondisyon blokları için hazır.",
      metric: "+25 m² ring",
    },
    {
      title: "Uzun koridor",
      body: "Kardiyo ve güç blokları sırayla bağlanarak hipertrofi günleri için zaman kazanılır.",
      metric: "3 istasyon sırası",
    },
    {
      title: "Pilates üst kat",
      body: "Reformer yoktur; yer matı ve barre çizgisiyle kontrollü seans için ideal.",
      metric: "Stüdyo modları",
    },
  ],
  en: [
    {
      title: "Fight runway",
      body: "A ring apron lined with hanging bags converts into explosive cardio waves fast.",
      metric: "+25 sqm apron",
    },
    {
      title: "Throughput spine",
      body: "Cardio primes strength lanes so leg days never bottleneck at the smith rack.",
      metric: "triple station flow",
    },
    {
      title: "Quiet loft pilates",
      body: "No reformer clutter — just barre anchors and floor springs for tactile feedback.",
      metric: "modular studio cues",
    },
  ],
};

function getIstanbulMinutesNow(): number {
  const parts = new Intl.DateTimeFormat("tr-TR", {
    timeZone: "Europe/Istanbul",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? "0");
  return hour * 60 + minute;
}

function getOpenStatus(labels: { open: string; closed: string }) {
  const m = getIstanbulMinutesNow();
  const openAt = 6 * 60;
  const closeAt = 24 * 60;
  const isOpen = m >= openAt && m < closeAt;
  return { isOpen, label: isOpen ? labels.open : labels.closed };
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
};

const heroStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

function StarIcon({
  className,
  filled,
  style,
}: {
  className?: string;
  filled?: boolean;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      style={style}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3.2l2.7 5.6 6.2.9-4.5 4.3 1.1 6.1L12 17.9 6.5 20.1 7.6 14 3.1 9.7l6.2-.9L12 3.2z" />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M6 6l12 12M18 6l-12 12" />
    </svg>
  );
}

export default function EndorphinSportLanding() {
  const address =
    "Bahçeyaka Mah. 28. Sk. No:3, 07190 Döşemealtı/Antalya";
  const phoneDisplay = "0553 745 02 54";
  const phoneTel = "tel:+905537450254";

  const mapQuery = `${VENUE_NAME}, ${address}`;

  const googleDirectionsUrl = useMemo(() => {
    const d = encodeURIComponent(mapQuery);
    return `https://www.google.com/maps/dir/?api=1&destination=${d}`;
  }, [mapQuery]);

  const appleDirectionsUrl = useMemo(() => {
    const d = encodeURIComponent(mapQuery);
    return `https://maps.apple.com/?dirflg=d&daddr=${d}`;
  }, [mapQuery]);

  const [lang, setLang] = useState<Lang>("tr");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /** Keep hook order stable: derive map urls after lang exists */
  const mapsEmbedResolved = useMemo(() => {
    const q = encodeURIComponent(mapQuery);
    const hl = lang === "tr" ? "tr" : "en";
    return `https://www.google.com/maps?q=${q}&hl=${hl}&z=17&output=embed`;
  }, [mapQuery, lang]);

  const [openStatus, setOpenStatus] = useState(() =>
    getOpenStatus(COPY[lang].status),
  );

  const t = COPY[lang];

  useEffect(() => {
    document.documentElement.lang = lang === "tr" ? "tr" : "en";
  }, [lang]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpenStatus(getOpenStatus(COPY[lang].status)), [lang]);

  useEffect(() => {
    const id = window.setInterval(
      () => setOpenStatus(getOpenStatus(COPY[lang].status)),
      60_000,
    );
    return () => window.clearInterval(id);
  }, [lang]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
    };
  }, [mobileOpen]);

  const navLinks: { href: string; label: string }[] = [
    { href: "#hakkimizda", label: t.nav.about },
    { href: "#hizmetler", label: t.nav.services },
    { href: "#yorumlar", label: t.nav.reviews },
    { href: "#salon", label: t.nav.facility },
    { href: "#iletisim", label: t.nav.contact },
  ];

  return (
    <div
      className="min-h-screen scroll-smooth font-sans antialiased"
      style={{ background: COLORS.bg, color: COLORS.text }}
    >
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.45]"
        aria-hidden
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at 50% 0%,black,transparent 70%)",
        }}
      />

      <header
        className={`sticky top-0 z-50 backdrop-blur-md transition-[box-shadow] supports-[backdrop-filter]:bg-black/30 ${
          scrolled ? "shadow-[0_16px_50px_-30px_rgba(0,0,0,0.95)]" : ""
        }`}
        style={{
          borderBottom: scrolled ? "1px solid rgba(244,114,30,0.14)" : "1px solid transparent",
          backgroundColor: scrolled ? "rgba(5,5,7,0.82)" : "rgba(5,5,7,0.55)",
        }}
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-6">
          <a
            href="#hero"
            className="select-none inline-flex flex-col gap-0.5 leading-none"
            onClick={() => setMobileOpen(false)}
          >
            <span
              className="text-lg font-black tracking-[0.26em] sm:text-xl"
              style={{ color: COLORS.orange }}
            >
              ENDORPHIN
            </span>
            <span className="text-[11px] font-medium uppercase tracking-[0.42em] text-white/65">
              {VENUE_NAME.replace("Endorphin ", "")}
            </span>
          </a>

          <nav className="hidden items-center gap-6 lg:gap-7 md:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/58 transition-colors hover:text-white"
              >
                {l.label}
              </a>
            ))}
            <div className="ml-3 flex items-center rounded-full border border-white/12 bg-black/35 p-0.5 shadow-inner shadow-black/50">
              <button
                type="button"
                onClick={() => setLang("tr")}
                aria-pressed={lang === "tr"}
                className={`rounded-full px-3 py-1 text-[10px] font-black transition ${
                  lang === "tr" ? "bg-white text-black" : "text-white/50"
                }`}
              >
                TR
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                aria-pressed={lang === "en"}
                className={`rounded-full px-3 py-1 text-[10px] font-black transition ${
                  lang === "en" ? "bg-white text-black" : "text-white/50"
                }`}
              >
                EN
              </button>
            </div>
          </nav>

          <div className="h-11 w-11 md:hidden" />
        </div>

        {mobileOpen ? (
          <div className="fixed inset-0 z-[60] bg-[#07070c]/95 backdrop-blur-2xl md:hidden">
            <div className="mx-auto flex h-full w-full max-w-6xl flex-col px-5 py-4 sm:px-6">
              <div
                className="flex items-center justify-between border-b border-white/10 pb-4"
                style={{ paddingTop: "max(0px, env(safe-area-inset-top))" }}
              >
                <div>
                  <div
                    className="text-sm font-black tracking-[0.22em]"
                    style={{ color: COLORS.orange }}
                  >
                    ENDORPHIN
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.4em] text-white/55">
                    {VENUE_NAME}
                  </div>
                </div>
                <button
                  type="button"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/12 bg-white/5 text-white"
                  onClick={() => setMobileOpen(false)}
                  aria-label={t.a11y.closeMenu}
                >
                  <CloseIcon className="h-5 w-5" />
                </button>
              </div>
              <div
                className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto py-6"
                style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
              >
                {navLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className="rounded-2xl border border-white/8 bg-white/[0.035] px-5 py-4 text-base font-semibold text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    {l.label}
                  </a>
                ))}
                <div className="mt-2 grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-black/35 p-1">
                  <button
                    type="button"
                    onClick={() => {
                      setLang("tr");
                      setMobileOpen(false);
                    }}
                    className={`rounded-xl py-3 text-[11px] font-black uppercase ${
                      lang === "tr" ? "bg-white text-black shadow" : "text-white/60"
                    }`}
                  >
                    Türkçe
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLang("en");
                      setMobileOpen(false);
                    }}
                    className={`rounded-xl py-3 text-[11px] font-black uppercase ${
                      lang === "en" ? "bg-white text-black shadow" : "text-white/60"
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </header>

      {!mobileOpen ? (
        <button
          type="button"
          aria-label={t.a11y.openMenu}
          className="fixed bottom-5 right-5 z-[80] inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-black/90 text-white shadow-[0_18px_45px_-18px_rgba(0,0,0,0.95)] shadow-black/70 backdrop-blur md:hidden"
          style={{ bottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
          onClick={() => setMobileOpen(true)}
        >
          <MenuIcon className="h-6 w-6" />
        </button>
      ) : null}

      {/* Hero */}
      <section id="hero" className="relative isolate min-h-[90vh] overflow-hidden pt-14">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background: `linear-gradient(120deg, ${COLORS.orange}55 0%, transparent 52%, transparent 100%)`,
          }}
        />
        <div
          className="pointer-events-none absolute -left-28 top-[15%] h-[460px] w-[460px] rounded-full blur-3xl"
          aria-hidden
          style={{ background: `${COLORS.orange}66` }}
        />
        <div
          className="pointer-events-none absolute -right-10 bottom-[8%] h-[340px] w-[340px] rounded-full blur-3xl"
          aria-hidden
          style={{ background: "#2b1744aa" }}
        />

        <div className="relative mx-auto grid min-h-[78vh] w-full max-w-6xl gap-12 px-5 pb-20 pt-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.32 }}
            variants={heroStagger}
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex flex-wrap items-center gap-3 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-sm font-semibold text-white"
            >
              <StarIcon
                className="h-4 w-4"
                filled
                style={{ color: COLORS.orange }}
              />
              <span className="font-black">4.8</span>
              <span className="text-white/55">{t.hero.ratingSuffix}</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-8 text-4xl font-black leading-[1.02] tracking-tight text-white sm:text-6xl md:text-7xl"
            >
              {t.hero.headline}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-base font-medium leading-8 text-white/72 sm:text-lg"
            >
              {t.hero.subtitle}
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="mt-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45"
            >
              {t.hero.kinetic}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <a
                href="#iletisim"
                className="inline-flex items-center justify-center rounded-2xl px-8 py-4 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:brightness-110"
                style={{ backgroundColor: COLORS.orange }}
              >
                {t.cta.join}
              </a>
              <a
                href={phoneTel}
                className="inline-flex items-center justify-center rounded-2xl border border-white/40 px-8 py-4 text-sm font-black uppercase tracking-[0.14em] text-white transition hover:bg-white/[0.05]"
              >
                {t.cta.call}
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:pb-4"
          >
            <motion.div
              variants={fadeUp}
              className="rounded-[1.75rem] border border-white/10 p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.85)]"
              style={{ backgroundColor: COLORS.card }}
            >
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-white/40">
                {VENUE_NAME}
              </p>
              <p className="mt-3 text-sm leading-7 text-white/70">{address}</p>
              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <a
                  href={googleDirectionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-1 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-center text-[11px] font-black uppercase tracking-[0.12em] text-white transition hover:border-white/30"
                >
                  {t.maps.googleDirections}
                </a>
                <a
                  href={appleDirectionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-1 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-center text-[11px] font-black uppercase tracking-[0.12em] text-white transition hover:border-white/30"
                >
                  {t.maps.appleDirections}
                </a>
              </div>
            </motion.div>
            <motion.div
              variants={fadeUp}
              className="rounded-[1.75rem] border border-white/10 p-6"
              style={{ backgroundColor: COLORS.steel }}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.35em] text-white/40">
                    {t.hours.section}
                  </p>
                  <p className="mt-2 text-lg font-black text-white">{t.hours.line}</p>
                </div>
                <span
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-black uppercase"
                  style={{
                    background: openStatus.isOpen
                      ? "rgba(244,114,30,0.18)"
                      : "rgba(255,255,255,0.07)",
                    border: `1px solid ${openStatus.isOpen ? "rgba(244,114,30,0.45)" : "rgba(255,255,255,0.12)"}`,
                    color: openStatus.isOpen ? COLORS.orange : "rgba(255,255,255,0.55)",
                  }}
                >
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{
                      background: openStatus.isOpen
                        ? COLORS.orange
                        : "rgba(255,255,255,0.35)",
                    }}
                  />
                  {openStatus.label}
                </span>
              </div>
              <p className="mt-4 text-xs text-white/50">{t.hours.now}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section id="hakkimizda" className="relative py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeUp}
              className="relative overflow-hidden rounded-[2rem] border border-white/10 p-8 sm:p-10"
              style={{ backgroundColor: COLORS.steel }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-30"
                aria-hidden
                style={{
                  background: `conic-gradient(from 120deg, ${COLORS.orange}55, transparent 45%, ${COLORS.orange}22, transparent 80%)`,
                }}
              />
              <div className="relative space-y-6">
                <div className="flex items-end justify-between gap-6">
                  <div>
                    <p
                      className="text-[10px] font-black uppercase tracking-[0.4em]"
                      style={{ color: COLORS.orange }}
                    >
                      {t.about.kicker}
                    </p>
                    <p className="mt-3 text-4xl font-black leading-none text-white">
                      06
                      <span className="text-white/25">—</span>
                      24
                    </p>
                    <p className="mt-2 text-xs uppercase tracking-[0.3em] text-white/45">
                      {lang === "tr" ? "Günlük blok" : "Daily block"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-5xl font-black text-white">4.8</p>
                    <p className="text-[10px] font-black uppercase tracking-[0.35em] text-white/40">
                      Google
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center text-[10px] font-black uppercase tracking-[0.2em] text-white/55">
                  <div className="rounded-2xl border border-white/10 bg-black/30 py-4">
                    {lang === "tr" ? "Ring" : "Ring"}
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/30 py-4">
                    {lang === "tr" ? "Pilates" : "Pilates"}
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/30 py-4">
                    {lang === "tr" ? "Güç" : "Strength"}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
            >
              <motion.p
                variants={fadeUp}
                className="text-[10px] font-black uppercase tracking-[0.4em]"
                style={{ color: COLORS.orange }}
              >
                {t.about.kicker}
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="mt-4 text-3xl font-black text-white sm:text-4xl"
              >
                {t.about.title}
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="mt-6 text-base leading-8 text-white/68"
              >
                {t.about.body}
              </motion.p>
              <motion.div
                variants={fadeUp}
                className="mt-8 flex flex-wrap gap-2"
              >
                {t.about.chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/70"
                  >
                    {chip}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="hizmetler" className="border-t border-white/[0.06] py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="text-[10px] font-black uppercase tracking-[0.4em]"
              style={{ color: COLORS.orange }}
            >
              {t.services.kicker}
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mt-3 text-3xl font-black text-white sm:text-4xl"
            >
              {t.services.title}
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-3 max-w-2xl text-sm text-white/55">
              {t.services.subtitle}
            </motion.p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
          >
            {SERVICES.map((s, i) => {
              const block = lang === "tr" ? s.tr : s.en;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ y: -3, transition: { duration: 0.22 } }}
                  className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.07] p-6"
                  style={{ backgroundColor: COLORS.card }}
                >
                  <div
                    className="absolute left-0 top-0 h-1 w-full"
                    style={{ backgroundColor: COLORS.orange }}
                  />
                  <div className="text-3xl">{s.emoji}</div>
                  <h3 className="mt-4 text-lg font-black text-white">{block.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/60">{block.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Reviews */}
      <section id="yorumlar" className="py-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="text-[10px] font-black uppercase tracking-[0.4em]"
              style={{ color: COLORS.orange }}
            >
              {t.reviews.kicker}
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mt-3 text-3xl font-black text-white"
            >
              {t.reviews.title}
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-2 text-sm text-white/55">
              {t.reviews.subtitle}
            </motion.p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            variants={stagger}
            className="mt-10 flex gap-5 overflow-x-auto pb-3 [-webkit-overflow-scrolling:touch]"
          >
            {REVIEWS[lang].map((r, i) => (
              <motion.article
                key={i}
                variants={fadeUp}
                className="min-w-[280px] max-w-sm shrink-0 snap-start rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 sm:min-w-[320px]"
              >
                <div className="flex gap-1" aria-label={`${r.stars} stars`}>
                  {Array.from({ length: r.stars }).map((_, j) => (
                    <StarIcon
                      key={j}
                      className="h-4 w-4"
                      filled
                      style={{ color: COLORS.orange }}
                    />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-7 text-white/78">{r.text}</p>
                <div className="mt-5 text-[10px] font-black uppercase tracking-[0.32em] text-white/45">
                  — {r.author}
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Facility (text-only) */}
      <section id="salon" className="border-t border-white/[0.06] py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.22 }}
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.p
              variants={fadeUp}
              className="text-[10px] font-black uppercase tracking-[0.4em]"
              style={{ color: COLORS.orange }}
            >
              {t.facility.kicker}
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mt-3 text-3xl font-black text-white sm:text-4xl"
            >
              {t.facility.title}
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-3 text-sm text-white/55">
              {t.facility.subtitle}
            </motion.p>
          </motion.div>

          <div className="mt-12 space-y-4">
            {FACILITY_MODULES[lang].map((mod, i) => (
              <motion.div
                key={mod.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                className="flex flex-col gap-4 rounded-[1.75rem] border border-white/10 bg-gradient-to-r from-white/[0.04] to-transparent p-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.35em] text-white/40">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-xl font-black text-white">{mod.title}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-white/62">
                    {mod.body}
                  </p>
                </div>
                <div
                  className="shrink-0 rounded-2xl border border-white/12 px-5 py-3 text-center text-[11px] font-black uppercase tracking-[0.25em] text-white/70"
                  style={{ backgroundColor: COLORS.steel }}
                >
                  {mod.metric}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact + map */}
      <section id="iletisim" className="border-t border-white/[0.06] pb-20 pt-16">
        <div className="mx-auto max-w-6xl space-y-8 px-5 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.28 }}
            variants={fadeUp}
            className="rounded-[2rem] border border-white/10 p-8"
            style={{ backgroundColor: COLORS.steel }}
          >
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-md">
                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-white/45">
                  {t.contact.addressLabel}
                </p>
                <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl">
                  {VENUE_NAME}
                </h2>
                <p className="mt-3 text-sm leading-7 text-white/70">{address}</p>
                <a
                  href={phoneTel}
                  className="mt-5 inline-flex text-lg font-black"
                  style={{ color: COLORS.orange }}
                >
                  {phoneDisplay}
                </a>
                <p className="mt-6 text-[10px] font-black uppercase tracking-[0.35em] text-white/40">
                  {t.maps.pinLabel}
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto lg:flex-col">
                <a
                  href={googleDirectionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-1 items-center justify-center rounded-2xl border border-white/15 bg-black/40 px-6 py-4 text-center text-[11px] font-black uppercase tracking-[0.15em] text-white transition hover:border-white/35 lg:flex-none"
                >
                  {t.maps.googleDirections}
                </a>
                <a
                  href={appleDirectionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-1 items-center justify-center rounded-2xl border border-white/15 bg-black/40 px-6 py-4 text-center text-[11px] font-black uppercase tracking-[0.15em] text-white transition hover:border-white/35 lg:flex-none"
                >
                  {t.maps.appleDirections}
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="overflow-hidden rounded-[2rem] border border-white/10"
            style={{ backgroundColor: COLORS.card, minHeight: 380 }}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-black/40 px-5 py-3">
              <p className="text-[11px] font-black uppercase tracking-[0.25em] text-white/55">
                {VENUE_NAME}
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href={googleDirectionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-white/80 transition hover:bg-white/10"
                >
                  {t.maps.googleDirections}
                </a>
                <a
                  href={appleDirectionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-white/80 transition hover:bg-white/10"
                >
                  {t.maps.appleDirections}
                </a>
              </div>
            </div>
            <iframe
              title={`${VENUE_NAME} — ${t.maps.openMap}`}
              src={mapsEmbedResolved}
              className="h-[360px] w-full sm:h-[420px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/[0.06] pb-24 pt-14">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            variants={fadeUp}
            className="relative overflow-hidden rounded-[2rem] border border-white/10 p-10 sm:p-14"
            style={{
              background: `linear-gradient(125deg, ${COLORS.steel} 0%, #080810 100%)`,
            }}
          >
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-35 blur-3xl"
              style={{ background: COLORS.orange }}
            />
            <div className="relative max-w-2xl">
              <h2 className="text-3xl font-black text-white sm:text-4xl">
                {t.contact.ctaTitle}
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/60">{t.contact.ctaSub}</p>
            </div>
            <div className="relative mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={phoneTel}
                className="inline-flex flex-1 items-center justify-center rounded-2xl px-8 py-4 text-center text-[11px] font-black uppercase tracking-[0.15em] sm:flex-none"
                style={{ backgroundColor: COLORS.orange, color: "#080808" }}
              >
                {t.cta.callNow}
              </a>
              <a
                href={googleDirectionsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex flex-1 items-center justify-center rounded-2xl border border-white/35 px-8 py-4 text-center text-[11px] font-black uppercase tracking-[0.14em] text-white sm:flex-none"
              >
                {t.maps.googleDirections}
              </a>
              <a
                href={appleDirectionsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex flex-1 items-center justify-center rounded-2xl border border-white/35 px-8 py-4 text-center text-[11px] font-black uppercase tracking-[0.14em] text-white sm:flex-none"
              >
                {t.maps.appleDirections}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-white/[0.06] pb-12 pt-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 text-sm text-white/55 sm:px-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="font-semibold text-white/75">{t.footer.note}</div>
          <div className="text-xs text-white/40">{t.footer.tagline}</div>
        </div>
      </footer>
    </div>
  );
}
