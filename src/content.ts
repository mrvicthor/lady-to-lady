// All site copy and media live here so the components stay presentational.
// Swap the image imports for your full-resolution originals.
import logo from "./assets/logo.png";
import heroWorship from "./assets/hero-worship.jpg";
import heroChoir from "./assets/hero-choir.jpg";
import sandraNelson from "./assets/sandra-nelson.jpg";
import genOkpala from "./assets/gen-okpala.jpg";
import flyer2026 from "./assets/conference-2026-flyer.jpg";

export type Video = { youtubeId: string; title: string };

export const brand = {
  name: "Lady to Lady Global",
  logo,
  tagline: "Where the uncommon becomes common",
  intro:
    "An annual fellowship conference where women dream again, rise to their calling and step into their God-given assignment.",
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Vision", href: "#vision" },
  { label: "Gallery", href: "/gallery" },
  { label: "Livestream", href: "/livestream" },
  { label: "Testimony", href: "/testimony" },
];

// Registration is at the door for Conference 2026, so Register points to the event details
export const registerHref = "#conference";
export const livestreamHref = "/livestream";

export const heroSlides = [
  {
    src: heroWorship,
    alt: "A woman in white worshipping with arms open on stage",
  },
  { src: heroChoir, alt: "Women from the Lady to Lady choir singing" },
];

export const about = {
  paragraphs: [
    "Lady to Lady conference has given many ladies not only the audacity to dream again but also to boldly rise up to their calling and become all that they were destined to be, wherever they are positioned in fulfilling their God-given assignment here on earth.",
    "The atmosphere and the women you meet during these conferences leave you inspired, encouraged and ready to fine-tune your focus on the things that matter in your life — your God-given purpose here on earth.",
  ],
  readMoreHref: "/about",
  // TODO: confirm each YouTube ID against the videos on the current site
  video: {
    youtubeId: "SMyuV7pUPLc",
    title: "Lady to Lady Choir — Arise (official music video)",
  } satisfies Video,
};

export const vision =
  "Our vision is to raise generations that will represent Christ, live for Christ, change nations, and through us many will come to love Christ.";

export const pillars: { title: string; body: string[]; video: Video }[] = [
  {
    title: "Mission statement",
    body: [
      "Our mission is to raise ladies globally through our fellowship conferences to acknowledge the power within them, to have the audacity to dream and live again.",
      "To boldly rise up to their calling and become all that they have been destined to be, fulfilling their God-given assignment on earth.",
    ],
    video: { youtubeId: "SMyuV7pUPLc", title: "Overflow 2020" },
  },
  {
    title: "Lady to Lady Global Conference",
    body: [
      "An annual conference where we believe in the power of fellowship — that uncommon things happen and changes take place when we gather to fellowship with one another and with the Holy Spirit.",
    ],
    video: { youtubeId: "SMyuV7pUPLc", title: "L2L 2020" },
  },
];

export const speakers = [
  { name: "Sandra Nelson", image: sandraNelson },
  { name: "Gen Okpala", image: genOkpala },
];

export const socials = [
  { label: "Facebook", href: "https://facebook.com/", icon: "facebook" },
  { label: "X (Twitter)", href: "https://x.com/", icon: "x" },
  { label: "Instagram", href: "https://instagram.com/", icon: "instagram" },
  { label: "LinkedIn", href: "https://linkedin.com/", icon: "linkedin" },
] as const;

// ── Upcoming conference banner ──────────────────────────────────────────

export type BannerSlide =
  | { kind: "flyer"; src: string; alt: string }
  | { kind: "photo"; src: string; alt: string; caption: string };

export const conference = {
  title: "Lady to Lady Global Conference 2026",
  theme: "Yahweh",
  scripture: {
    ref: "Psalm 83:18",
    text: "Then they'll know your name is Yahweh — that you alone are the Lord.",
  },
  // 31 Oct 2026 is after the clocks go back, so London time = UTC
  startsAt: "2026-10-31T15:00:00Z",
  endsAt: "2026-10-31T19:00:00Z",
  dateLabel: "Saturday 31 October 2026",
  doorsOpen: "2:30pm",
  timeLabel: "3pm – 7pm",
  venue: {
    name: "Oasis Academy Shirley Park",
    address: "Shirley Road, Croydon CR9 7AL",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Oasis+Academy+Shirley+Park+Shirley+Road+Croydon+CR9+7AL",
  },
  perks: ["Entry is free", "Free parking", "Register at the door on the day"],
  slides: [
    {
      kind: "flyer",
      src: flyer2026,
      alt: "Lady to Lady Global Conference 2026 flyer. Theme: Yahweh, Psalm 83:18. Saturday 31 October 2026, doors open 2:30pm, event 3pm to 7pm, Oasis Academy Shirley Park, Croydon CR9 7AL. Entry is free, free parking, register at the door.",
    },
    {
      kind: "photo",
      src: heroWorship,
      alt: "A woman worshipping on stage",
      caption: "An afternoon of worship, word and fellowship",
    },
    {
      kind: "photo",
      src: heroChoir,
      alt: "The Lady to Lady choir singing",
      caption: "Bring a friend — entry is free",
    },
  ] as BannerSlide[],
};
