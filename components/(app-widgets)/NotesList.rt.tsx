"use client";
// components/RealtimeMessages.js
import { useEffect, useState } from "react";
import { supabase } from "@/app/util/supabase/client";

export default function NotesList() {
  const [NotesObject, setNotesObject] = useState<any>();
  const [RevalidateData, setRevalidateData] = useState<boolean>(false);
  const [UserEmail, setUserEmail] = useState<string>("");
  const fetchEvents = () => {
    supabase
      .from("events")
      .select("*,tickets (*)")
      .then((data: any) => {
        setNotesObject(data.data);
      });
  };

  const addUser = async () => {
    const { data, error } = await supabase
      .from("tickets")
      .insert([
        {
          owner: UserEmail,
          event_id: "f9b2c6ca-3cb9-4da8-a236-0c05dfdfa837",
          valid: false,
        },
      ])
      .select();
  };

  const deleteUser = async (id: any) => {
    const { error } = await supabase.from("tickets").delete().eq("id", id);
  };

  useEffect(() => {
    fetchEvents();
  }, [RevalidateData]);

  supabase
    .channel("custom-all-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "*" },
      (payload) => {
        fetchEvents();
        setRevalidateData(true);
      }
    )
    .subscribe();

  return (
    <>
      {NotesObject?.map((n: any, index: number) => {
        return (
          <>
    
            <h1 key={n.id + index}>{n.title} </h1>
            <h3 key={n.id + index}> {n.description}</h3>
            <h3 key={n.id + index}> {new Date(n.start_at).toLocaleString()}</h3>
            <p className="ml-4 underline font-bold">
              Invitees ({n.tickets.length}):
            </p>
            <ol className="ml-4">
              {n.tickets.length === 0 && <p className="text-xs italic text-slate-500">empty list</p>}
              {n.tickets.map((t: any) => {
                return (
                  <li
                    className={`${t.valid ? "text-green-800" : "text-red-800"} my-1`}
                    key={t.id}
                  >
                    <div className="flex flex-row justify-between">
                      {t.owner}
                      <button
                        onClick={() => {
                          deleteUser(t.id);
                        }}
                        className="px-3 ml-3 mr-3 bg-red-700 rounded text-white"
                      >
                        delete
                      </button>
                    </div>
                  </li>
                );
              })}
            </ol>
          <div className="flex flex-row mt-7 justify-between">
          <input
              onChange={(e) => {
                setUserEmail(e.target.value);
              }}
              className="bg-slate-300 px-3 border "
              type="text"
              name=""
              id=""
            />
            <button
              onClick={addUser}
              className="px-3 ml-3 mr-3 bg-green-700 rounded text-white"
            >
              add user
            </button>
          </div>
          </>
        );
      })}
    </>
  );
}
