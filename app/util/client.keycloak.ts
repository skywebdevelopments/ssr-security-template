export async function RequireClientAccess() {
  const formData = new URLSearchParams();
  formData.append("grant_type", process.env.GRANT_TYPE as string);
  formData.append("client_id", process.env.KEYCLOAK_CLIENT_ID as string);
  formData.append(
    "client_secret",
    process.env.KEYCLOAK_CLIENT_SECRET as string
  );
  formData.append("scope", process.env.SCOPE as string);

  const res = await fetch(
    "http://127.0.0.1:8080/realms/myrealm/protocol/openid-connect/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch JWT token");
  }

  const jwt = await res.json();
  return jwt.access_token;
}
