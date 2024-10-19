import { signOut } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { decode, verify } from "jsonwebtoken";
type TypeValidateTokenMessage = {
  result: boolean;
  message: string;
};
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
      cache: "no-store",
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

export function VerifyToken({
  session,
}: {
  session: any;
}): TypeValidateTokenMessage {
  try {
    const publicKey: any = process.env.KEYCLOAK_PUBLICKEY;
    const pem = `-----BEGIN CERTIFICATE-----\n${publicKey
      .match(/.{1,64}/g)
      .join("\n")}\n-----END CERTIFICATE-----`;

    const isValid = verify(session.access_token, pem, {
      algorithms: ["RS256"],
    });

    return { message: "token is valid", result: true };
  } catch (error: any) {
    return {
      message: error.message,
      result: false,
    };
  }
}
export function DecodeToken({ access_token }: { access_token: any }) {
  let decoded_jwt = decode(access_token);
  return decoded_jwt;
}
