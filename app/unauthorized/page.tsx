import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import BackToLogin from "../components/BackToLogin";

async function page() {
  const session: any = await getServerSession(authOptions);
 

  if (!session) {
    return <p>You need to be logged in to view this page.</p>;
  }
  

  return (
    <div>
      <p>NOT AUTHORIZED</p>
      <BackToLogin/>
    </div>
  );
}

export default page;
