"use server";

import { redirect } from "next/navigation";
import { RequireClientAccess } from "../../util/client.keycloak";

// TODO: change the METHOD to be client auth, not user auth

async function createUserIdentity(formData: any, myHeaders: any) {
  return new Promise((resolve, reject) => {
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

    fetch("http://127.0.0.1:8080/admin/realms/evm/users", {
      method: requestOptions.method,
      headers: requestOptions.headers,
      body: requestOptions.body,
      cache: "no-store",
    })
      .then((response) => {
        response.status === 201 && resolve(response.status);
      })

      .catch((error) => reject(error));
  });
}

function enrollUser(formData: any, myHeaders: any) {
  return new Promise((resolve, reject) => {
    const raw = JSON.stringify({
      identifier: formData.email,
      role: "client",
      attr: [
        {
          key: "nationalId",
          value: formData.nationalId,
        },
        {
          key: "firstName",
          value: formData.firstName,
        },
        {
          key: "lastName",
          value: formData.lastName,
        },
        {
          key: "email",
          value: formData.email,
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3005/users/enrollUser", {
      method: requestOptions.method,
      body: raw,
      headers: requestOptions.headers,
    })
      .then((response) => response.status)
      .then((result) => result === 201 && resolve(result))
      .catch((error) => reject(error));
  });
}

export async function ActionRegisterUser(formData: any) {
  "use server";

  return new Promise(async (resolve, reject) => {
    try {
      const accessToken = await RequireClientAccess();

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${accessToken}`);
      let response_createUserIdentity = await createUserIdentity(
        formData,
        myHeaders
      );
      let response_enrollUser = await enrollUser(formData, myHeaders);
      console.log(response_enrollUser, response_createUserIdentity);

      response_createUserIdentity === 201 &&
        response_enrollUser === 201 &&
        resolve(201);
    } catch (error) {
      console.error("Error in user registration:", error);
      reject(500);
    }
  });
}
