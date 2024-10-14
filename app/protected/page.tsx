// app/dashboard/page.js
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { fetchClient } from "../http_client/fetchClient";
import { DashboardStatsCharts } from "../components/DashboardStatsCharts";

import { INetworkMetaDataInterface } from "../interfaces/INetworkInterface";
import { CAUsersTable } from "../components/UsersTable";
import { DashboardLayout } from "../components/DashboardLayout";

export default async function Dashboard() {
  const session: any = await getServerSession(authOptions);

  if (!session) {
    return <p>You need to be logged in to view this page.</p>;
  }
  console.log(session.access_token);
  
  const res1 = await fetchClient("http://localhost:3005/assets", { session });

  // const data12 = await res1.json();

  const network_metadata: INetworkMetaDataInterface = await fetchClient(
    "http://localhost:3005/net-metadata/",
    {
      method: "GET",
      session,
    }
  );

  return (
    <div>
      <DashboardLayout network_metadata={network_metadata} session={session} />
    </div>
  );
}
