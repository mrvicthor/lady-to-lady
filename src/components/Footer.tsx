import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import { brand, navLinks, socials } from "../content";
import SocialIcon from "./SocialIcon";

export default function Footer() {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  async function handleSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    setStatus("sending");
    // TODO: send `email` to your newsletter provider (Mailchimp, ConvertKit, a server action, etc.)
    void email;
    await new Promise((r) => setTimeout(r, 600));
    setStatus("done");
  }

  return (
    <footer className="border-t-4 border-sun bg-parchment pb-[env(safe-area-inset-bottom,0px)]">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-[1.2fr_0.8fr_1.4fr] md:px-8">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={brand.logo}
              alt=""
              className="size-11 rounded-full ring-2 ring-sun"
            />
            <span className="font-display text-2xl font-semibold">
              {brand.name}
            </span>
          </div>
          <p className="mt-4 max-w-xs leading-relaxed text-plum-soft">
            {brand.tagline}.
          </p>
          <ul className="mt-6 flex gap-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid size-11 place-items-center rounded-full border border-plum/15 transition-colors hover:bg-plum hover:text-linen"
                >
                  <SocialIcon name={s.icon} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-bold">Explore</h2>
          <ul className="mt-4 space-y-2.5">
            {navLinks.slice(1).map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="text-plum-soft underline-offset-4 hover:text-plum hover:underline"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-bold">Get conference updates</h2>
          <p className="mt-2 text-plum-soft">
            Dates, speakers and livestream links, straight to your inbox.
          </p>
          <AnimatePresence mode="wait" initial={false}>
            {status === "done" ? (
              <motion.p
                key="done"
                role="status"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 flex items-center gap-2 rounded-2xl bg-sun-soft px-4 py-3.5 font-semibold"
              >
                <Check className="size-5" /> You're subscribed. Look out for our
                next update.
              </motion.p>
            ) : (
              <motion.form
                key="form"
                exit={{ opacity: 0 }}
                onSubmit={handleSubscribe}
                className="mt-5 flex flex-col gap-2 sm:flex-row"
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="min-w-0 flex-1 rounded-full border border-plum/20 bg-linen px-5 py-3.5 placeholder:text-plum-soft/60 focus:border-plum focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="rounded-full bg-sun px-6 py-3.5 font-bold transition-transform hover:-translate-y-0.5 disabled:opacity-60"
                >
                  {status === "sending" ? "Subscribing…" : "Subscribe"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-1 border-t border-plum/10 px-5 py-6 text-sm text-plum-soft sm:flex-row sm:justify-between md:px-8">
        <p>
          © {new Date().getFullYear()} Lady to Lady Global. All rights reserved.
        </p>
        <p>Designed by mrvicthor</p>
      </div>
    </footer>
  );
}
