import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { vision } from "../content";

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {children}{" "}
    </motion.span>
  );
}

/** The page's one scroll-driven moment: the vision lights up word by word as you read it. */
export default function VisionStatement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.5"],
  });
  const words = vision.split(" ");

  return (
    <section id="vision" className="bg-sun py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <h2 className="text-lg font-bold">Our vision</h2>
        <p
          ref={ref}
          className="mt-6 max-w-5xl font-display text-[clamp(2rem,4.6vw,3.9rem)] leading-[1.12] font-semibold tracking-[-0.01em] text-plum"
        >
          {reduce
            ? vision
            : words.map((w, i) => (
                <Word
                  key={i}
                  progress={scrollYProgress}
                  range={[i / words.length, (i + 1) / words.length]}
                >
                  {w}
                </Word>
              ))}
        </p>
      </div>
    </section>
  );
}
