import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { brand, heroSlides } from "../content";

const ease = [0.22, 1, 0.36, 1] as const;
const SLIDE_MS = 6500;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Parallax: arch image drifts down, sun disc drifts faster, headline lifts away
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const sunY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);

  const go = useCallback(
    (dir: 1 | -1) =>
      setIndex((i) => (i + dir + heroSlides.length) % heroSlides.length),
    [],
  );

  useEffect(() => {
    if (paused || reduce || heroSlides.length < 2) return;
    const t = window.setTimeout(() => go(1), SLIDE_MS);
    return () => window.clearTimeout(t);
  }, [index, paused, reduce, go]);

  const words = brand.tagline.split(" ");

  return (
    <section
      id="home"
      ref={ref}
      className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28"
      aria-label="Welcome"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 md:grid-cols-[1.15fr_0.85fr] md:gap-10 md:px-8">
        <motion.div style={{ y: textY }}>
          <h1 className="font-display text-[clamp(3.25rem,8.5vw,7rem)] leading-[0.92] font-semibold tracking-[-0.02em] text-balance">
            {words.map((word, i) => (
              <span
                key={i}
                className="inline-block overflow-hidden pb-[0.08em] align-bottom"
              >
                <motion.span
                  className="inline-block"
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.08, ease }}
                >
                  {word}
                  {i < words.length - 1 && "\u00a0"}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-7 max-w-md text-lg leading-relaxed text-plum-soft"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {brand.intro}
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.85 }}
          >
            <a
              href="#conference"
              className="rounded-full bg-sun px-7 py-3.5 font-bold text-plum shadow-[0_8px_24px_-10px_rgb(122_92_0/0.6)] transition-transform hover:-translate-y-0.5"
            >
              See Conference 2026 details
            </a>
            <a
              href="#about"
              className="group inline-flex items-center gap-3 rounded-full px-4 py-3.5 font-semibold"
            >
              <span className="grid size-9 place-items-center rounded-full border border-plum/20 transition-colors group-hover:bg-plum group-hover:text-linen">
                <Play className="size-4 fill-current" />
              </span>
              Watch the choir
            </a>
          </motion.div>
        </motion.div>

        <div
          className="relative mx-auto w-full max-w-104"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          {/* Sunrise disc behind the arch */}
          <motion.div
            aria-hidden
            style={{ y: sunY }}
            className="absolute -top-10 -left-12 size-56 rounded-full bg-sun md:-left-20 md:size-72"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.1, ease }}
          />

          <motion.div
            className="relative aspect-4/5 overflow-hidden rounded-t-full rounded-b-4xl bg-parchment ring-1 ring-plum/10"
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 1.1, delay: 0.25, ease }}
            role="region"
            aria-roledescription="carousel"
            aria-label="Conference moments"
          >
            <motion.div
              style={{ y: imageY }}
              className="absolute inset-y-[-12%] inset-x-0"
            >
              <AnimatePresence initial={false}>
                <motion.img
                  key={index}
                  src={heroSlides[index].src}
                  alt={heroSlides[index].alt}
                  className="absolute inset-0 size-full object-cover"
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    opacity: { duration: 0.9 },
                    scale: { duration: SLIDE_MS / 1000 + 1, ease: "linear" },
                  }}
                />
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {heroSlides.length > 1 && (
            <div className="mt-5 flex items-center justify-between">
              <div
                className="flex gap-2"
                role="group"
                aria-label="Choose slide"
              >
                {heroSlides.map((s, i) => (
                  <button
                    key={s.alt}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Show slide ${i + 1}`}
                    aria-current={i === index}
                    className="relative h-1.5 w-10 overflow-hidden rounded-full bg-plum/15"
                  >
                    {i === index && (
                      <motion.span
                        key={`${index}-${paused}`}
                        className="absolute inset-y-0 left-0 bg-plum"
                        initial={{ width: reduce || paused ? "100%" : "0%" }}
                        animate={{ width: "100%" }}
                        transition={{
                          duration: reduce || paused ? 0 : SLIDE_MS / 1000,
                          ease: "linear",
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous slide"
                  className="grid size-10 place-items-center rounded-full border border-plum/20 transition-colors hover:bg-plum hover:text-linen"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next slide"
                  className="grid size-10 place-items-center rounded-full border border-plum/20 transition-colors hover:bg-plum hover:text-linen"
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
