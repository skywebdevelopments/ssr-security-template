import {
  KillUserSession,
  RequireClientAccess,
  RetrieveSession,
  VerifyToken,
} from "@/app/util/client.keycloak";
import AppTitle from "@/components/(app-widgets)/AppTitle";
import Candidets from "@/components/(app-widgets)/Candidets";
import Footer from "@/components/(app-widgets)/Footer";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

async function page() {
  const session = await RetrieveSession();
  const client_token = await RequireClientAccess();
  const isValidToken = VerifyToken({ session });
  console.table(isValidToken);

  !isValidToken.result &&
    (await KillUserSession({ session, client_token }).finally(() => {
      redirect("/login");
    }));

  return (
    <>
      <AppTitle session={session} client_token={client_token} />
      <Candidets />
      <Footer />
    </>
  );
}

export default page;
