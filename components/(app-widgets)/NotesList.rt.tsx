"use client";
// components/RealtimeMessages.js
import { useEffect, useState } from "react";
import { supabase } from "@/app/util/supabase/client";

export default function NotesList() {
  const [NotesObject, setNotesObject] = useState<any>();
  const [RevalidateData, setRevalidateData] = useState<boolean>(false);

  const fetchNotes = () => {
    supabase
      .from("notes")
      .select()
      .then((data: any) => {
        setNotesObject(data.data);
      });
  };
  useEffect(() => {fetchNotes()}, [RevalidateData]);

  supabase
    .channel("custom-all-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "notes" },
      (payload) => {
        fetchNotes();
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
