"use server";

import { redirect } from "next/navigation";

// TODO: change the METHOD to be client auth, not user auth
async function getJWTToken() {
  const formData = new URLSearchParams();
  formData.append("username", "cib-admin");
  formData.append("password", "admin");
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

export async function ActionRegisterUser(formData: any) {
  "use server";

  try {
    return new Promise(async (resolve, reject) => {
      const accessToken = await getJWTToken();

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${accessToken}`);

      const raw = JSON.stringify({
        username: formData.email,
        enabled: process.env.USER_ENABLED_BY_DEFAULT,
        totp: false,
        emailVerified: process.env.EMAIL_VERIFIED_BY_DEFAULT,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        disableableCredentialTypes: [],
        requiredActions: [],
        notBefore: 0,
        access: {
          manageGroupMembership: true,
          view: true,
          mapRoles: true,
          impersonate: true,
          manage: true,
        },
        attributes: {
          nationalId: formData.nationalId,
        },
        realmRoles: ["mb-user"],
        credentials: [
          {
            type: "password",
            value: formData.password,
            temporary: process.env.PASSWORD_TEMP_BY_DEFAULT,
          },
        ],
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("http://127.0.0.1:8080/admin/realms/myrealm/users", {
        method: requestOptions.method,
        headers: requestOptions.headers,
        body: requestOptions.body,
      })
        .then((response) => {
          console.log(response.status);
          response.status === 201 && redirect("/login");
          resolve(response.status);
        })
        .then((result) => console.log(result))
        .catch((error) => reject(error));
    });
  } catch (error) {
    console.error("Error in user registration:", error);
  }
}
