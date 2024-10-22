"use server";

import { KeycloakToken } from "@/app/types/KeycloakToken";
import { RetrieveServerSession, DecodeToken } from "@/app/util/client.keycloak";
import { isSessionAlive } from "@/app/util/client.keycloak";
import { redirect } from "next/navigation";
export async function SubmitVote({
  candidateObject,
}: {
  candidateObject: any;
}) {
  let serverSession = await RetrieveServerSession();
  await isSessionAlive();
  let decodedJWT: KeycloakToken = DecodeToken({
    access_token: serverSession.access_token,
  });
  let nid = decodedJWT?.nid;

  console.log(`${nid} has selected ${candidateObject.uuid}`);

  return await postVote(candidateObject.uuid, nid, serverSession.access_token);
}

function postVote(candidateUUID: any, nid: string, token: string) {
  return new Promise((resolve, reject) => {
    let requestBody = JSON.stringify({
      uuid: candidateUUID,

      nid: nid,
    });

    fetch("http://localhost:3005/vote", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: requestBody,
    })
      .then((res) => res)
      .then((data) => {
        resolve(data.status);
      });
  });
}
