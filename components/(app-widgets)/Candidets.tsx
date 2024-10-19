/* eslint-disable @next/next/no-img-element */
import { getCandidates } from "@/app/data/candidates_list";
import CandidateCard from "./CandidateCard";

function Candidets() {
  let candidatesList = getCandidates();

  return (
    <div className="h-fit">
      <>
        <>
          {/* Hero */}
          <>
            {/* Team */}
            <div className="max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
              {/* Title */}
              <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
                <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
                  قائمة المرشحين
                </h2>
                <p className="mt-1 text-gray-600 dark:text-neutral-400">
                  أختر المرشح
                </p>
              </div>
              {/* End Title */}
              {/* Grid */}
              <div
                dir="rtl"
                className="grid  grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-12"
              >
                {candidatesList.map((rec, index) => {
                  return <CandidateCard key={index} rec={rec} />;
                })}
                {/* End Col */}
              </div>
              {/* End Grid */}
              {/* Card */}
              <div dir="rtl" className="mt-12 flex justify-center">
                <div className="border border-gray-200 py-2 px-3 rounded-full dark:border-neutral-700">
                  <div className="flex items-center gap-x-3">
                    <span className="text-sm text-gray-500 dark:text-neutral-500">
                      تحتاج للمساعدة؟
                    </span>
                    <a
                      className="inline-flex items-center gap-x-2 text-sm font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:text-blue-500 dark:text-blue-500 dark:hover:text-blue-600 dark:focus:text-blue-600"
                      href="#"
                    >
                      اضغط هنا
                      <svg
                        className="shrink-0 rotate-180 size-4"
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
                    </a>
                  </div>
                </div>
              </div>
              {/* End Card */}
            </div>
            {/* End Team */}
          </>

          {/* End Hero */}
        </>
      </>
    </div>
  );
}

export default Candidets;
