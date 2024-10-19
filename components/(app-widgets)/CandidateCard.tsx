/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";

function CandidateCard({ rec }: { rec: Candidate }) {
  return (
    <>
      <div className="text-center  hover:text-2xl font-extrabold cursor-pointer">
        <Image
          className={`rounded-full border-2  border-spacing-56 border-green-900`}
          src={rec.avatar}
          alt={`Avatar of ${rec.name}`}
          width={320}
          height={320}
        />
        <div className="mt-2 sm:mt-4">
          <h3 className="font-medium text-gray-800 dark:text-neutral-200">
            {rec.name}
          </h3>
          <div className="flex flex-row justify-center">
            <Link
              className="bg-green-800 text-white border-rounded px-2 py-1 rounded mt-3"
              href={`/profile/${rec.uuid}`}
            >
              ترشيح
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default CandidateCard;
