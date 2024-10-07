/* eslint-disable react/jsx-key */
// app/dashboard/page.js
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { fetchClient } from "../http_client/fetchClient";
export default async function Dashboard() {
  const session: any = await getServerSession(authOptions);

  if (!session) {
    return <p>You need to be logged in to view this page.</p>;
  }

  const data = await fetchClient("http://localhost:3005/assets/", {
    method: "GET",
    session,
  });

  return (
    <div>
      <h1>Welcome, {session.user.email}!</h1>
      <h3>your id is {session.user.id}</h3>
      {data &&
        data.length > 0 &&
        data.map((rec: any) => {
          return (
            <p className="text-red-300 m-5 font-bold text-9xl" key={rec.Key}>
              <span>{rec.Record.apartmentNumber}</span>
            </p>
          );
        })}
    </div>
  );
}
