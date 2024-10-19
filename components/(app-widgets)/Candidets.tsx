/* eslint-disable @next/next/no-img-element */
import CandidateCard from "./CandidateCard";

function Candidets() {
  let CandidatesList = [
    {
      name: "مرشح رقم ١",
      avatar:
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80",
      alt: "Avatar",
    },
    {
      name: "مرشح رقم ٢",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80",
      alt: "Avatar",
    },
    {
      name: "مرشح رقم ٣",
      avatar:
        "https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80",
      alt: "Avatar",
    },
    {
      name: "مرشح رقم ٤",
      avatar:
        "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80",
      alt: "Avatar",
    },
    {
      name: "مرشح رقم ٥",
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80",
      alt: "Avatar",
    },
    {
      name: "مرشح رقم ٦",
      avatar:
        "https://images.unsplash.com/photo-1624224971170-2f84fed5eb5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80",
      alt: "Avatar",
    },
    {
      name: "مرشح رقم ٧",
      avatar:
        "https://images.unsplash.com/photo-1579017331263-ef82f0bbc748?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80",
      alt: "Avatar",
    },
    {
      name: "مرشح رقم ٨",
      avatar:
        "https://images.unsplash.com/photo-1514222709107-a180c68d72b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80",
      alt: "Avatar",
    },
    {
      name: "مرشح رقم ٩",
      avatar:
        "https://images.unsplash.com/photo-1602452920335-6a132309c7c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80",
      alt: "Avatar",
    },
    {
      name: "مرشح رقم ١٠",
      avatar:
        "https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80",
      alt: "Avatar",
    },
    {
      name: "مرشح رقم ١١",
      avatar:
        "https://images.unsplash.com/photo-1514846226882-28b324ef7f28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80",
      alt: "Avatar",
    },
    {
      name: "مرشح رقم ١٢",
      avatar:
        "https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80",
      alt: "Avatar",
    },
    {
      name: "مرشح رقم ١٣",
      avatar:
        "https://images.unsplash.com/photo-1520409364224-63400afe26e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80",
      alt: "Avatar",
    },
    {
      name: "مرشح رقم ١٤",
      avatar:
        "https://images.unsplash.com/photo-1558507652-2d9626c4e67a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80",
      alt: "Avatar",
    },
    {
      name: "مرشح رقم ١٥",
      avatar:
        "https://images.unsplash.com/photo-1521151716396-b2da27b1a19f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80",
      alt: "Avatar",
    },
  ];

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
                {CandidatesList.map((rec, index) => {
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
