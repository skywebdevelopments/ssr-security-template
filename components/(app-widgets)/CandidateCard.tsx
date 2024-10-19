import Image from "next/image";
import { useState } from "react";
/* eslint-disable @next/next/no-img-element */
type Candidate = {
  name: string;
  avatar: string;
  alt: string;
};

function CandidateCard({ rec }: { rec: Candidate }) {
  return (
    <>
      <div className="text-center  hover:text-2xl font-extrabold cursor-pointer">
        <Image
          className={`rounded-full border-2 hover:border-8 hover:border-green-400 border-spacing-56 border-green-900 bg-green-300`}
          src={rec.avatar}
          alt={`Avatar of ${rec.name}`}
          width={320}
          height={320}
        />
        <div className="mt-2 sm:mt-4">
          <h3 className="font-medium text-gray-800 dark:text-neutral-200">
            {rec.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-neutral-400"></p>
        </div>
      </div>
    </>
  );
}

export default CandidateCard;
