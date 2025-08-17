import Image from "next/image";

const partners = [
  { name: "Partner 1", logo: "/partner-logo-1.png" },
  { name: "Partner 2", logo: "/partner-logo-2.png" },
  { name: "Partner 3", logo: "/partner-logo-3.png" },
  { name: "Partner 4", logo: "/partner-logo-4.png" },
  { name: "Partner 5", logo: "/partner-logo-5.png" },
  { name: "Partner 6", logo: "/partner-logo-6.png" },
  { name: "Partner 7", logo: "/partner-logo-7.png" },
  { name: "Partner 8", logo: "/partner-logo-8.png" },
];

export function PartnershipSlider() {
  return (
    <section className="py-12 bg-muted/40 overflow-hidden">
      <div className="container mx-auto px-4 text-center mb-8">
        <h2 className="text-3xl font-bold">Our Valued Partners</h2>
        <p className="text-muted-foreground mt-2">
          Collaborating with the best to bring you amazing events.
        </p>
      </div>
      <div className="relative w-full flex overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
        <div className="flex animate-marquee whitespace-nowrap">
          {partners.map((partner, index) => (
            <div key={index} className="flex-shrink-0 mx-8">
              <Image
                src="/m.jpg"
                alt={partner.name}
                width={120}
                height={60}
                className="h-12 object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
          {/* Duplicate partners to create seamless loop */}
          {partners.map((partner, index) => (
            <div
              key={`duplicate-${index}`}
              className="flex-shrink-0 mx-8"
              aria-hidden="true"
            >
              <Image
                src="/m1.png"
                alt={partner.name}
                width={120}
                height={60}
                className="h-12 object-contain grayscale opacity-70"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
