import { about } from "../content";
import YouTubeFacade from "./YouTubeFacade";

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-2 md:gap-16 md:px-8">
        <div>
          <h2 className="font-display text-5xl font-semibold tracking-tight md:text-6xl">
            About us
          </h2>
          <div className="mt-6 max-w-136 space-y-5 text-[17px] leading-[1.75] text-plum-soft">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <a
            href={about.readMoreHref}
            className="mt-8 inline-block rounded-full border-2 border-plum px-6 py-3 font-bold transition-colors hover:bg-plum hover:text-linen"
          >
            Read our story
          </a>
        </div>
        <YouTubeFacade
          {...about.video}
          className="shadow-[0_30px_60px_-30px_rgb(43_26_47/0.45)]"
        />
      </div>
    </section>
  );
}
