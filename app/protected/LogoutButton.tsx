"use client";

// Example LogoutButton Component
// eslint-disable-next-line @next/next/no-async-client-component
const LogoutButton = async ({ session }: any) => {
  const handleLogout = async () => {
    // Call the NextAuth sign-out route
    await fetch("/api/auth/logout", {
      method: "GET",
      headers: {
        "user-id": session?.profile?.id,
      },
    });
    // Note: The redirect to Keycloak logout is handled in the API route
  };

  return <button onClick={handleLogout}>Sign Out</button>;
};

export default LogoutButton;
