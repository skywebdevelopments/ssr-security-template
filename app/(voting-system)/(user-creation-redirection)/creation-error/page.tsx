function NeedToLogin() {
  return (
    <div className="max-w-[50rem] flex flex-col mx-auto size-full">
      {/* ========== HEADER ========== */}
      <header className="mb-auto flex justify-center z-50 w-full py-4">
        <nav className="px-4 sm:px-6 lg:px-8">
          <a
            className="flex-none text-xl font-semibold sm:text-3xl dark:text-white"
            href="#"
            aria-label="Brand"
          >
            {process.env.SOLUTION_NAME}
          </a>
        </nav>
      </header>
      {/* ========== END HEADER ========== */}
      {/* ========== MAIN CONTENT ========== */}
      <main id="content">
        <div className="text-center py-10 px-4 sm:px-6 lg:px-8">
          <h1 className="block text-3xl font-bold text-red-800 sm:text-3xl dark:text-white">
            Session has ended
          </h1>
          <h4 className="block text-xl font-bold text-slate-800 mt-4 sm:text-xl dark:text-white">
            you need to login
          </h4>

          <div className="mt-5 flex flex-col justify-center items-center gap-2  sm:flex-row sm:gap-3">
            <a
              className="w-full sm:w-1/4 mt-5 py-3 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              href="/login"
            >
              Login
            </a>
          </div>
        </div>
      </main>
      {/* ========== END MAIN CONTENT ========== */}
      {/* ========== FOOTER ========== */}
      <footer className="mt-auto text-center ">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 dark:text-neutral-500">
            © All Rights Reserved. 2022.
          </p>
        </div>
      </footer>
      {/* ========== END FOOTER ========== */}
    </div>
  );
}

export default NeedToLogin;
