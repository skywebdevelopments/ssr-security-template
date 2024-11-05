"use server";
import { createClient } from "@/app/util/supabase/server";
export async function ManageUsers({
  state,
  owner,
}: {

  state: boolean;
  owner: string;
}) {
  const supabase = await createClient();

  return new Promise((resolve, reject) => {
    supabase
      .from("tickets")
      .update({ valid: state })
      .eq("owner", owner)
      .then((response) => {
        resolve(response);
      });
  });
}
