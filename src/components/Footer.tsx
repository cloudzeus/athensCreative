import { CONTACT } from "@/lib/content";
import { Star } from "@/components/Doodles";

export default function Footer() {
  return (
    <footer className="bg-ink px-5 pb-10 pt-20 text-paper sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-10 border-b border-paper/15 pb-14 lg:flex-row lg:items-end">
          <div>
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-paper/50">
              <Star className="h-5 w-5 text-sunflower" />
              Athens Creative English
            </p>
            <p className="mt-4 max-w-lg font-display text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl">
              Where children <em className="font-light italic text-sunflower">flow into English</em> without noticing.
            </p>
          </div>
          <nav className="flex flex-col gap-2 text-paper/70">
            <a href="#idea" className="hover:text-sunflower">The Idea</a>
            <a href="#method" className="hover:text-sunflower">The Method</a>
            <a href="#despina" className="hover:text-sunflower">Despina</a>
            <a href="#programs" className="hover:text-sunflower">Programs</a>
            <a href="#schedule" className="hover:text-sunflower">Schedule</a>
            <a href="#contact" className="hover:text-sunflower">Contact</a>
          </nav>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 pt-8 text-sm text-paper/50 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} Athens Creative English · {CONTACT.address}, {CONTACT.city}
          </p>
          <div className="flex gap-5">
            <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-sunflower">
              Instagram
            </a>
            <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-sunflower">
              Facebook
            </a>
            <a href={CONTACT.emailHref} className="hover:text-sunflower">
              {CONTACT.email}
            </a>
          </div>
        </div>

        <p className="mt-8 text-center font-hand text-lg text-paper/40">
          made with paint, songs &amp; a little GSAP — in Athens
        </p>
      </div>
    </footer>
  );
}
