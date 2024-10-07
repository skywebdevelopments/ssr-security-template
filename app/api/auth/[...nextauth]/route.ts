import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Custom Backend",
      async authorize(credentials: any) {
        const formData = new URLSearchParams();
        formData.append("username", "cib-admin");
        formData.append("password", "admin");
        formData.append("grant_type", "password");
        formData.append("client_id", "CIB-Bank");
        formData.append("client_secret", "SjlCo62wSoFzh9AYqejgxShqKpRoVpYw");
        formData.append("scope", "openid");
        console.log(formData);

        const res = await fetch(
          "http://127.0.0.1:8080/realms/myrealm/protocol/openid-connect/token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData,
          }
        );

        const isAuthienticated = await res.json();

        if (res.ok && isAuthienticated) {
          // If successful, return the user object
          let user = { id: "123", email: "ahmed.shalaby@cyshield.com" };
          return user;
        }

        // If authentication fails, return null
        return null;
      },
      credentials: undefined as any,
    }),
  ],
  session: {
    strategy: "jwt", // Using JWT for session storage
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET, // Use the correct secret here
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.access_token = user.access_token;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.access_token = token.access_token;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

// Ensure that both GET and POST methods are exported
export { handler as GET, handler as POST };
