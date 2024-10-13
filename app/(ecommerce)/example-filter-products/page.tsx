function page() {
    return (
        <div>
            <>
  {/* Product List */}
  <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
    {/* Filter Section */}
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
        Filter Products
      </h2>
      <form className="flex flex-col sm:flex-row gap-4 mt-4">
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 border rounded-md px-3 py-2"
        />
        <select className="border rounded-md px-3 py-2">
          <option value="">All Categories</option>
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-md px-4 py-2"
        >
          Filter
        </button>
      </form>
    </div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 items-center gap-2">
      {/* Product Card */}
      <a
        className="group flex flex-col justify-center hover:bg-gray-50 focus:outline-none focus:bg-gray-50 rounded-xl p-4 md:p-7 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
        href="#"
      >
        <div className="flex justify-center items-center size-12 bg-blue-600 rounded-xl">
          <img
            src="https://via.placeholder.com/150"
            alt="Responsive Design"
            className="shrink-0 size-6 text-white rounded-md"
          />
        </div>
        <div className="mt-5">
          <h3 className="group-hover:text-gray-600 text-lg font-semibold text-gray-800 dark:text-white dark:group-hover:text-gray-400">
            Responsive Design
          </h3>
          <p className="mt-1 text-gray-600 dark:text-neutral-400">
            Responsive, and mobile-first project on the web
          </p>
          <span className="mt-2 inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 group-hover:underline group-focus:underline font-medium">
            Learn more
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
              <path d="m9 18 6-6-6-6" />
            </svg>
          </span>
        </div>
      </a>
      {/* End Product Card */}
      {/* Product Card */}
      <a
        className="group flex flex-col justify-center hover:bg-gray-50 focus:outline-none focus:bg-gray-50 rounded-xl p-4 md:p-7 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
        href="#"
      >
        <div className="flex justify-center items-center size-12 bg-blue-600 rounded-xl">
          <img
            src="https://via.placeholder.com/150"
            alt="Customizable"
            className="shrink-0 size-6 text-white rounded-md"
          />
        </div>
        <div className="mt-5">
          <h3 className="group-hover:text-gray-600 text-lg font-semibold text-gray-800 dark:text-white dark:group-hover:text-gray-400">
            Customizable
          </h3>
          <p className="mt-1 text-gray-600 dark:text-neutral-400">
            Components are easily customized and extendable
          </p>
          <span className="mt-2 inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 group-hover:underline group-focus:underline font-medium">
            Learn more
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
              <path d="m9 18 6-6-6-6" />
            </svg>
          </span>
        </div>
      </a>
      {/* End Product Card */}
      {/* Product Card */}
      <a
        className="group flex flex-col justify-center hover:bg-gray-50 focus:outline-none focus:bg-gray-50 rounded-xl p-4 md:p-7 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
        href="#"
      >
        <div className="flex justify-center items-center size-12 bg-blue-600 rounded-xl">
          <img
            src="https://via.placeholder.com/150"
            alt="Documentation"
            className="shrink-0 size-6 text-white rounded-md"
          />
        </div>
        <div className="mt-5">
          <h3 className="group-hover:text-gray-600 text-lg font-semibold text-gray-800 dark:text-white dark:group-hover:text-gray-400">
            Documentation
          </h3>
          <p className="mt-1 text-gray-600 dark:text-neutral-400">
            Every component and plugin is well documented
          </p>
          <span className="mt-2 inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 group-hover:underline group-focus:underline font-medium">
            Learn more
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
              <path d="m9 18 6-6-6-6" />
            </svg>
          </span>
        </div>
      </a>
      {/* End Product Card */}
      {/* Product Card */}
      <a
        className="group flex flex-col justify-center hover:bg-gray-50 focus:outline-none focus:bg-gray-50 rounded-xl p-4 md:p-7 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
        href="#"
      >
        <div className="flex justify-center items-center size-12 bg-blue-600 rounded-xl">
          <img
            src="https://via.placeholder.com/150"
            alt="24/7 Support"
            className="shrink-0 size-6 text-white rounded-md"
          />
        </div>
        <div className="mt-5">
          <h3 className="group-hover:text-gray-600 text-lg font-semibold text-gray-800 dark:text-white dark:group-hover:text-gray-400">
            24/7 Support
          </h3>
          <p className="mt-1 text-gray-600 dark:text-neutral-400">
            Contact us 24 hours a day, 7 days a week
          </p>
          <span className="mt-2 inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 group-hover:underline group-focus:underline font-medium">
            Learn more
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
              <path d="m9 18 6-6-6-6" />
            </svg>
          </span>
        </div>
      </a>
      {/* End Product Card */}
    </div>
    {/* Pagination Section */}
    <div className="mt-8 flex justify-between items-center">
      <span className="text-gray-600 dark:text-neutral-400">
        Showing 1-4 of 20 products
      </span>
      <nav>
        <ul className="flex space-x-2">
          <li>
            <a
              href="#"
              className="border rounded-md px-3 py-1 text-gray-600 dark:text-neutral-400 hover:bg-gray-200 dark:hover:bg-neutral-800"
            >
              Previous
            </a>
          </li>
          <li>
            <a
              href="#"
              className="border rounded-md px-3 py-1 text-gray-600 dark:text-neutral-400 hover:bg-gray-200 dark:hover:bg-neutral-800"
            >
              1
            </a>
          </li>
          <li>
            <a
              href="#"
              className="border rounded-md px-3 py-1 text-gray-600 dark:text-neutral-400 hover:bg-gray-200 dark:hover:bg-neutral-800"
            >
              2
            </a>
          </li>
          <li>
            <a
              href="#"
              className="border rounded-md px-3 py-1 text-gray-600 dark:text-neutral-400 hover:bg-gray-200 dark:hover:bg-neutral-800"
            >
              3
            </a>
          </li>
          <li>
            <a
              href="#"
              className="border rounded-md px-3 py-1 text-gray-600 dark:text-neutral-400 hover:bg-gray-200 dark:hover:bg-neutral-800"
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
  {/* End Product List */}
</>

        </div>
    );
}

export default page;