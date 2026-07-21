import { PhotographerProfile } from '@/types/photographer';
import { Mail, Phone } from 'lucide-react';
import { useState } from 'react';

function SkeletonImage({ src, alt, className, loading = 'lazy' }: { src: string; alt: string; className?: string; loading?: 'eager' | 'lazy' }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative overflow-hidden rounded-2xl">
      {!loaded && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
      <img
        src={src}
        alt={alt}
        className={`${className || ''} transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        loading={loading}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

interface AboutPageLayoutProps {
  photographer: PhotographerProfile;
}

const aboutImages = [
  { src: "/images/4. About Me/Philosophy & Background.webp", alt: "Hamza Waheed — Philosophy & Background" },
  { src: "/images/4. About Me/Experience & Current Focus.webp", alt: "Hamza Waheed — Experience & Current Focus" },
  { src: "/images/4. About Me/Photography Specializations & Editing & Post-Production.webp", alt: "Hamza Waheed — Photography Specializations & Editing" },
  { src: "/images/4. About Me/awards & Get in Touch.webp", alt: "Hamza Waheed — Awards & Get in Touch" },
];

export function AboutPageLayout({ photographer }: AboutPageLayoutProps) {
  return (
    <div className="py-8 sm:py-12">
      <div className="mx-auto max-w-[1200px] space-y-12 sm:space-y-16 lg:space-y-20">

        {/* Section 1: Philosophy + Background | Image 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
          <div className="space-y-8 sm:space-y-10">
            <section>
              <h2 className="text-lg sm:text-xl lg:text-[1.75rem] leading-tight font-serif font-bold text-foreground mb-4 sm:mb-6">
                Philosophy
              </h2>
              <p className="text-sm sm:text-base lg:text-[1.0625rem] leading-relaxed text-gray-700">
                {photographer.biography.philosophy}
              </p>
            </section>
            <section>
              <h2 className="text-lg sm:text-xl lg:text-[1.75rem] leading-tight font-serif font-bold text-foreground mb-4 sm:mb-6">
                Background
              </h2>
              <p className="text-sm sm:text-base lg:text-[1.0625rem] leading-relaxed text-gray-700">
                {photographer.biography.background}
              </p>
            </section>
          </div>
          <div className="order-first lg:order-last">
            <SkeletonImage src={aboutImages[0].src} alt={aboutImages[0].alt} className="w-full h-auto object-cover" loading="eager" />
          </div>
        </div>

        {/* Section 2: Image 2 | Experience + Current Focus */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
          <div className="order-first">
            <SkeletonImage src={aboutImages[1].src} alt={aboutImages[1].alt} className="w-full h-auto object-cover" />
          </div>
          <div className="space-y-8 sm:space-y-10">
            <section>
              <h2 className="text-lg sm:text-xl lg:text-[1.75rem] leading-tight font-serif font-bold text-foreground mb-4 sm:mb-6">
                Experience
              </h2>
              <p className="text-sm sm:text-base lg:text-[1.0625rem] leading-relaxed text-gray-700">
                {photographer.biography.experience}
              </p>
            </section>
            <section>
              <h2 className="text-lg sm:text-xl lg:text-[1.75rem] leading-tight font-serif font-bold text-foreground mb-4 sm:mb-6">
                Current Focus
              </h2>
              <p className="text-sm sm:text-base lg:text-[1.0625rem] leading-relaxed text-gray-700">
                {photographer.biography.currentFocus}
              </p>
            </section>
          </div>
        </div>

        {/* Section 3: Photography Specializations + Editing | Image 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
          <div className="space-y-8 sm:space-y-10">
            {photographer.clients.slice(0, 2).map((clientCategory, index) => (
              <section key={index}>
                <h2 className="text-lg sm:text-xl lg:text-[1.75rem] leading-tight font-serif font-bold text-foreground mb-4 sm:mb-6">
                  {clientCategory.category}
                </h2>
                <ul className="space-y-2">
                  {clientCategory.clients.map((client, clientIndex) => (
                    <li
                      key={clientIndex}
                      className="text-sm sm:text-base lg:text-[1.0625rem] leading-snug text-gray-700 pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-gray-400"
                    >
                      {client}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
          <div className="order-first lg:order-last">
            <SkeletonImage src={aboutImages[2].src} alt={aboutImages[2].alt} className="w-full h-auto object-cover" />
          </div>
        </div>

        {/* Section 4: Image 4 | Awards + Get in Touch */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
          <div className="order-first">
            <SkeletonImage src={aboutImages[3].src} alt={aboutImages[3].alt} className="w-full h-auto object-cover" />
          </div>
          <div className="space-y-8 sm:space-y-10">
            {photographer.clients.slice(2).map((clientCategory, index) => (
              <section key={index}>
                <h2 className="text-lg sm:text-xl lg:text-[1.75rem] leading-tight font-serif font-bold text-foreground mb-4 sm:mb-6">
                  {clientCategory.category}
                </h2>
                <ul className="space-y-2">
                  {clientCategory.clients.map((client, clientIndex) => (
                    <li
                      key={clientIndex}
                      className="text-sm sm:text-base lg:text-[1.0625rem] leading-snug text-gray-700 pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-gray-400"
                    >
                      {client}
                    </li>
                  ))}
                </ul>
              </section>
            ))}

            {/* Contact Information */}
            <section className="border-t border-gray-200 pt-6 sm:pt-8">
              <h2 className="text-lg sm:text-xl lg:text-[1.75rem] leading-tight font-serif font-bold text-foreground mb-4 sm:mb-6">
                Get in Touch
              </h2>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                  <a
                    href={`mailto:${photographer.contact.email}`}
                    className="text-sm sm:text-base lg:text-[1.0625rem] leading-snug text-gray-700 hover:text-foreground transition-colors"
                  >
                    {photographer.contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                  <a
                    href={`tel:${photographer.contact.phone}`}
                    className="text-sm sm:text-base lg:text-[1.0625rem] leading-snug text-gray-700 hover:text-foreground transition-colors"
                  >
                    {photographer.contact.phone}
                  </a>
                </div>
              </div>
              <p className="mt-4 sm:mt-6 text-xs sm:text-sm lg:text-[0.9375rem] leading-relaxed text-gray-500">
                Available for wedding coverage, portrait sessions, event photography, and remote photo editing projects.
              </p>
            </section>
          </div>
        </div>

      </div>
    </div>
  );
}
