import { KillUserSession } from "@/app/util/client.keycloak";
import { signOut } from "next-auth/react";

function ButtonSignOut({
  session,
  client_token,
}: {
  session: any;
  client_token: any;
}) {
  return (
    <div>
      <button
        onClick={() => {
          KillUserSession({ session, client_token });
          signOut({ callbackUrl: "/login", redirect: true });
        }}
        className="bg-red-900 p-2 m-1"
      >
        signout
      </button>
    </div>
  );
}

export default ButtonSignOut;
