import { findCandidateByUUID } from "@/app/(voting-system)/data/candidates_list";
import { redirect } from "next/navigation";
import Image from "next/image";
import SessionManagement from "@/components/(app-widgets)/SessionManagement";
import React from "react";
import VoteButton from "@/components/(app-widgets)/Votebutton";
function page({ params }: { params: { id: string } }) {
  let candidateObject = findCandidateByUUID(params.id);

  function test() {
    console.log(123);
  }
  return (
    <>
      <>
        <SessionManagement>
          {/* Profile */}
          {candidateObject ? (
            <div
              dir="rtl"
              className="   flex flex-col m-auto w-1/2 mt-10 mb-10  justify-center"
            >
              <div className=" flex mt-4 flex-row justify-between ">
                <div className="flex items-center  gap-x-3">
                  <div className="shrink-0">
                    <Image
                      className={`rounded-full border-2  border-spacing-56 border-green-900`}
                      src={candidateObject?.avatar}
                      alt={`Avatar of ${candidateObject?.name}`}
                      width={220}
                      height={220}
                    />
                  </div>{" "}
                  <div className="grow">
                    <VoteButton candidateObject={candidateObject} />
                  </div>
                </div>
              </div>

              {/* End Profile */}
              {/* About */}
              <div className="mt-8">
                <p className="text-sm text-gray-600 dark:text-neutral-400">
                  لوريم إيبسوم(Lorem Ipsum) هو ببساطة نص شكلي (بمعنى أن الغاية
                  هي الشكل وليس المحتوى) ويُستخدم في صناعات المطابع ودور النشر.
                  كان لوريم إيبسوم ولايزال المعيار للنص الشكلي منذ القرن الخامس
                  عشر عندما قامت مطبعة مجهولة برص مجموعة من الأحرف بشكل عشوائي
                  أخذتها من نص، لتكوّن كتيّب بمثابة دليل أو مرجع شكلي لهذه
                  الأحرف. خمسة قرون من الزمن لم تقضي على هذا النص، بل انه حتى
                  صار مستخدماً وبشكله الأصلي في الطباعة والتنضيد الإلكتروني.
                  انتشر بشكل كبير في ستينيّات هذا القرن مع إصدار رقائق ليتراسيت
                  (Letraset) البلاستيكية تحوي مقاطع من هذا النص، وعاد لينتشر مرة
                  أخرى مؤخراَ مع ظهور برامج النشر الإلكتروني مثل ألدوس بايج
                  مايكر (Aldus PageMaker) والتي حوت أيضاً على نسخ من نص لوريم
                  إيبسوم.
                </p>
              </div>
            </div>
          ) : (
            redirect("/home")
          )}
          {/* End About */}
        </SessionManagement>
      </>
    </>
  );
}

export default page;
