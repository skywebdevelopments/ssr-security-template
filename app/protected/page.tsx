// app/dashboard/page.js
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { fetchClient } from "../http_client/fetchClient";
export default async function Dashboard() {
  const session: any = await getServerSession(authOptions);

  
  if (!session) {
    return <p>You need to be logged in to view this page.</p>;
  }

  const data = await fetchClient("https://fakestoreapi.com/products", {
    method: "GET",
    session,
  });


  return (
    <div>
      <h1>Welcome, {session.user.email}!</h1>
      <h3>your id is {session.user.id}</h3>
    </div>
  );
}
