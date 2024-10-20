export function getCandidates(): Candidate[] {
  let CandidatesList: Candidate[] = [
    {
      name: "مرشح رقم ١",
      avatar:
        "/img/candidate.jpg",
      alt: "Avatar",
      uuid: "93e4b026-6102-4cfb-995e-b1e41a1c6a4c",
    },
    {
      name: "مرشح رقم ٢",
      avatar:
        "/img/candidate.jpg",
      alt: "Avatar",
      uuid: "f926b95e-4fa6-49bc-8704-eae1082b9b63",
    },
    {
      name: "مرشح رقم ٣",
      avatar:
        "/img/candidate.jpg",
      alt: "Avatar",
      uuid: "94c5a61c-f837-4b2d-b278-7f793ecb1b6a",
    },
    {
      name: "مرشح رقم ٤",
      avatar:
        "/img/candidate.jpg",
      alt: "Avatar",
      uuid: "5efc74bb-010b-421a-a6cb-223855f307d8",
    },
    {
      name: "مرشح رقم ٥",
      avatar:
        "/img/candidate.jpg",
      alt: "Avatar",
      uuid: "1fc77c84-0ba2-47a5-a199-e20bdf2ef2d8",
    },
    {
      name: "مرشح رقم ٦",
      avatar:
        "/img/candidate.jpg",
      alt: "Avatar",
      uuid: "99c4dff9-9d39-4209-8f58-48168b83ad02",
    },
    {
      name: "مرشح رقم ٧",
      avatar:
        "/img/candidate.jpg",
      alt: "Avatar",
      uuid: "2b3cfb58-6739-4a71-bb38-c351c8d4b1a6",
    },
    {
      name: "مرشح رقم ٨",
      avatar:
        "/img/candidate.jpg",
      alt: "Avatar",
      uuid: "db2b234e-7526-4c43-bc19-43c279fa67c2",
    },
    {
      name: "مرشح رقم ٩",
      avatar:
        "/img/candidate.jpg",
      alt: "Avatar",
      uuid: "8a86d7f1-e60f-485e-8495-5187fb94333e",
    },
    {
      name: "مرشح رقم ١٠",
      avatar:
        "/img/candidate.jpg",
      alt: "Avatar",
      uuid: "939dfe15-34ff-41f4-833e-1f22b15b02d2",
    },
    {
      name: "مرشح رقم ١١",
      avatar:
        "/img/candidate.jpg",
      alt: "Avatar",
      uuid: "b743f3c3-d708-4d89-bbda-716e0a90d0e7",
    },
    {
      name: "مرشح رقم ١٢",
      avatar:
        "/img/candidate.jpg",
      alt: "Avatar",
      uuid: "e31dc568-ff49-4f7c-9b16-3e2a8d281ea6",
    },
    {
      name: "مرشح رقم ١٣",
      avatar:
        "/img/candidate.jpg",
      alt: "Avatar",
      uuid: "121ec5a7-b9b2-4c4a-874a-bb05a9a25278",
    },
    {
      name: "مرشح رقم ١٤",
      avatar:
        "/img/candidate.jpg",
      alt: "Avatar",
      uuid: "dfd228b3-bcc5-4902-9c7f-9b9269052340",
    },
    {
      name: "مرشح رقم ١٥",
      avatar:
        "/img/candidate.jpg",
      alt: "Avatar",
      uuid: "4e8cc1a2-aec2-49e0-81fa-cff251b0503a",
    },
  ];

  return CandidatesList;
}

export function findCandidateByUUID(uuid: string): Candidate {
  let CandidateObject: Candidate = getCandidates().find((rec) => rec.uuid === uuid) as Candidate;
  return CandidateObject;
}
