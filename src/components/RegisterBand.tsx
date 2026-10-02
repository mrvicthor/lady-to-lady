import { livestreamHref, registerHref } from "../content";

export default function RegisterBand() {
  return (
    <section aria-labelledby="register-title" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-plum px-8 py-14 text-linen md:px-16 md:py-20">
          <div
            aria-hidden
            className="absolute -right-24 -bottom-32 hidden size-96 rounded-full bg-sun md:block"
          />
          <div className="relative max-w-xl">
            <h2
              id="register-title"
              className="font-display text-4xl leading-[1.05] font-semibold text-balance md:text-6xl"
            >
              Come and gather with us
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-linen/80">
              Entry is free — just register at the door on Saturday 31 October.
              Can't make it to Croydon? Join the livestream from wherever you
              are.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={registerHref}
                className="rounded-full bg-sun px-7 py-3.5 font-bold text-plum transition-transform hover:-translate-y-0.5"
              >
                See event details
              </a>
              <a
                href={livestreamHref}
                className="rounded-full border-2 border-linen/40 px-7 py-3.5 font-bold transition-colors hover:border-linen hover:bg-linen hover:text-plum"
              >
                Watch the livestream
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
