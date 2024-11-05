"use server";

import {
  isSessionAlive,
  RetrieveServerSession,
} from "@/app/util/client.keycloak";
import { createClient } from "@/app/util/supabase/server";

export async function SubmitCompany(companyData: any) {
  await isSessionAlive();
  const serverSession = await RetrieveServerSession();
  const creator = serverSession.sub;

  const supabase = await createClient();
  let response: SupabaseResponse;
  // add the creator to the company record
  companyData.creator = creator;
  const { data, error } = await supabase
    .from("company")
    .insert(companyData)
    .select();

  if (error) {
    return (response = { data: error, result: 1000 });
  }

  return (response = { data: data, result: 200 });
}
