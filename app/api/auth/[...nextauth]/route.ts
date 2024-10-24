import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Custom Backend",
      async authorize(credentials: any) {
        const formData = new URLSearchParams();
        formData.append("username", credentials.email);
        formData.append("password", credentials.password);
        formData.append("grant_type", process.env.GRANT_TYPE as string);
        formData.append("client_id", process.env.KEYCLOAK_CLIENT_ID as string);
        formData.append(
          "client_secret",
          process.env.KEYCLOAK_CLIENT_SECRET as string
        );
        formData.append("scope", process.env.SCOPE as string);

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
          isAuthienticated["id"] = credentials.email;
          isAuthienticated["email"] = credentials.email;
          return isAuthienticated;
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
        token.refresh_token = user.refresh_token;
        token.session_state = user.session_state;
        token.refresh_expires_in = user.refresh_expires_in;
        token.session_state = user.session_state;
        token.expires_in = user.expires_in;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.access_token = token.access_token;
      session.refresh_token = token.refresh_token;
      session.session_state = token.session_state;
      session.refresh_expires_in = token.refresh_expires_in;
      session.expires_in = token.expires_in;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

// Ensure that both GET and POST methods are exported
export { handler as GET, handler as POST };
