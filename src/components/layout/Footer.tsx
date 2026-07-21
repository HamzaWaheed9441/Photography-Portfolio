import { usePortfolio } from '@/context/PortfolioContext';

export function Footer() {
  const { photographer } = usePortfolio();

  if (!photographer) return null;

  return (
    <div className="w-full py-4 sm:py-5 border-t border-gray-200 bg-background">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-8 lg:px-0">
        {/* Mobile: centered single column / Desktop: horizontal row */}
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-1.5 sm:gap-3 text-[0.75rem] sm:text-[0.8125rem] leading-4 text-gray-500">
          {/* Contact Links */}
          <div className="flex items-center gap-3 sm:gap-6">
            <a
              href={`mailto:${photographer.contact.email}`}
              className="hover:text-gray-700 transition-colors"
              aria-label={`Email ${photographer.name}`}
            >
              {photographer.contact.email}
            </a>
            <span className="text-gray-300">|</span>
            <a
              href={`tel:${photographer.contact.phone}`}
              className="hover:text-gray-700 transition-colors"
              aria-label={`Call ${photographer.name}`}
            >
              {photographer.contact.phone}
            </a>
          </div>

          {/* Copyright */}
          <p className="text-center">
            &copy; {new Date().getFullYear()} {photographer.name}
          </p>
        </div>
      </div>
    </div>
  );
}
