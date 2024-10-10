"use server";

export async function ActionRegisterUser(formData: any) {
  "use server";

  const formData1 = new URLSearchParams();
  formData1.append("username", "cib-admin");
  formData1.append("password", "admin");
  formData1.append("grant_type", process.env.GRANT_TYPE as string);
  formData1.append("client_id", process.env.KEYCLOAK_CLIENT_ID as string);
  formData1.append(
    "client_secret",
    process.env.KEYCLOAK_CLIENT_SECRET as string
  );
  formData1.append("scope", process.env.SCOPE as string);

  const res = await fetch(
    "http://127.0.0.1:8080/realms/myrealm/protocol/openid-connect/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData1,
    }
  );
  console.log(formData1);

  let jwt = await res.json();
  console.log(jwt.access_token);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${jwt.access_token}`);

  const raw = JSON.stringify({
    username: formData.email.split('@')[0],
    enabled: true,
    totp: false,
    emailVerified: true,
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
      national_id: "291021921006971",
    },
    realmRoles: ["mb-user"],
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
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
  // Return early if the form data is invalid
}

// mutate data
// revalidate cache
