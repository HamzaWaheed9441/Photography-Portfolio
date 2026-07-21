export default function ForMoreInstagram() {
  return (
    <div className="w-full flex items-center justify-center gap-1 py-8 px-4 text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
      <span className="whitespace-nowrap">For More:</span>
      <a
        href="https://instagram.com/hamzasclicks"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit Instagram profile @hamzasclicks"
        className="inline-flex items-center gap-1 sm:gap-1 font-medium text-neutral-800 dark:text-neutral-800 hover:text-[#E1306C] dark:hover:text-[#E1306C] transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5 sm:h-6 sm:w-6 shrink-0"
          aria-hidden="true"
        >
          <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5Zm9.63 1.88a1.12 1.12 0 1 1 0 2.24 1.12 1.12 0 0 1 0-2.24ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" />
        </svg>
        <span className="whitespace-nowrap">hamzasclicks</span>
      </a>
    </div>
  );
}
