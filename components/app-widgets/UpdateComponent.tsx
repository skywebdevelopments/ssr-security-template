"use client";

import { useState } from "react";
import { ManageUsers } from "@/app/actions/supabase/ActionHandleUserResponse";
import { supabase } from "@/app/util/supabase/client";
function UpdateComponent() {
  const [Email, setEmail] = useState("");

  return (
    <div className="flex flex-row justify-between">
      <input
        type="text"
        name="name"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        id="name"
      />
      <div className="flex gap-4 flex-row">
        <button
          onClick={() => ManageUsers({ owner: Email, state: true })}
          className="px-3 bg-green-800 text-white rounded-lg"
          type="submit"
        >
          accept
        </button>
        <button
          onClick={() => ManageUsers({ owner: Email, state: false })}
          className="px-3 bg-red-800 text-white rounded-lg"
          type="submit"
        >
          reject
        </button>
      </div>
    </div>
  );
}

export default UpdateComponent;
