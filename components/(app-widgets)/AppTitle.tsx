"use client";

import { signOut } from "next-auth/react";
import ButtonSignOut from "./ButtonSignOut";
type UserSession = {
  name: string;
  sid: string;
  email: string;
};
function AppTitle({ session }: { session: UserSession }) {
  return (
    <div className="sticky top-0 bg-black text-white">
      {/* <ButtonSignOut session={session} client_token={client_token} /> */}
      <div className="flex  flex-row-reverse justify-between  w-full">
        <div className="p-4 flex flex-col">
          <h1 dir="rtl" className=" text-2xl">
            {" "}
            اهلاً، {session.name}
          </h1>
          <h3 className="text-slate-300">{session.email}</h3>
        </div>
        <div className="flex flex-col p-4 ">
          {" "}
          <h1 className=" text-2xl">المنصة الوطنية للأنتخابات</h1>
          {/* <h3 className="text-xl self-center">صوتك امانه</h3> */}
        </div>
      </div>
    </div>
  );
}

export default AppTitle;
