import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { speakers } from "../content";

export default function Speakers() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Alternate portraits drift in opposite directions for a gentle depth effect
  const up = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const down = useTransform(scrollYProgress, [0, 1], [-20, 70]);

  return (
    <section
      ref={ref}
      aria-labelledby="speakers-title"
      className="overflow-hidden bg-parchment py-24 md:py-32"
    >
      <div className="mx-auto max-w-5xl px-5 text-center md:px-8">
        <h2
          id="speakers-title"
          className="mx-auto max-w-2xl font-display text-4xl font-semibold tracking-tight md:text-6xl"
        >
          Powered by personalities of faith
        </h2>

        <ul className="mx-auto mt-16 grid max-w-2xl grid-cols-2 gap-6 md:gap-14">
          {speakers.map((s, i) => (
            <motion.li key={s.name} style={{ y: i % 2 === 0 ? up : down }}>
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute -inset-2 rounded-t-full rounded-b-3xl border-2 border-sun"
                />
                <img
                  src={s.image}
                  alt={`Portrait of ${s.name}`}
                  loading="lazy"
                  className="relative aspect-[3/4] w-full rounded-t-full rounded-b-3xl object-cover"
                />
              </div>
              <p className="mt-5 font-display text-2xl font-semibold md:text-3xl">
                {s.name}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
