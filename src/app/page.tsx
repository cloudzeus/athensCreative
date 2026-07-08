import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Manifesto from "@/components/Manifesto";
import Method from "@/components/Method";
import Despina from "@/components/Despina";
import Programs from "@/components/Programs";
import Schedule from "@/components/Schedule";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getLessons, getPrograms, getSchedule } from "@/lib/data";

// Re-render at most hourly so schedule/program edits in MySQL show up
// without a rebuild, while the page stays statically served.
export const revalidate = 3600;

export default async function Home() {
  const [programs, schedule, lessons] = await Promise.all([
    getPrograms(),
    getSchedule(),
    getLessons(),
  ]);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Manifesto />
        <Method />
        <Despina />
        <Programs programs={programs} />
        <Schedule lessons={lessons} slots={schedule} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
