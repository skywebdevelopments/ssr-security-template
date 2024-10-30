import Link from "next/link";

function page() {
  return (
    <div>
      <div className="max-w-[50rem] flex flex-col mx-auto size-full">
  {/* ========== HEADER ========== */}
  <header className="mb-auto flex justify-center z-50 w-full py-4">
    <nav className="px-4 sm:px-6 lg:px-8">
      <a
        className="flex-none text-xl font-semibold sm:text-3xl dark:text-white"
        href="#"
        aria-label="Brand"
      >
        Voting Solution
      </a>
    </nav>
  </header>
  {/* ========== END HEADER ========== */}
  {/* ========== MAIN CONTENT ========== */}
  <main id="content">
    <div className="text-center py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="block text-3xl font-bold text-gray-800 sm:text-7xl dark:text-white">
        Session has ended
      </h1>
     
      <p className="text-gray-600 text-3xl mt-3 dark:text-neutral-400">
        Sorry, you need to login first
      </p>
      <div className="mt-5 flex flex-col justify-center items-center gap-2 sm:flex-row sm:gap-3">
        <Link
          className="w-full sm:w-auto py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          href="/login"
        >
          <svg
            className="shrink-0 size-4"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to Login
        </Link>
      </div>
    </div>
  </main>
  {/* ========== END MAIN CONTENT ========== */}
  {/* ========== FOOTER ========== */}
  <footer className="mt-auto text-center py-5">
    <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
    
    </div>
  </footer>
  {/* ========== END FOOTER ========== */}
</div>
ƒ
    </div>
  );
}

export default page;