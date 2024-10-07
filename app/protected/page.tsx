// app/dashboard/page.js
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Dashboard() {
  const session: any = await getServerSession(authOptions as any);
  console.log(`session: ${JSON.stringify(session)}`);
  
  if (!session) {
    return <p>You need to be logged in to view this page.</p>;
  }

  return (
    <div>
      <h1>Welcome, {session.user.email}!</h1>
    </div>
  );
}
