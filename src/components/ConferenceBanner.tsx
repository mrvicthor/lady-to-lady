import { useCallback, useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type PanInfo,
} from "motion/react";
import {
  CalendarDays,
  CalendarPlus,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
} from "lucide-react";
import { conference } from "../content";

const SLIDE_MS = 7000;
const ease = [0.22, 1, 0.36, 1] as const;

function daysUntil(iso: string) {
  const diff = new Date(iso).getTime() - Date.now();
  return Math.ceil(diff / 86_400_000);
}

function downloadIcs() {
  const fmt = (iso: string) => iso.replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Lady to Lady Global//Conference//EN",
    "BEGIN:VEVENT",
    `UID:l2l-conference-${fmt(conference.startsAt)}@ladytoladyglobal.org`,
    `DTSTAMP:${fmt(new Date().toISOString())}`,
    `DTSTART:${fmt(conference.startsAt)}`,
    `DTEND:${fmt(conference.endsAt)}`,
    `SUMMARY:${conference.title} — ${conference.theme}`,
    `LOCATION:${conference.venue.name}\\, ${conference.venue.address.replace(/,/g, "\\,")}`,
    `DESCRIPTION:Doors open ${conference.doorsOpen}. Entry is free. Register at the door on the day.`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  const a = Object.assign(document.createElement("a"), {
    href: url,
    download: "lady-to-lady-2026.ics",
  });
  a.click();
  URL.revokeObjectURL(url);
}

export default function ConferenceBanner() {
  const reduce = useReducedMotion();
  const slides = conference.slides;
  const [[index, dir], setState] = useState<[number, 1 | -1]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const days = daysUntil(conference.startsAt);

  const go = useCallback(
    (d: 1 | -1) =>
      setState(([i]) => [(i + d + slides.length) % slides.length, d]),
    [slides.length],
  );

  useEffect(() => {
    if (paused || reduce || slides.length < 2) return;
    const t = window.setTimeout(() => go(1), SLIDE_MS);
    return () => window.clearTimeout(t);
  }, [index, paused, reduce, go, slides.length]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60 || info.velocity.x < -400) go(1);
    else if (info.offset.x > 60 || info.velocity.x > 400) go(-1);
  };

  const slide = slides[index];

  return (
    <section
      id="conference"
      aria-labelledby="conference-title"
      className="bg-sun py-16 md:py-24"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:px-8 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
        {/* Slideshow */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          role="region"
          aria-roledescription="carousel"
          aria-label="Conference 2026"
        >
          <div className="relative aspect-3/2 overflow-hidden rounded-[1.75rem] bg-plum shadow-[0_30px_60px_-28px_rgb(43_26_47/0.55)]">
            <AnimatePresence initial={false} custom={dir}>
              <motion.div
                key={index}
                custom={dir}
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
                variants={{
                  enter: (d: number) => ({ x: `${d * 100}%` }),
                  center: { x: "0%" },
                  exit: (d: number) => ({ x: `${d * -100}%` }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.7, ease }}
                drag={slides.length > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={onDragEnd}
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${slides.length}`}
              >
                <img
                  src={slide.src}
                  alt={slide.alt}
                  draggable={false}
                  className="size-full object-cover select-none"
                />
                {slide.kind === "photo" && (
                  <>
                    <div className="absolute inset-0 bg-linear-to-t from-plum/80 via-plum/10 to-transparent" />
                    <p className="absolute inset-x-6 bottom-6 max-w-md font-display text-3xl leading-tight font-semibold text-linen md:inset-x-8 md:bottom-8 md:text-4xl">
                      {slide.caption}
                    </p>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {slides.length > 1 && (
            <div className="mt-4 flex items-center justify-between">
              <div
                className="flex gap-2"
                role="group"
                aria-label="Choose slide"
              >
                {slides.map((s, i) => (
                  <button
                    key={s.src + i}
                    type="button"
                    onClick={() => setState([i, i > index ? 1 : -1])}
                    aria-label={`Show slide ${i + 1}`}
                    aria-current={i === index}
                    className="relative h-1.5 w-10 overflow-hidden rounded-full bg-plum/20"
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
                  className="grid size-10 place-items-center rounded-full border border-plum/25 transition-colors hover:bg-plum hover:text-sun"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next slide"
                  className="grid size-10 place-items-center rounded-full border border-plum/25 transition-colors hover:bg-plum hover:text-sun"
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Event details as real text, so they're readable on phones and by screen readers */}
        <div>
          {days > 0 && (
            <p className="inline-block rounded-full bg-plum px-4 py-1.5 text-sm font-bold text-sun">
              {days === 1 ? "Tomorrow" : `${days} days to go`}
            </p>
          )}
          <h2 id="conference-title" className="mt-5 text-lg font-bold">
            {conference.title}
          </h2>
          <p className="font-display text-[clamp(3.5rem,8vw,5.5rem)] leading-[0.95] font-bold tracking-tight">
            {conference.theme}
          </p>
          <blockquote className="mt-3 max-w-sm leading-relaxed">
            “{conference.scripture.text}”{" "}
            <cite className="font-semibold not-italic">
              {conference.scripture.ref}
            </cite>
          </blockquote>

          <dl className="mt-8 space-y-4">
            <div className="flex gap-3">
              <dt>
                <CalendarDays className="mt-0.5 size-5" aria-label="Date" />
              </dt>
              <dd className="font-semibold">{conference.dateLabel}</dd>
            </div>
            <div className="flex gap-3">
              <dt>
                <Clock className="mt-0.5 size-5" aria-label="Time" />
              </dt>
              <dd>
                <span className="font-semibold">{conference.timeLabel}</span> ·
                doors open {conference.doorsOpen}
              </dd>
            </div>
            <div className="flex gap-3">
              <dt>
                <MapPin className="mt-0.5 size-5" aria-label="Venue" />
              </dt>
              <dd>
                <a
                  href={conference.venue.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold underline decoration-plum/40 underline-offset-4 hover:decoration-plum"
                >
                  {conference.venue.name}
                </a>
                <br />
                {conference.venue.address}
              </dd>
            </div>
          </dl>

          <ul className="mt-6 flex flex-wrap gap-2">
            {conference.perks.map((perk) => (
              <li
                key={perk}
                className="rounded-full border border-plum/25 px-3.5 py-1.5 text-sm font-semibold"
              >
                {perk}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={downloadIcs}
              className="inline-flex items-center gap-2 rounded-full bg-plum px-6 py-3.5 font-bold text-linen transition-transform hover:-translate-y-0.5"
            >
              <CalendarPlus className="size-5" /> Add to calendar
            </button>
            <a
              href={conference.venue.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border-2 border-plum px-6 py-3.5 font-bold transition-colors hover:bg-plum hover:text-linen"
            >
              Get directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
