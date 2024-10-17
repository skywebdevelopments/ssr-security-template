import {
  RequireClientAccess,
  RetrieveSession,
} from "@/app/util/client.keycloak";
import AppTitle from "@/components/(app-widgets)/AppTitle";
import Candidets from "@/components/(app-widgets)/Candidets";
import Footer from "@/components/(app-widgets)/Footer";

async function page() {
  const session = await RetrieveSession();
  const client_token = await RequireClientAccess();

  return (
    <>
      <AppTitle session={session} client_token={client_token} />
      <Candidets />
      <Footer />
    </>
  );
}

export default page;
