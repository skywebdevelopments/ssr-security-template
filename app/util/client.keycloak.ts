import { signOut } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export async function RequireClientAccess() {
  const formData = new URLSearchParams();
  formData.append("grant_type", "client_credentials");
  formData.append("client_id", process.env.KEYCLOAK_CLIENT_ID as string);
  formData.append(
    "client_secret",
    process.env.KEYCLOAK_CLIENT_SECRET as string
  );
  formData.append("scope", "openid");

  const res = await fetch(
    `http://127.0.0.1:8080/realms/myrealm/protocol/openid-connect/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
      cache:'no-store'
    }
  );

  if (!res.ok) {
    console.log(`${res.statusText} (${res.status})`);
    return false;
  }

  const jwt = await res.json();

  return jwt.access_token;
}

export async function RetrieveSession() {
  const session: any = await getServerSession(authOptions);
  return session;
}

export async function KillUserSession({
  session,
  client_token,
}: {
  session: any;
  client_token: any;
}) {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${client_token}`);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `http://127.0.0.1:8080/admin/realms/myrealm/users/${session.sub}/logout`,
      {
        method: requestOptions.method,
        headers: requestOptions.headers,
        cache: "no-store",
      }
    )
      .then((response) => {
        response.status === 204 && "";
      })

      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  } catch (error) {}
}
