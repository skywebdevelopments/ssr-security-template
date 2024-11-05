"use client";

import { createIdentity } from "@/app/util/client.keycloak";

export default function SubmitButton() {
  return (
    <>
    
    <button
      onClick={() => {
        createIdentity();
      }}
      className="px-3 text-white bg-orange-400 m-4"
      type="button"
      >
      Submit
    </button>
      </>
  );
}
