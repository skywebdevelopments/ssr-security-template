"use client";

import { SubmitVote } from "@/app/actions/(voting)/ActionVote";
import { useState } from "react";

function VoteButton({ candidateObject }: { candidateObject: any }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<{
    statusCode: number;
    messageـen: string;
    message_ar: string;
  }>();
  async function handleSubmit(candidateObject: any) {
    setIsLoading(true);
    let res = await SubmitVote({ candidateObject });

    setIsLoading(false);
    setResult(res as any);
  }
  return (
    <div>
      {result?.statusCode !== 400 && (
        <button
          onClick={() => {
            //   result !== 201 &&
            handleSubmit(candidateObject);
          }}
          disabled={isLoading}
          type="button"
          className={`bg-green-800 cursor-pointer  w-auto text-center hover:bg-green-600 text-white border-rounded px-2 py-3 rounded mt-3 ${
            isLoading && "bg-gray-600"
          }`}
        >
          {result?.statusCode === 201
            ? "تم التصويت للمرشح"
            : isLoading
            ? " برجاء الانتظار جاري التصويت"
            : `ترشيح ${candidateObject.name}`}
        </button>
      )}

      <p>{result?.message_ar}</p>
    </div>
  );
}

export default VoteButton;
