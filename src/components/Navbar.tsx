import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { Menu, X } from "lucide-react";
import { brand, navLinks, registerHref } from "../content";

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

const sectionIds = navLinks
  .filter((l) => l.href.startsWith("#"))
  .map((l) => l.href.slice(1));

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(sectionIds);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.3,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)] transition-colors duration-300 ${
        scrolled || open
          ? "bg-linen/90 shadow-[0_1px_0_rgb(43_26_47/0.08)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <motion.div
        aria-hidden
        className="absolute inset-x-0 top-0 h-0.75 origin-left bg-sun"
        style={{ scaleX: progress }}
      />

      <nav
        aria-label="Main"
        className="mx-auto flex h-18 max-w-6xl items-center justify-between px-5 md:px-8"
      >
        <a
          href="#home"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <img
            src={brand.logo}
            alt=""
            className="size-10 rounded-full ring-2 ring-sun"
          />
          <span className="font-display text-xl font-semibold tracking-tight">
            {brand.name}
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = link.href === `#${active}`;
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className="relative rounded-full px-3.5 py-2 text-[15px] font-semibold text-plum-soft transition-colors hover:text-plum"
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-sun-soft"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}
                  <span className={isActive ? "text-plum" : undefined}>
                    {link.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={registerHref}
            className="hidden rounded-full bg-sun px-5 py-2.5 text-[15px] font-bold text-plum transition-transform hover:-translate-y-0.5 active:translate-y-0 sm:inline-block"
          >
            Register
          </a>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="overflow-hidden border-t border-plum/10 lg:hidden"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="mx-auto flex max-w-6xl flex-col px-5 py-4">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 font-display text-2xl font-semibold"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <li className="pt-3 sm:hidden">
                <a
                  href={registerHref}
                  className="block rounded-full bg-sun py-3 text-center font-bold"
                  onClick={() => setOpen(false)}
                >
                  Register
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
