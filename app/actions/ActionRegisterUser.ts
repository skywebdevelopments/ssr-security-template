"use server";

import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  email: z
    .string({
      invalid_type_error: "Invalid Email",
    })
    .email({ message: "not a valid email" }),
});

export async function ActionRegisterUser(formData: FormData) {
  "use server";
    console.log(formData);
    
  const formData1 = new URLSearchParams();
  formData1.append("username", "");
  formData1.append("password", "");
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
  console.log(await res.json());
  const validatedFields = schema.safeParse({
    email: formData.get("email"),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    let errors = {
      errors: validatedFields.error.flatten().fieldErrors,
    };


    return errors;
  }
  const rawFormData = {
    email: formData.get("email"),
  };

  console.log(rawFormData);

  // mutate data
  // revalidate cache
}
