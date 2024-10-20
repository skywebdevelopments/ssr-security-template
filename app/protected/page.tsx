// app/dashboard/page.js
import { fetchClient } from "../http_client/fetchClient";
import { INetworkMetaDataInterface } from "../interfaces/INetworkInterface";
import { DashboardLayout } from "../../components/(app-widgets)/DashboardLayout";
import { RetrieveServerSession } from "../util/client.keycloak";
import NeedToLogin from "../(voting-system)/(user-creation-redirection)/session-ended/page";

export default async function Dashboard() {
  const session = await RetrieveServerSession();
  if (!session) {
    return (
      <>
        <NeedToLogin /> 
      </>
    );
  }
  // const res1 = await fetchClient("http://localhost:3005/assets", { session });

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
