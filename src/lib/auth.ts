import get from "lodash/get";
import merge from "lodash/merge";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getClient } from "./client";
import { LoginDocument } from "@/__generated__/graphql";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password, rememberMe } = (credentials || {}) as any;

        const { data } = await getClient().mutate({
          mutation: LoginDocument,
          variables: {
            username: email,
            password,
            rememberMe: rememberMe,
          },
        });

        if (data?.login.__typename === "CurrentUser") {
          return data.login;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token, user }) {
      //   let dataSession = session;
      //   if (token && session.user) {
      //     dataSession = merge(dataSession, {
      //       user: { id: token.id },
      //       profile: token.profile,
      //     });
      //   }
      return session;
    },
    async jwt({ token, user, account, profile }) {
      //   if (user) {
      //     console.log("user jwt ", user);

      //     token.id = user.id;
      //     token.profile = (user as any).profile;
      //   }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
};
