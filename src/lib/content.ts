// Canonical site content. Used to seed the database and as a static
// fallback so the site renders fully even when MySQL is unreachable.

export type Accent = "vermilion" | "cobalt" | "sunflower" | "leaf";

export type ProgramContent = {
  slug: string;
  title: string;
  tagline: string;
  body: string;
  accent: Accent;
  order: number;
};

export type ScheduleSlotContent = {
  day: string;
  opens: string;
  closes: string;
  note: string;
  order: number;
};

export const PROGRAMS: ProgramContent[] = [
  {
    slug: "private-seminars",
    title: "Private Seminars",
    tagline: "One student, one teacher, zero pressure",
    body: "Tailored one-to-one sessions built around what makes your child light up — dinosaurs, pop songs, comic books. The lesson follows their curiosity, and English follows the lesson.",
    accent: "vermilion",
    order: 1,
  },
  {
    slug: "semi-private",
    title: "Semi-Private Groups",
    tagline: "Tiny groups, big conversations",
    body: "Two to four children learning together — inventing games, staging little plays, and correcting each other in English before the teacher ever has to.",
    accent: "cobalt",
    order: 2,
  },
  {
    slug: "field-trips",
    title: "Field Trips",
    tagline: "Athens is the classroom",
    body: "Museums, markets, parks. We take English outside, name the world as we walk through it, and come back with stories to tell — in English, of course.",
    accent: "leaf",
    order: 3,
  },
  {
    slug: "events",
    title: "Events & Performances",
    tagline: "The stage is a shortcut to fluency",
    body: "Recitals, plays, and song performances where students show what they've made. Nothing cements a language like performing in it.",
    accent: "sunflower",
    order: 4,
  },
  {
    slug: "online",
    title: "Online Lessons",
    tagline: "The studio, wherever you are",
    body: "The same playful, speaking-first method over video — with songs, drawing prompts and games designed for the screen. Inquire for availability.",
    accent: "cobalt",
    order: 5,
  },
];

export const SCHEDULE: ScheduleSlotContent[] = [
  { day: "Wednesday", opens: "10:00", closes: "18:00", note: "In studio", order: 1 },
  { day: "Thursday", opens: "10:00", closes: "18:00", note: "In studio", order: 2 },
  { day: "Friday", opens: "10:00", closes: "18:00", note: "In studio", order: 3 },
  { day: "Saturday", opens: "10:00", closes: "18:00", note: "In studio", order: 4 },
  { day: "Online", opens: "—", closes: "—", note: "Inquire for availability", order: 5 },
];

export type LessonKind = "art" | "music" | "play" | "speak";

export type LessonContent = {
  day: string;
  start: string;
  end: string;
  title: string;
  kind: LessonKind;
  ages: string;
  spots: number;
  order: number;
};

export const LESSONS: LessonContent[] = [
  // Wednesday
  { day: "Wednesday", start: "10:00", end: "11:30", title: "Little Painters", kind: "art", ages: "4–6", spots: 2, order: 1 },
  { day: "Wednesday", start: "12:00", end: "13:30", title: "Story & Stage", kind: "play", ages: "7–9", spots: 3, order: 2 },
  { day: "Wednesday", start: "15:00", end: "16:30", title: "Song Lab", kind: "music", ages: "7–10", spots: 1, order: 3 },
  { day: "Wednesday", start: "17:00", end: "18:00", title: "Talk Studio", kind: "speak", ages: "10–13", spots: 4, order: 4 },
  // Thursday
  { day: "Thursday", start: "10:00", end: "11:30", title: "Craft & Chatter", kind: "art", ages: "5–7", spots: 3, order: 5 },
  { day: "Thursday", start: "12:30", end: "14:00", title: "Puppet Theatre", kind: "play", ages: "6–8", spots: 2, order: 6 },
  { day: "Thursday", start: "15:00", end: "16:30", title: "Piano & Phonics", kind: "music", ages: "4–6", spots: 2, order: 7 },
  { day: "Thursday", start: "17:00", end: "18:00", title: "Junior Debate Club", kind: "speak", ages: "11–14", spots: 4, order: 8 },
  // Friday
  { day: "Friday", start: "10:00", end: "11:30", title: "Comic Book Makers", kind: "art", ages: "8–11", spots: 3, order: 9 },
  { day: "Friday", start: "12:00", end: "13:30", title: "Games We Invent", kind: "play", ages: "7–10", spots: 1, order: 10 },
  { day: "Friday", start: "15:30", end: "17:00", title: "Band Practice", kind: "music", ages: "9–12", spots: 2, order: 11 },
  { day: "Friday", start: "17:00", end: "18:00", title: "Speak Easy Teens", kind: "speak", ages: "13–16", spots: 3, order: 12 },
  // Saturday
  { day: "Saturday", start: "10:00", end: "11:30", title: "Family Art Morning", kind: "art", ages: "all ages", spots: 4, order: 13 },
  { day: "Saturday", start: "12:00", end: "14:00", title: "Big Show Rehearsal", kind: "play", ages: "8–12", spots: 2, order: 14 },
  { day: "Saturday", start: "15:00", end: "16:30", title: "Songwriting Circle", kind: "music", ages: "10–14", spots: 3, order: 15 },
  { day: "Saturday", start: "17:00", end: "18:00", title: "Open Mic English", kind: "speak", ages: "all ages", spots: 6, order: 16 },
];

export const CONTACT = {
  address: "77 Ragkavi St, Gkyzi",
  city: "114 75 Athens, Greece",
  phone: "+30 693 952 3314",
  phoneHref: "tel:+306939523314",
  email: "info@athens-creative.com",
  emailHref: "mailto:info@athens-creative.com",
  facebook: "https://www.facebook.com/athenscreativenglish",
  instagram: "https://www.instagram.com/athenscreativenglish",
};
