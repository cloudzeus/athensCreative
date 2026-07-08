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
import { CONTACT } from "@/lib/content";

// Re-render at most hourly so schedule/program edits in MySQL show up
// without a rebuild, while the page stays statically served.
export const revalidate = 3600;

export default async function Home() {
  const [programs, schedule, lessons] = await Promise.all([
    getPrograms(),
    getSchedule(),
    getLessons(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["EducationalOrganization", "LocalBusiness"],
        "@id": "https://athens-creative.com/#organization",
        name: "Athens Creative English",
        alternateName: "Athens Creative",
        url: "https://athens-creative.com",
        image: "https://athens-creative.com/opengraph-image",
        description:
          "English lessons for children in Gkyzi, Athens — taught through art, music, theatre and play instead of textbooks. Private & semi-private seminars, field trips, events and online lessons.",
        telephone: "+306939523314",
        email: CONTACT.email,
        priceRange: "€€",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Ragkavi 77, Gkyzi",
          addressLocality: "Athens",
          addressRegion: "Attica",
          postalCode: "114 75",
          addressCountry: "GR",
        },
        geo: { "@type": "GeoCoordinates", latitude: 37.9946, longitude: 23.7492 },
        openingHoursSpecification: schedule
          .filter((s) => s.opens !== "—")
          .map((s) => ({
            "@type": "OpeningHoursSpecification",
            dayOfWeek: `https://schema.org/${s.day}`,
            opens: s.opens,
            closes: s.closes,
          })),
        sameAs: [CONTACT.facebook, CONTACT.instagram],
        founder: {
          "@type": "Person",
          name: "Despina",
          jobTitle: "Founder & English Teacher",
          description:
            "Actor and musician, graduate of Mayfield Regional Arts School (Toronto), teaching English through art and play since 2013.",
          knowsLanguage: ["en", "el"],
        },
        knowsLanguage: ["en", "el"],
        areaServed: { "@type": "City", name: "Athens" },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Programs",
          itemListElement: programs.map((p) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Course",
              name: p.title,
              description: p.body,
              provider: { "@id": "https://athens-creative.com/#organization" },
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://athens-creative.com/#website",
        url: "https://athens-creative.com",
        name: "Athens Creative English",
        publisher: { "@id": "https://athens-creative.com/#organization" },
        inLanguage: "en",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
