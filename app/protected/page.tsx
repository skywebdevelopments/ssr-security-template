// app/protected/page.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default async function ProtectedPage() {
  const session: any = await getServerSession(authOptions);

  console.log(session);

  let data = await fetch(`${process.env.ASSETS_URL}`, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`, // Use the access token passed as a prop
      "Content-Type": "application/json", // Optional: Specify content type
    },
  });
  let posts = await data.json();
  console.log(`${posts?.length} posts`);

  if (!session) {
    redirect("/api/auth/signin"); // Redirect to login if not authenticated
  }

  return (
    <div>
      <LogoutButton session={session}></LogoutButton>
      <div className="flex max-w-screen-lg flex-col justify-center mt-4">
        <div className="p-1 w-full">
          <p>Welcome, {session?.user?.email}</p>
        </div>
        <div className="p-1 ml-3 w-full">
          <h1>Service Account: {process.env.KEYCLOAK_CLIENT_ID}</h1>
        </div>
      </div>
      {/* Use the client component here */}
      <ol className="m-10">
        {posts &&
          posts.length > 0 &&
          posts?.map((post: any, index: number) => (
            <li key={index}>
              {index + 1}. {post.Record.apartmentNumber} -{" "}
              {post.Record.fullName}
            </li>
          ))}
      </ol>
    </div>
  );
}
