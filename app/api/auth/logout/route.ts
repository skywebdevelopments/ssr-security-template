// app/api/auth/logout/route.ts
import { RetrieveServerSession } from "@/app/util/client.keycloak";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const response = await fetch(
    `${process.env.KEYCLOACK_URL}/realms/${process.env.KEYCLOACK_REALM}/protocol/openid-connect/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username: process.env.KEYCLOAK_ADMIN_CLIENT_ID,
        password: process.env.KEYCLOAK_ADMIN_CLIENT_SECRET,
        grant_type: "password",
        client_id: process.env.KEYCLOAK_CLIENT_ID,
        client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
        scope: "openid",
      } as any),
    }
  );

  const data = await response.json();
  let userSession = await RetrieveServerSession();
  const userId = userSession.sub; // User ID fetched from the session or other means
  // Make API call to invalidate the session in Keycloak
  const responses = await fetch(
    `${process.env.KEYCLOAK_AUTH_SERVER_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/users/${userId}/logout`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${data.access_token}`,
      },
    }
  );

  if (responses.ok) {
    // Clear NextAuth.js session
    const nextResponse = NextResponse.redirect("/"); // Redirect after logout
    nextResponse.headers.set(
      "Set-Cookie",
      "next-auth.session-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict"
    );

    return nextResponse;
  } else {
    console.log(`response !OK : ${response.status}`);

    return new Response("Failed to log out from Keycloak", { status: 500 });
  }
}
