"use server";

import { KeycloakToken } from "@/app/types/KeycloakToken";
import {
  RetrieveServerSession,
  DecodeToken,
  getUserInfo,
} from "@/app/util/client.keycloak";
import { isSessionAlive } from "@/app/util/client.keycloak";
import { redirect } from "next/navigation";
export async function SubmitVote({
  candidateObject,
}: {
  candidateObject: any;
}) {
  return new Promise(async (resolve, reject) => {
    await isSessionAlive();
    let response: any = await getUserInfo();
    let serverSession = await RetrieveServerSession();
    let nid = response?.nid;
    await postVote(candidateObject.uuid, nid, serverSession.access_token)
      .then((response) => resolve(response))
      .catch((error) => {
        reject(error);
      });
  });
}

async function postVote(candidateUUID: any, nid: string, token: string) {
  await isSessionAlive();
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
      .then(async (data) => {
        resolve(await data.json());
      })
      .catch((err) => {
        reject(err);
      });
  });
}
