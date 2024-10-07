/* eslint-disable react/jsx-key */
// app/dashboard/page.js
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { fetchClient } from "../http_client/fetchClient";
import { DashboardStatsCharts } from "../utils/DashboardStatsCharts";
import { DashboardLayout } from "../utils/DashboardLayout";
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
      <DashboardLayout/>
    </div>
  );
}
