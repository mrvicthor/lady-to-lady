import { pillars } from "../content";
import YouTubeFacade from "./YouTubeFacade";

export default function Mission() {
  return (
    <section
      id="mission"
      aria-label="Our mission and conference"
      className="py-20 md:py-28"
    >
      <div className="mx-auto grid max-w-6xl gap-14 px-5 md:grid-cols-2 md:gap-10 md:px-8">
        {pillars.map((pillar) => (
          <article key={pillar.title}>
            <YouTubeFacade {...pillar.video} />
            <h3 className="mt-8 font-display text-3xl font-semibold md:text-4xl">
              {pillar.title}
            </h3>
            <div className="mt-4 max-w-136 space-y-4 text-[17px] leading-[1.75] text-plum-soft">
              {pillar.body.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
