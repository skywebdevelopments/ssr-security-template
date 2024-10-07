"use client";

// Example LogoutButton Component
// eslint-disable-next-line @next/next/no-async-client-component
const LogoutButton = async ({ session }: any) => {


  return <a href="api/auth/signout">Sign Out</a>;
};

export default LogoutButton;
