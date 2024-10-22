"use client";

import { SubmitVote } from "@/app/actions/(voting)/ActionVote";
import { error } from "console";
import { useState } from "react";

function VoteButton({ candidateObject }: { candidateObject: any }) {
  const [result, setResult] = useState<any>();
  async function handleSubmit(candidateObject: any) {
    let res = await SubmitVote({ candidateObject });
    setResult(res);
  }
  return (
    <div>
      <button
        onClick={() => {
        //   result !== 201 && 
          handleSubmit(candidateObject);
        }}
        type="button"
        className="bg-green-800 cursor-pointer  w-auto text-center hover:bg-green-600 text-white border-rounded px-2 py-3 rounded mt-3"
      >
        {result === 201
          ? "تم التصويت للمرشح"
          : ` ترشيح ${candidateObject?.name}`}
      </button>
    </div>
  );
}

export default VoteButton;
