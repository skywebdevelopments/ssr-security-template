
export function getCandidates(): Candidate[] {
  let CandidatesList: Candidate[] = [
    {
      "name": "مرشح رقم ١",
      "avatar": "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80",
      "alt": "Avatar",
      "uuid": "93e4b026-6102-4cfb-995e-b1e41a1c6a4c"
    },
    {
      "name": "مرشح رقم ٢",
      "avatar": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80",
      "alt": "Avatar",
      "uuid": "f926b95e-4fa6-49bc-8704-eae1082b9b63"
    },
    {
      "name": "مرشح رقم ٣",
      "avatar": "https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80",
      "alt": "Avatar",
      "uuid": "94c5a61c-f837-4b2d-b278-7f793ecb1b6a"
    },
    {
      "name": "مرشح رقم ٤",
      "avatar": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80",
      "alt": "Avatar",
      "uuid": "5efc74bb-010b-421a-a6cb-223855f307d8"
    },
    {
      "name": "مرشح رقم ٥",
      "avatar": "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80",
      "alt": "Avatar",
      "uuid": "1fc77c84-0ba2-47a5-a199-e20bdf2ef2d8"
    },
    {
      "name": "مرشح رقم ٦",
      "avatar": "https://images.unsplash.com/photo-1624224971170-2f84fed5eb5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80",
      "alt": "Avatar",
      "uuid": "99c4dff9-9d39-4209-8f58-48168b83ad02"
    },
    {
      "name": "مرشح رقم ٧",
      "avatar": "https://images.unsplash.com/photo-1579017331263-ef82f0bbc748?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80",
      "alt": "Avatar",
      "uuid": "2b3cfb58-6739-4a71-bb38-c351c8d4b1a6"
    },
    {
      "name": "مرشح رقم ٨",
      "avatar": "https://images.unsplash.com/photo-1514222709107-a180c68d72b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80",
      "alt": "Avatar",
      "uuid": "db2b234e-7526-4c43-bc19-43c279fa67c2"
    },
    {
      "name": "مرشح رقم ٩",
      "avatar": "https://images.unsplash.com/photo-1602452920335-6a132309c7c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80",
      "alt": "Avatar",
      "uuid": "8a86d7f1-e60f-485e-8495-5187fb94333e"
    },
    {
      "name": "مرشح رقم ١٠",
      "avatar": "https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80",
      "alt": "Avatar",
      "uuid": "939dfe15-34ff-41f4-833e-1f22b15b02d2"
    },
    {
      "name": "مرشح رقم ١١",
      "avatar": "https://images.unsplash.com/photo-1514846226882-28b324ef7f28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80",
      "alt": "Avatar",
      "uuid": "b743f3c3-d708-4d89-bbda-716e0a90d0e7"
    },
    {
      "name": "مرشح رقم ١٢",
      "avatar": "https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80",
      "alt": "Avatar",
      "uuid": "e31dc568-ff49-4f7c-9b16-3e2a8d281ea6"
    },
    {
      "name": "مرشح رقم ١٣",
      "avatar": "https://images.unsplash.com/photo-1520409364224-63400afe26e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80",
      "alt": "Avatar",
      "uuid": "121ec5a7-b9b2-4c4a-874a-bb05a9a25278"
    },
    {
      "name": "مرشح رقم ١٤",
      "avatar": "https://images.unsplash.com/photo-1558507652-2d9626c4e67a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80",
      "alt": "Avatar",
      "uuid": "dfd228b3-bcc5-4902-9c7f-9b9269052340"
    },
    {
      "name": "مرشح رقم ١٥",
      "avatar": "https://images.unsplash.com/photo-1521151716396-b2da27b1a19f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80",
      "alt": "Avatar",
      "uuid": "4e8cc1a2-aec2-49e0-81fa-cff251b0503a"
    }
  ]
  
  return CandidatesList;
}
