import {
  RetrieveServerSession,
  ValidateToken,
  ValidateSession,
  isSessionAlive,
} from "@/app/util/client.keycloak";
import AppTitle from "@/components/app-widgets/AppTitle";
import Footer from "@/components/app-widgets/Footer";


async function SessionManagement({ children }: any) {
  const session = await RetrieveServerSession();
  await isSessionAlive();
  return (
    <>
      <AppTitle session={session} />

      {children}
      <Footer />
    </>
  );
}

export default SessionManagement;
function RetrieveSession() {
  throw new Error("Function not implemented.");
}
