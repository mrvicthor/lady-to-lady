import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Play } from "lucide-react";
import type { Video } from "../content";

/**
 * Shows a lightweight poster until the visitor presses play,
 * so the page doesn't load several YouTube iframes up front.
 */
export default function YouTubeFacade({
  youtubeId,
  title,
  className = "",
}: Video & { className?: string }) {
  const [playing, setPlaying] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);

  return (
    <div
      className={`relative aspect-video overflow-hidden rounded-[1.75rem] bg-parchment ${className}`}
    >
      <AnimatePresence initial={false} mode="wait">
        {playing ? (
          <motion.iframe
            key="player"
            className="absolute inset-0 size-full"
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        ) : (
          <motion.button
            key="poster"
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${title}`}
            className="group absolute inset-0 text-left"
            exit={{ opacity: 0 }}
          >
            {!posterFailed ? (
              <img
                src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
                alt=""
                loading="lazy"
                onError={() => setPosterFailed(true)}
                className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            ) : (
              <div className="size-full bg-[radial-gradient(circle_at_30%_30%,var(--color-sun)_0%,var(--color-sun-soft)_45%,var(--color-parchment)_100%)]" />
            )}
            <span className="absolute inset-0 bg-linear-to-t from-plum/70 via-plum/10 to-transparent" />
            <span className="absolute top-1/2 left-1/2 grid size-18 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-sun text-plum shadow-lg transition-transform duration-300 group-hover:scale-110">
              <Play className="ml-1 size-7 fill-current" />
            </span>
            <span className="absolute inset-x-5 bottom-4 font-display text-xl font-semibold text-linen md:text-2xl">
              {title}
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
