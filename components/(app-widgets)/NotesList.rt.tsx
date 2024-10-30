"use client";
// components/RealtimeMessages.js
import { useEffect, useState } from "react";
import { supabase } from "@/app/util/supabase/client";

export default function NotesList() {
  const [NotesObject, setNotesObject] = useState<any>();
  const [RevalidateData, setRevalidateData] = useState<boolean>(false);

  useEffect(() => {
    supabase
      .from("notes")
      .select()
      .then((data: any) => {
        console.log(data);

        setNotesObject(data.data);
      });
  }, [RevalidateData]);

  const channels = supabase
    .channel("custom-all-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "notes" },
      (payload) => {
        setRevalidateData(true);
      }
    )
    .subscribe();

  return (
    <>
      {NotesObject?.map((n: any) => {
        return <p key={n.id}>{n.title}</p>;
      })}
    </>
  );
}
